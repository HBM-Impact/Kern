#!/bin/bash
# Track edited files for end-of-turn formatting

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[ -z "$FILE_PATH" ] && exit 0

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css)
    QUEUE="$CLAUDE_PROJECT_DIR/.claude/hooks/.format-queue"
    echo "$FILE_PATH" >> "$QUEUE"
    ;;
esac

exit 0
