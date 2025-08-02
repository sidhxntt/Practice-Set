#!/bin/bash

# Smart Auto-Commit Script
# Automatically generates commit messages based on changes and commits them

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# Check if there are any changes to commit
if git diff --cached --quiet && git diff --quiet; then
    print_warning "No changes to commit."
    exit 0
fi

# Stage all changes if nothing is staged
if git diff --cached --quiet; then
    print_status "Staging all changes..."
    git add .
fi

# Function to analyze changes and generate commit message
generate_commit_message() {
    local commit_msg=""
    local commit_type=""
    local scope=""
    local description=""
    
    # Get staged files
    local staged_files=$(git diff --cached --name-only)
    local added_files=$(git diff --cached --name-status | grep "^A" | wc -l)
    local modified_files=$(git diff --cached --name-status | grep "^M" | wc -l)
    local deleted_files=$(git diff --cached --name-status | grep "^D" | wc -l)
    local renamed_files=$(git diff --cached --name-status | grep "^R" | wc -l)
    
    # Get file extensions to determine scope
    local file_types=$(echo "$staged_files" | grep -o '\.[^.]*$' | sort | uniq -c | sort -nr | head -3)
    
    # Determine commit type based on changes
    if [ $added_files -gt 0 ] && [ $modified_files -eq 0 ] && [ $deleted_files -eq 0 ]; then
        commit_type="feat"
    elif [ $deleted_files -gt 0 ] && [ $added_files -eq 0 ] && [ $modified_files -eq 0 ]; then
        commit_type="remove"
    elif [ $renamed_files -gt 0 ]; then
        commit_type="refactor"
    elif echo "$staged_files" | grep -qi "readme\|doc\|\.md$"; then
        commit_type="docs"
    elif echo "$staged_files" | grep -qi "test\|spec"; then
        commit_type="test"
    elif echo "$staged_files" | grep -qi "config\|\.json$\|\.yaml$\|\.yml$\|\.toml$"; then
        commit_type="config"
    elif echo "$staged_files" | grep -qi "\.css$\|\.scss$\|\.sass$\|\.less$"; then
        commit_type="style"
    elif echo "$staged_files" | grep -qi "package\.json\|requirements\.txt\|Gemfile\|pom\.xml"; then
        commit_type="deps"
    else
        commit_type="fix"
    fi
    
    # Determine scope based on directory structure
    local main_dir=$(echo "$staged_files" | head -1 | cut -d'/' -f1)
    if [ -n "$main_dir" ] && [ "$main_dir" != "$(basename "$main_dir")" ]; then
        scope="($main_dir)"
    fi
    
    # Generate description based on file changes
    if [ $added_files -gt 0 ] && [ $modified_files -gt 0 ]; then
        description="add and update files"
    elif [ $added_files -gt 1 ]; then
        description="add multiple files"
    elif [ $added_files -eq 1 ]; then
        local added_file=$(git diff --cached --name-status | grep "^A" | cut -f2 | head -1)
        description="add $(basename "$added_file")"
    elif [ $modified_files -gt 1 ]; then
        description="update multiple files"
    elif [ $modified_files -eq 1 ]; then
        local modified_file=$(git diff --cached --name-status | grep "^M" | cut -f2 | head -1)
        description="update $(basename "$modified_file")"
    elif [ $deleted_files -gt 1 ]; then
        description="remove multiple files"
    elif [ $deleted_files -eq 1 ]; then
        local deleted_file=$(git diff --cached --name-status | grep "^D" | cut -f2 | head -1)
        description="remove $(basename "$deleted_file")"
    else
        description="update codebase"
    fi
    
    # Check for specific patterns in diff
    local diff_content=$(git diff --cached)
    
    if echo "$diff_content" | grep -qi "function\|def\|class\|interface"; then
        if [ "$commit_type" = "fix" ]; then
            commit_type="feat"
            description="implement new functionality"
        fi
    fi
    
    if echo "$diff_content" | grep -qi "bug\|fix\|error\|issue"; then
        commit_type="fix"
        description="resolve issues and bugs"
    fi
    
    if echo "$diff_content" | grep -qi "import\|require\|include"; then
        if [ "$commit_type" = "fix" ]; then
            commit_type="deps"
            description="update dependencies"
        fi
    fi
    
    # Construct final commit message
    commit_msg="${commit_type}${scope}: ${description}"
    echo "$commit_msg"
}

# Generate the commit message
print_status "Analyzing changes..."
COMMIT_MESSAGE=$(generate_commit_message)

# Show what will be committed
print_status "Files to be committed:"
git diff --cached --name-status | while read status file; do
    case $status in
        A) echo -e "  ${GREEN}+${NC} $file" ;;
        M) echo -e "  ${YELLOW}~${NC} $file" ;;
        D) echo -e "  ${RED}-${NC} $file" ;;
        R*) echo -e "  ${BLUE}→${NC} $file" ;;
        *) echo -e "    $file" ;;
    esac
done

echo ""
print_status "Generated commit message: ${YELLOW}$COMMIT_MESSAGE${NC}"

# Ask for confirmation unless --force flag is used
if [ "$1" != "--force" ] && [ "$1" != "-f" ]; then
    echo ""
    read -p "Proceed with this commit? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Commit cancelled."
        exit 0
    fi
fi

# Perform the commit
print_status "Committing changes..."
if git commit -m "$COMMIT_MESSAGE"; then
    print_success "Changes committed successfully!"
    
    # Ask if user wants to push
    if [ "$1" != "--no-push" ]; then
        echo ""
        read -p "Push to remote repository? (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Pushing to remote..."
            if git push; then
                print_success "Changes pushed successfully!"
            else
                print_error "Failed to push changes."
                exit 1
            fi
        fi
    fi
else
    print_error "Commit failed!"
    exit 1
fi