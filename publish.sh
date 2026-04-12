#!/bin/bash
# Build the Jekyll site and prepare it for GitHub Pages deployment.
# Run this from the project root inside the devcontainer.
#
# Usage: ./publish.sh
#
# This builds _site/ and copies it to the gh-pages branch,
# which GitHub Pages serves from.

set -e

echo "Building Jekyll site..."
bundle exec jekyll build

echo "Switching to gh-pages branch..."
# Save the built site
cp -r _site /tmp/wicket-site-build

# Create or switch to gh-pages branch
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

# Clean everything except .git
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# Copy the built site
cp -r /tmp/wicket-site-build/* .
cp /tmp/wicket-site-build/.* . 2>/dev/null || true

# Commit and push
git add -A
git commit -m "Publish site $(date +%Y-%m-%d)"
echo ""
echo "Built site is on the gh-pages branch."
echo "Push with: git push dashorst gh-pages"
echo "Then configure GitHub Pages to serve from gh-pages branch (root)."

# Switch back
git checkout -
rm -rf /tmp/wicket-site-build
