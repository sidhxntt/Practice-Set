Here’s a comprehensive list of all functions and constants available in the `os` module:

---

## **1. Process and System Information**
```python
os.name  # Name of the OS ('posix', 'nt', etc.)
os.environ  # Dictionary of environment variables
os.getenv('VAR_NAME')  # Get environment variable
os.putenv('VAR_NAME', 'value')  # Set environment variable (deprecated, use os.environ instead)
os.unsetenv('VAR_NAME')  # Remove environment variable (on Unix)
os.getpid()  # Get current process ID
os.getppid()  # Get parent process ID
os.getuid()  # Get user ID (Unix only)
os.getgid()  # Get group ID (Unix only)
os.geteuid()  # Get effective user ID (Unix only)
os.getegid()  # Get effective group ID (Unix only)
os.getlogin()  # Get the name of the logged-in user
```

---

## **2. File and Directory Manipulation**
```python
os.getcwd()  # Get current working directory
os.chdir('path')  # Change working directory
os.listdir('path')  # List contents of a directory
os.mkdir('dir_name')  # Create a directory
os.makedirs('path/to/nested/dir')  # Create multiple directories
os.rmdir('dir_name')  # Remove a directory (must be empty)
os.removedirs('path/to/nested/dir')  # Remove directories recursively
os.rename('old_name', 'new_name')  # Rename a file or directory
os.replace('old_name', 'new_name')  # Rename file/directory with overwrite
os.remove('file_name')  # Remove a file
os.unlink('file_name')  # Remove a file (same as os.remove)
os.scandir('path')  # Get an iterator of directory entries
os.stat('file_name')  # Get file metadata (size, permissions, etc.)
```

---

## **3. Path Operations (`os.path`)**
```python
os.path.abspath('file')  # Get absolute path
os.path.basename('path/file.txt')  # Get file name from path
os.path.dirname('path/file.txt')  # Get directory from path
os.path.exists('path')  # Check if path exists
os.path.isfile('file')  # Check if it's a file
os.path.isdir('path')  # Check if it's a directory
os.path.islink('path')  # Check if it's a symbolic link
os.path.getsize('file')  # Get file size in bytes
os.path.join('dir', 'file')  # Join paths
os.path.split('path/file.txt')  # Split into (dir, file)
os.path.splitext('file.txt')  # Split into (file, extension)
os.path.realpath('file')  # Get real path (resolving symlinks)
os.path.relpath('file', 'start_dir')  # Get relative path
os.path.samefile('file1', 'file2')  # Check if two paths refer to the same file
```

---

## **4. Executing System Commands**
```python
os.system('command')  # Execute system command
os.popen('command').read()  # Run command and get output
os.spawnl(os.P_NOWAIT, '/path/to/executable', 'arg1', 'arg2')  # Spawn a process
os.spawnlp(os.P_WAIT, 'ls', 'ls', '-l')  # Spawn a process with search in PATH
os.execl('/path/to/executable', 'arg1', 'arg2')  # Replace current process with a new one
os.execvp('ls', ['ls', '-l'])  # Execute a command with arguments
```

---

## **5. Process Management**
```python
os.getpid()  # Get process ID
os.getppid()  # Get parent process ID
os.fork()  # Fork a child process (Unix only)
os.wait()  # Wait for a child process to terminate
os.waitpid(pid, 0)  # Wait for a specific process
os.kill(pid, signal.SIGTERM)  # Kill a process
os.nice(10)  # Set process priority
```

---

## **6. Working with File Descriptors**
```python
os.open('file.txt', os.O_RDWR)  # Open a file (returns file descriptor)
os.read(fd, 100)  # Read from file descriptor
os.write(fd, b'Hello')  # Write to file descriptor
os.close(fd)  # Close file descriptor
os.dup(fd)  # Duplicate file descriptor
os.dup2(fd1, fd2)  # Duplicate file descriptor to another one
os.pipe()  # Create a pipe
```

---

## **7. Symbolic Links and Hard Links**
```python
os.symlink('source', 'link_name')  # Create a symbolic link
os.link('source', 'hard_link_name')  # Create a hard link
os.readlink('link_name')  # Read the target of a symbolic link
```

---

## **8. Permissions and Ownership**
```python
os.chmod('file', 0o777)  # Change file permissions
os.chown('file', uid, gid)  # Change file ownership (Unix only)
os.umask(0o022)  # Set default file permissions
```

---

## **9. Constants in `os` Module**
```python
os.sep  # Path separator ('/' on Unix, '\' on Windows)
os.extsep  # Extension separator ('.' for most OS)
os.pathsep  # Separator for PATH variable (':' on Unix, ';' on Windows)
os.linesep  # Line separator ('\n' on Unix, '\r\n' on Windows)
os.devnull  # Null device ('/dev/null' on Unix, 'NUL' on Windows)
```

---

This list includes almost all available commands in the `os` module. Let me know if you need more details! 🚀