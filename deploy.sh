#!/bin/bash

# --------------------------------------------------
# deploy.sh — Push latest changes to GitHub Pages
# --------------------------------------------------

# Color codes
green="\033[0;32m"
red="\033[0;31m"
yellow="\033[1;33m"
reset="\033[0m"

ok() { echo -e "${green}✔ $1${reset}"; }
err() { echo -e "${red}✖ $1${reset}"; }
info() { echo -e "${yellow}➜ $1${reset}"; }

set -e

# Ask for commit message
echo -e "${yellow}Enter commit message:${reset}"
read commit_msg

if [ -z "$commit_msg" ]; then
  err "Commit message cannot be empty!"
  exit 1
fi

# Commit changes
git add .
git commit -m "$commit_msg" && ok "Changes committed"

# Ensure on master
info "Checking current branch..."
git checkout master >/dev/null 2>&1 && ok "Switched to master" || err "Failed to switch"

git pull origin master && ok "Master updated"

# Check gh-pages
info "Checking if gh-pages exists..."
if git show-ref --quiet refs/heads/gh-pages; then
  ok "gh-pages branch exists"
else
  info "Creating gh-pages branch..."
  git branch gh-pages
  ok "gh-pages created"
fi

# Sync gh-pages
info "Syncing gh-pages with master..."
git checkout gh-pages
git reset --hard master && ok "gh-pages now matches master"

# Push to GitHub Pages
git push origin gh-pages --force && ok "Deployment successful!" || err "Failed to deploy"

# Switch back
info "Switching back to master..."
git checkout master && ok "Back on master"

ok "✨ Deployment complete!"
