#!/usr/bin/env bash
set -eu

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20

PROJECT="${1:-$HOME/tfsa-learn}"
cd "$PROJECT"

rm -rf node_modules
npm install
npm run build

echo "OK: build succeeded in $PROJECT with Node $(node -v)"
