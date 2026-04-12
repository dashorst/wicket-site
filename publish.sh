#!/bin/bash
# Two-step publish for GitHub Pages.
#
# Step 1: Build (run in devcontainer where Jekyll is installed)
#   ./publish.sh build
#
# Step 2: Push (run on host where SSH keys work)
#   ./publish.sh push
#
# Or run both if Jekyll and git push both work in your environment:
#   ./publish.sh

set -e

REPO="git@github.com:dashorst/wicket-site.git"

do_build() {
  echo "Building Jekyll site..."
  bundle exec jekyll build
  echo "Build complete in _site/"
}

do_push() {
  echo "Publishing _site/ to gh-pages branch..."
  rm -rf _site/.git
  cd _site
  git init
  git checkout --orphan gh-pages
  git add -A
  git commit -m "Publish site $(date +%Y-%m-%d-%H%M)"
  git push -f "$REPO" gh-pages
  cd ..
  rm -rf _site/.git
  echo ""
  echo "Done. Site: https://dashorst.github.io/wicket-site/"
}

case "${1:-all}" in
  build) do_build ;;
  push)  do_push ;;
  all)   do_build; do_push ;;
  *)     echo "Usage: $0 [build|push|all]" ;;
esac
