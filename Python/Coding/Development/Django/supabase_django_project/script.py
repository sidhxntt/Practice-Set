#!/usr/bin/env python3
"""
macOS Cache Cleaner Script

This script safely cleans cache directories on macOS systems.
It shows cache sizes before and after cleanup, handles permissions errors,
and includes safety checks with user confirmation.
"""

import os
import sys
import shutil
import subprocess
import concurrent.futures
from pathlib import Path
import argparse
from datetime import datetime
import logging


def setup_logging(verbose=True):
    """Setup logging configuration"""
    level = logging.INFO if verbose else logging.WARNING
    logging.basicConfig(
        level=level,
        format='%(message)s',
        handlers=[logging.StreamHandler(sys.stdout)]
    )
    return logging.getLogger("cache_cleaner")


def get_size(path):
    """
    Calculate total size of a directory in bytes using os.walk for better performance.
    
    Args:
        path (str): Path to the directory
        
    Returns:
        int: Size in bytes
    """
    total_size = 0
    try:
        for dirpath, _, filenames in os.walk(path, onerror=lambda e: None):
            for filename in filenames:
                try:
                    file_path = os.path.join(dirpath, filename)
                    if not os.path.islink(file_path):  # Skip symbolic links
                        total_size += os.path.getsize(file_path)
                except (PermissionError, OSError, FileNotFoundError):
                    continue
    except (PermissionError, OSError, FileNotFoundError):
        pass
    return total_size


def format_size(size_bytes):
    """Format bytes into human-readable format."""
    if size_bytes == 0:
        return "0 B"
    
    size_names = ("B", "KB", "MB", "GB", "TB")
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024
        i += 1
    
    return f"{size_bytes:.2f} {size_names[i]}"


def clear_directory(directory, logger, dry_run=False):
    """
    Safely clear contents of a directory.
    
    Args:
        directory (str): Path to directory to clear
        logger: Logger instance
        dry_run (bool): If True, don't actually delete files
        
    Returns:
        int: Size of freed space in bytes
    """
    if not os.path.exists(directory):
        logger.info(f"Directory not found: {directory}")
        return 0
    
    size_before = get_size(directory)
    if size_before == 0:
        logger.info(f"Directory already empty: {directory}")
        return 0
    
    logger.info(f"Cleaning {directory} ({format_size(size_before)})")
    
    if dry_run:
        return size_before
    
    try:
        # Use pathlib for better file operations
        path = Path(directory)
        for item in path.iterdir():
            try:
                if item.is_file():
                    item.unlink()
                elif item.is_dir():
                    shutil.rmtree(item)
            except (PermissionError, OSError) as e:
                logger.warning(f"  Error removing {item}: {e}")
        
        size_after = get_size(directory)
        freed = size_before - size_after
        logger.info(f"  Freed {format_size(freed)}")
        
        return freed
    except (PermissionError, OSError) as e:
        logger.warning(f"  Error clearing {directory}: {e}")
        return 0


def get_vm_stat():
    """Get virtual memory statistics on macOS."""
    try:
        result = subprocess.run(["vm_stat"], capture_output=True, text=True, timeout=5)
        if result.returncode != 0:
            return None
        
        stats = {}
        for line in result.stdout.splitlines():
            if ":" in line:
                key, value = line.split(":", 1)
                value = value.strip().replace(".", "")
                try:
                    if value.isdigit():
                        stats[key.strip()] = int(value)
                except ValueError:
                    pass
        return stats
    except (subprocess.SubprocessError, FileNotFoundError, subprocess.TimeoutExpired):
        return None


def run_brew_cleanup(logger):
    """Run Homebrew cleanup if available."""
    try:
        logger.info("Running Homebrew cleanup...")
        # Check if brew exists first
        if shutil.which("brew") is None:
            logger.info("Homebrew not found")
            return False
            
        result = subprocess.run(["brew", "cleanup", "--prune=all"], 
                               capture_output=True, text=True, timeout=120)
        logger.info(result.stdout)
        return result.returncode == 0
    except (subprocess.SubprocessError, FileNotFoundError, subprocess.TimeoutExpired) as e:
        logger.warning(f"Error running Homebrew cleanup: {e}")
        return False


def print_memory_stats(logger, vm_stats, title):
    """Print memory statistics in a formatted way"""
    logger.info(f"\n===== {title} =====")
    if vm_stats:
        page_size = 16384  # Default macOS page size in bytes
        free_mem = vm_stats.get("Pages free", 0) * page_size
        active_mem = vm_stats.get("Pages active", 0) * page_size
        inactive_mem = vm_stats.get("Pages inactive", 0) * page_size
        compressed_mem = vm_stats.get("Pages occupied by compressor", 0) * page_size
        
        logger.info(f"Free memory: {format_size(free_mem)}")
        logger.info(f"Active memory: {format_size(active_mem)}")
        logger.info(f"Inactive memory: {format_size(inactive_mem)}")
        logger.info(f"Compressed memory: {format_size(compressed_mem)}")
    else:
        logger.info("Unable to get memory statistics")


def get_cache_sizes(cache_dirs, logger):
    """Get sizes of all cache directories in parallel"""
    cache_sizes = {}
    total_size = 0
    
    # Use ThreadPoolExecutor for parallel processing
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_dir = {
            executor.submit(get_size, directory): (name, directory) 
            for name, directory in cache_dirs.items()
        }
        
        for future in concurrent.futures.as_completed(future_to_dir):
            name, directory = future_to_dir[future]
            try:
                size = future.result()
                cache_sizes[name] = size
                total_size += size
                logger.info(f"{name}: {format_size(size)}")
            except Exception as e:
                logger.warning(f"Error getting size for {name}: {e}")
    
    return cache_sizes, total_size


def main():
    """Main function to handle cache cleanup."""
    parser = argparse.ArgumentParser(description='macOS Cache Cleaner')
    parser.add_argument('--dry-run', action='store_true', 
                        help='Show what would be cleaned without deleting files')
    parser.add_argument('--no-confirm', action='store_true', 
                        help='Skip confirmation prompts')
    parser.add_argument('--no-brew', action='store_true', 
                        help='Skip Homebrew cleanup')
    parser.add_argument('--quiet', action='store_true',
                        help='Minimize output')
    parser.add_argument('--clean-all', action='store_true',
                        help='Clean all caches without additional prompts')
    args = parser.parse_args()
    
    # Setup logging
    logger = setup_logging(not args.quiet)
    
    # Get user's home directory and cache locations
    home_dir = str(Path.home())
    user_cache_dir = os.path.join(home_dir, "Library", "Caches")
    
    # Common cache directories to clean
    cache_dirs = {
        "Google Chrome": os.path.join(user_cache_dir, "Google"),
        "Music": os.path.join(user_cache_dir, "com.apple.Music"),
        "Node.js": os.path.join(user_cache_dir, "node-gyp"),
        "TypeScript": os.path.join(user_cache_dir, "typescript"),
        "Character Palette": os.path.join(user_cache_dir, "com.apple.CharacterPaletteIM"),
        "Shared Image Cache": os.path.join(user_cache_dir, "SharedImageCache"),
        "GeoServices": os.path.join(user_cache_dir, "GeoServices"),
    }
    
    # Additional cache directories that can be safely cleaned
    additional_cache_dirs = {
        "pip": os.path.join(user_cache_dir, "pip"),
        "npm": os.path.join(home_dir, ".npm", "_cacache"),
        "yarn": os.path.join(home_dir, ".yarn", "cache"),
        "VSCode": os.path.join(home_dir, ".vscode", "CachedData"),
        "Safari": os.path.join(user_cache_dir, "com.apple.Safari"),
    }
    
    # Print system memory information before cleaning
    vm_stats_before = get_vm_stat()
    print_memory_stats(logger, vm_stats_before, "System Memory Before Cleanup")
    
    # Show cache sizes before cleaning
    logger.info("\n===== Cache Sizes Before Cleanup =====")
    
    # Get cache sizes in parallel
    primary_sizes, primary_total = get_cache_sizes(cache_dirs, logger)
    additional_sizes, additional_total = get_cache_sizes(additional_cache_dirs, logger)
    
    total_size = primary_total + additional_total
    logger.info(f"\nTotal cache size: {format_size(total_size)}")
    
    # Confirm with user before proceeding
    if not args.no_confirm and not args.dry_run:
        confirm = input("\nProceed with cache cleanup? (y/n): ").lower().strip()
        if confirm != 'y':
            logger.info("Cache cleanup canceled.")
            sys.exit(0)
    
    # Run cleanup
    logger.info("\n===== Running Cache Cleanup =====")
    
    if not args.no_brew and not args.dry_run:
        run_brew_cleanup(logger)
    elif args.dry_run:
        logger.info("Skipping Homebrew cleanup (dry run)")
    
    total_freed = 0
    
    # Clean primary cache directories 
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_dir = {
            executor.submit(clear_directory, directory, logger, args.dry_run): (name, directory) 
            for name, directory in cache_dirs.items()
        }
        
        for future in concurrent.futures.as_completed(future_to_dir):
            freed = future.result()
            total_freed += freed
    
    # Ask about additional caches
    if args.clean_all or (not args.no_confirm and not args.dry_run and 
                          input("\nClean additional caches? (y/n): ").lower().strip() == 'y'):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future_to_dir = {
                executor.submit(clear_directory, directory, logger, args.dry_run): (name, directory) 
                for name, directory in additional_cache_dirs.items()
            }
            
            for future in concurrent.futures.as_completed(future_to_dir):
                freed = future.result()
                total_freed += freed
    
    # Show results
    if args.dry_run:
        logger.info(f"\nDry run completed. Would free approximately: {format_size(total_freed)}")
    else:
        logger.info(f"\nCache cleanup completed. Freed approximately: {format_size(total_freed)}")
    
    # Print system memory information after cleaning
    if not args.dry_run:
        vm_stats_after = get_vm_stat()
        print_memory_stats(logger, vm_stats_after, "System Memory After Cleanup")
    
    # Print timestamp
    logger.info(f"\nCleanup completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nCache cleanup interrupted by user.")
        sys.exit(1)