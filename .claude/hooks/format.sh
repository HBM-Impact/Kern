#!/bin/bash
# Format files after Claude edits them using Biome

# Read JSON input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Exit if no file path
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only format supported file types
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css)
    cd "$CLAUDE_PROJECT_DIR" && bunx biome check --write --unsafe "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
