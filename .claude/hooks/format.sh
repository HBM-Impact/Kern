#!/bin/bash
# Format all files edited this turn

QUEUE="$CLAUDE_PROJECT_DIR/.claude/hooks/.format-queue"

[ ! -f "$QUEUE" ] && exit 0

# Deduplicate and format
sort -u "$QUEUE" | while IFS= read -r FILE_PATH; do
  [ -f "$FILE_PATH" ] && cd "$CLAUDE_PROJECT_DIR" && pnpm exec biome check --write --unsafe "$FILE_PATH" 2>/dev/null
done

rm -f "$QUEUE"
exit 0
