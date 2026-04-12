#!/bin/bash
# Build and publish to GitHub Pages.
# Works in worktrees — pushes _site/ to gh-pages branch without checkout.
#
# Usage: ./publish.sh

set -e

REPO="git@github.com:dashorst/wicket-site.git"

echo "Building Jekyll site..."
bundle exec jekyll build

echo "Publishing _site/ to gh-pages branch..."
cd _site
git init
git checkout -b gh-pages
git add -A
git commit -m "Publish site $(date +%Y-%m-%d-%H%M)"
git push -f "$REPO" gh-pages
cd ..
rm -rf _site/.git

echo ""
echo "Done. Site: https://dashorst.github.io/wicket-site/"
