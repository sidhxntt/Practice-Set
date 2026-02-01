#!/usr/bin/env bash
set -euo pipefail

# ----------------------------------
# Helpers
# ----------------------------------
log() {
  echo "▶ $1"
}

prompt() {
  local var_name="$1"
  local message="$2"
  local default="${3:-}"

  if [ -n "$default" ]; then
    read -rp "$message [$default]: " input
    echo "${input:-$default}"
  else
    read -rp "$message: " input
    echo "$input"
  fi
}

confirm() {
  read -rp "$1 (y/N): " yn
  [[ "$yn" =~ ^[Yy]$ ]]
}

# ----------------------------------
# Parse args
# ----------------------------------
PROJECT_REF="${SUPABASE_PROJECT_REF:-}"
MIGRATION_NAME=""
DO_RESET=true
DO_PUSH=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    -p|--project-ref)
      PROJECT_REF="$2"
      shift 2
      ;;
    -n|--name)
      MIGRATION_NAME="$2"
      shift 2
      ;;
    --no-reset)
      DO_RESET=false
      shift
      ;;
    --no-push)
      DO_PUSH=false
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

# ----------------------------------
# Ensure Supabase CLI
# ----------------------------------
if ! command -v supabase >/dev/null 2>&1; then
  log "Supabase CLI not found. Installing..."
  npm install -g supabase
fi

log "Supabase CLI: $(supabase --version)"

# ----------------------------------
# Init Supabase
# ----------------------------------
if [ ! -d "supabase" ]; then
  log "Initializing Supabase project..."
  supabase init
fi

# ----------------------------------
# Ask for project ref (if pushing)
# ----------------------------------
if [[ "$DO_PUSH" == true && -z "$PROJECT_REF" ]]; then
  PROJECT_REF=$(prompt "PROJECT_REF" "Enter Supabase project ref")
fi

# ----------------------------------
# Link project (only if pushing)
# ----------------------------------
if [[ "$DO_PUSH" == true ]]; then
  log "Linking Supabase project: $PROJECT_REF"
  supabase link --project-ref "$PROJECT_REF" || true
fi

# ----------------------------------
# Migration name prompt
# ----------------------------------
if [[ -z "$MIGRATION_NAME" ]]; then
  MIGRATION_NAME=$(prompt "MIGRATION_NAME" "Migration name (leave empty to skip)")
fi

if [[ -n "$MIGRATION_NAME" ]]; then
  log "Creating migration: $MIGRATION_NAME"
  supabase migration new "$MIGRATION_NAME"
fi

# ----------------------------------
# Reset local DB (Docker optional)
# ----------------------------------
if [[ "$DO_RESET" == true ]]; then
  if docker_running; then
    if confirm "Reset local database? This will DELETE local data"; then
      log "Resetting local database..."
      supabase db reset
    else
      log "Skipped local DB reset"
    fi
  else
    log "Docker not running — skipping local Supabase reset"
  fi
fi

# ----------------------------------
# Push migrations (confirm)
# ----------------------------------
if [[ "$DO_PUSH" == true ]]; then
  if confirm "Push migrations to Supabase cloud? Please Make sure your migraion file is not empty"; then
    log "Pushing migrations..."
    supabase db push
  else
    log "Skipped push"
  fi
fi

log "✅ Supabase migration flow completed"
