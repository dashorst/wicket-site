#!/usr/bin/env node
/**
 * Migration script: Jekyll _posts -> Astro content/blog
 * Finds all <year>/_posts/*.md files and migrates them to src/content/blog/<year>/<filename>.md
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_BASE = join(ROOT, 'src/content/blog');

let migrated = 0;
let failed = 0;
const failures = [];

/**
 * Parse Jekyll frontmatter from file content.
 * Returns { frontmatter: Record<string,string>, body: string }
 */
function parseFrontmatter(content) {
  if (!content.startsWith('---')) {
    return { frontmatter: {}, body: content };
  }
  const endIndex = content.indexOf('\n---', 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: content };
  }
  const fmBlock = content.slice(3, endIndex).trim();
  const body = content.slice(endIndex + 4).trim();

  const frontmatter = {};
  // Parse simple key: value pairs (handles unquoted, single-quoted, double-quoted values)
  const lines = fmBlock.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) { i++; continue; }
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Handle multi-line values (indented continuation) - skip for now, take first line
    if (val.startsWith('"')) {
      // Double-quoted
      const closeIdx = val.indexOf('"', 1);
      if (closeIdx !== -1) {
        val = val.slice(1, closeIdx);
      } else {
        val = val.slice(1);
      }
    } else if (val.startsWith("'")) {
      // Single-quoted
      const closeIdx = val.indexOf("'", 1);
      if (closeIdx !== -1) {
        val = val.slice(1, closeIdx);
      } else {
        val = val.slice(1);
      }
    }
    // else unquoted - use as-is

    frontmatter[key] = val;
    i++;
  }

  return { frontmatter, body };
}

/**
 * Strip Jekyll Liquid template tags from body content.
 */
function stripLiquid(body) {
  // Remove {% ... %} block tags (including multi-line)
  let result = body.replace(/\{%[-\s]*[\s\S]*?[-\s]*%\}/g, '');
  // Remove {{ ... }} output tags
  result = result.replace(/\{\{[\s\S]*?\}\}/g, '');
  // Clean up multiple blank lines left behind
  result = result.replace(/\n{3,}/g, '\n\n').trim();
  return result;
}

/**
 * Determine tag from slug.
 */
function determineTag(slug) {
  if (slug.includes('released') || slug.includes('release')) return 'release';
  if (slug.includes('cve') || slug.includes('security')) return 'security';
  return 'community';
}

/**
 * Quote a YAML string value if it contains special characters.
 */
function yamlQuote(str) {
  // If contains colon, double-quote, backslash, or leading/trailing spaces, quote it
  if (/[:"\\]/.test(str) || str.startsWith(' ') || str.endsWith(' ') || str.startsWith('#')) {
    // Escape any double-quotes inside
    const escaped = str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  return str;
}

// Find all year directories
const yearDirs = readdirSync(ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory() && /^\d{4}$/.test(d.name))
  .map(d => d.name)
  .sort();

for (const year of yearDirs) {
  const postsDir = join(ROOT, year, '_posts');
  if (!existsSync(postsDir)) continue;

  const files = readdirSync(postsDir).filter(f => f.endsWith('.md'));

  for (const filename of files) {
    const filepath = join(postsDir, filename);

    // Extract date and slug from filename (YYYY-MM-DD-slug-rest.md)
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
    if (!match) {
      console.warn(`  SKIP (bad filename): ${filename}`);
      failed++;
      failures.push({ file: filepath, reason: 'bad filename format' });
      continue;
    }

    const [, date, slugPart] = match;
    const slug = slugPart;

    let content;
    try {
      content = readFileSync(filepath, 'utf-8');
    } catch (e) {
      console.warn(`  SKIP (read error): ${filename}: ${e.message}`);
      failed++;
      failures.push({ file: filepath, reason: e.message });
      continue;
    }

    const { frontmatter, body } = parseFrontmatter(content);

    let title = frontmatter.title || '';
    if (!title) {
      // Derive title from slug
      title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      console.warn(`  WARN (no title, derived): ${filename} -> "${title}"`);
    }

    const tag = determineTag(slug);
    const cleanBody = stripLiquid(body);

    const outputDir = join(OUTPUT_BASE, year);
    mkdirSync(outputDir, { recursive: true });

    const outputFile = join(outputDir, `${date}-${slug}.md`);
    const frontmatterOutput = `---
title: ${yamlQuote(title)}
date: ${date}
tags: ["${tag}"]
---
${cleanBody}
`;

    try {
      writeFileSync(outputFile, frontmatterOutput, 'utf-8');
      migrated++;
    } catch (e) {
      console.warn(`  SKIP (write error): ${filename}: ${e.message}`);
      failed++;
      failures.push({ file: filepath, reason: e.message });
    }
  }
}

console.log(`\nMigration complete: ${migrated} posts migrated, ${failed} failed.`);
if (failures.length > 0) {
  console.log('\nFailures:');
  for (const f of failures) {
    console.log(`  ${f.file}: ${f.reason}`);
  }
}
