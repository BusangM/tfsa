#!/usr/bin/env bash
# Run the app from WSL's Linux filesystem (reliable npm/native deps).
# Syncs source from the Windows project path, then starts the dev server.
set -eu

WIN_PROJECT="/mnt/c/Users/bumos/Documents/tfsa-learn"
LINUX_PROJECT="$HOME/tfsa-learn"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 20 >/dev/null 2>&1 || true
nvm use 20

mkdir -p "$LINUX_PROJECT"
rsync -a --delete \
  --exclude node_modules \
  --exclude .next \
  "$WIN_PROJECT/" "$LINUX_PROJECT/"

cd "$LINUX_PROJECT"
if [ ! -d node_modules ]; then
  npm install
fi

npm run dev
