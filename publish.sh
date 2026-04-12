#!/bin/bash
# Build and publish to GitHub Pages.
# Works in worktrees — pushes _site/ to gh-pages branch without checkout.
#
# Usage: ./publish.sh

set -e

REMOTE="${1:-dashorst}"

echo "Building Jekyll site..."
bundle exec jekyll build

echo "Publishing _site/ to gh-pages branch on '$REMOTE'..."
cd _site
git init
git checkout -b gh-pages
git add -A
git commit -m "Publish site $(date +%Y-%m-%d-%H%M)"
git push -f "$(git -C .. remote get-url $REMOTE)" gh-pages
cd ..
rm -rf _site/.git

echo ""
echo "Done. Configure GitHub Pages to serve from gh-pages branch (root)."
echo "Site: https://dashorst.github.io/wicket-site/"
