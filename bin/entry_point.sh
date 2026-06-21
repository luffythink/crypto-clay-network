#!/bin/bash
set -euo pipefail

echo "Entry point script running"

CONFIG_FILE=_config.yml

if [ ! -f "$CONFIG_FILE" ]; then
    echo "ERROR: /srv/jekyll/_config.yml is missing."
    echo "Check that the project directory is mounted to /srv/jekyll."
    exit 1
fi

# Function to manage Gemfile.lock
manage_gemfile_lock() {
    git config --global --add safe.directory '*' 2>/dev/null || true
    if [ ! -f Gemfile.lock ]; then
        echo "Gemfile.lock not found"
        return
    fi

    if command -v git &> /dev/null \
        && git rev-parse --is-inside-work-tree &> /dev/null \
        && git ls-files --error-unmatch Gemfile.lock &> /dev/null; then
        echo "Gemfile.lock is tracked by git, restoring the committed version"
        git restore Gemfile.lock 2>/dev/null || true
    else
        echo "Gemfile.lock is not tracked by an available git worktree, preserving it"
    fi
}

start_jekyll() {
    manage_gemfile_lock
    bundle exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace --force_polling &
    JEKYLL_PID=$!
}

start_jekyll

while true; do
    if ! kill -0 "$JEKYLL_PID" 2>/dev/null; then
        wait "$JEKYLL_PID" 2>/dev/null || true
        echo "Jekyll exited; restarting in 2 seconds"
        sleep 2
        start_jekyll
        continue
    fi

    if inotifywait -q -t 2 -e modify,move,create,delete "$CONFIG_FILE"; then
        echo "Change detected to $CONFIG_FILE, restarting Jekyll"
        kill "$JEKYLL_PID" 2>/dev/null || true
        wait "$JEKYLL_PID" 2>/dev/null || true
        start_jekyll
    fi
done
