#!/bin/bash
# Build and publish to GitHub Pages.
# Works in worktrees and devcontainers.
# Uses HTTPS + gh auth token to avoid SSH key issues.
#
# Usage: ./publish.sh

set -e

REPO="https://github.com/dashorst/wicket-site.git"

echo "Building Jekyll site..."
bundle exec jekyll build

echo "Publishing _site/ to gh-pages branch..."
rm -rf _site/.git
cd _site
git init
git checkout --orphan gh-pages
git add -A
git commit -m "Publish site $(date +%Y-%m-%d-%H%M)"

# Use gh auth token for HTTPS push if available
if command -v gh &> /dev/null; then
  GH_TOKEN=$(gh auth token 2>/dev/null || true)
  if [ -n "$GH_TOKEN" ]; then
    REPO="https://x-access-token:${GH_TOKEN}@github.com/dashorst/wicket-site.git"
  fi
fi

git push -f "$REPO" gh-pages
cd ..
rm -rf _site/.git

echo ""
echo "Done. Site: https://dashorst.github.io/wicket-site/"
