---
name: Apache Wicket
description: The project site for Apache Wicket, told as a reveal - a page is a tree of components, built up step by step in monochrome with Wicket orange as the only accent.
colors:
  wicket-orange: "#ff9925"
  orange-dim: "rgba(255, 153, 37, .5)"
  orange-wash: "rgba(255, 153, 37, .12)"
  ground: "#0c0c0c"
  surface: "#141414"
  surface-raised: "#1b1b1b"
  rule: "#262626"
  rule-strong: "#3a3a38"
  ink: "#f3f3f0"
  ink-2: "#c3c3be"
  ink-3: "#8c8c87"
  code-ink: "#d6d6d1"
  white: "#ffffff"
  asf-tile: "#f6f6f3"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.038em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2.125rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  step-title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.7vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label-mono:
    fontFamily: "Red Hat Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
  code:
    fontFamily: "Red Hat Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
  figure:
    fontFamily: "Red Hat Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.1
rounded:
  tag: "4px"
  inline-code: "5px"
  row: "6px"
  control: "9px"
  button: "10px"
  code-block: "12px"
  install: "13px"
  panel: "16px"
  stage: "18px"
  pill: "999px"
spacing:
  page-gutter: "clamp(20px, 4.5vw, 64px)"
  section: "clamp(96px, 14vh, 168px)"
  content-max: "1320px"
  measure: "68ch"
  reading-max: "54rem"
  rail-width: "15rem"
  tree-row: "30px"
  tree-indent: "20px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ground}"
  button-go:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.button}"
    padding: "14px 22px"
  install-box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.install}"
    padding: "10px"
  install-copy:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  segmented-pill:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  segmented-pill-checked:
    textColor: "{colors.ink}"
  field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.panel}"
    padding: "22px 24px"
  reveal-stage:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stage}"
  code-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.code-ink}"
    typography: "{typography.code}"
    rounded: "{rounded.code-block}"
    padding: "18px 20px"
  inline-code:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inline-code}"
    padding: ".08em .36em"
  status-tag:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.tag}"
    padding: "0 6px"
  tree-row-active:
    textColor: "{colors.wicket-orange}"
    rounded: "{rounded.row}"
    height: "{spacing.tree-row}"
  asf-tile:
    backgroundColor: "{colors.asf-tile}"
    rounded: "{rounded.button}"
    padding: "12px 16px"
---

# Design System: Apache Wicket

## Overview

**Creative North Star: "The Component Tree, Revealed"**

The site is a dark, code-led reading room in which every surface explains one idea: a Wicket page is a tree of components. The homepage builds that tree in front of the reader. Seven numbered steps each add a few lines of real Java or HTML, and a sticky stage beside them grows one branch of the tree per step, with the new lines and the new node lit in orange. The rest of the site reuses that tree as its wayfinding: the reading rail on sub pages hangs the page's sections on the same orange elbow lines, and the section in view lights up exactly like a node a reveal step adds.

The world is monochrome. A near-black ground carries warm off-white and grey ink in three steps, separated by one-pixel rules rather than boxes or shadows. Wicket orange, the colour of the registered mark, is the only hue on any page, and it is spent on meaning: the mark, the tree line, the active or checked state, and the underline of every link. Type is one grotesque at heavy weights for headings and calm regular weight for reading, with a monospace for code, versions, dates and small structural labels. Density is generous on the homepage (tall section spacing, display-sized lockup) and tight and tabular on reference pages (release board, upgrade paths, news archive).

The structure follows vercel.com/eve: a centred hero with one install box, then sections that each open with a large two-column head and continue with code, facts or a ruled list. The site stays Markdown-driven: furniture is styled from plain Markdown output and data files, so a volunteer edits text and data, not markup.

**Key Characteristics:**
- Near-black ground, three steps of warm grey ink, one-pixel rules for structure.
- Wicket orange as the single accent, carrying meaning only (mark, tree line, active state, link underline).
- The component tree with orange elbow connectors as the recurring signature, on the homepage and in every reading rail.
- Heavy, tightly tracked Schibsted Grotesk headings; Red Hat Mono for code, versions, dates and structural labels.
- Light primary buttons (ink on dark), never orange buttons.
- Motion is a reading aid: steps brighten, nodes grow in, new code lines wipe in; all of it disappears under reduced motion.

## Colors

A monochrome dark palette with one warm accent taken from the registered mark.

### Primary
- **Wicket Orange** (wicket-orange): the registered mark's own fill, and the only hue in the system. Used for the mark, the component-tree connectors of the active branch, the active reveal step number, the active tree node and rail entry, checked segmented controls (as a 1px outline), the select chevron, the focus ring, text selection, the caret, the "live" status dot, link underlines and link hover text.
- **Orange Dim** (orange-dim): the resting component-tree and rail connector line; also the lighter underline of long title lists in the news archive.
- **Orange Wash** (orange-wash): the glow behind an active tree row, an active rail entry and newly added code lines, always as a left-to-right gradient fading towards transparent.

### Neutral
- **Ground** (ground): the page background, and the text colour on light buttons.
- **Surface** (surface): panels that hold code or data: install box, reveal stage and step figures, release board, code blocks, quick start wizard, compact rail on narrow screens.
- **Raised Surface** (surface-raised): inline code chips and the copied state of a button.
- **Rule** (rule): the default one-pixel divider (section strip, list rows, table rows, panel borders, footer top).
- **Strong Rule** (rule-strong): borders of interactive controls (install box, pills, select, fields), tag outlines, table heads, blockquote bar.
- **Ink** (ink): headings, link text, values that matter (versions, dates in the board, `dt` terms), light button fill.
- **Ink 2** (ink-2): body text, navigation at rest, captions.
- **Ink 3** (ink-3): metadata and quiet labels: dates, column heads, mono labels, list markers, the lockup version number, inactive reveal steps.
- **Code Ink** (code-ink): default text in code blocks; syntax tokens are greys between Ink 3 and White, strings brightest.
- **White** (white): hover fill of light buttons only.
- **ASF Tile** (asf-tile): the light tile behind the ASF logo in the footer, so the logo's own colours stay legible on the dark ground.

### Named Rules
**The Orange Is Meaning Rule.** Orange appears only on the mark, the tree line, an active, checked or current state, a focus ring, and the link underline. No orange fills, orange headings, orange backgrounds or orange buttons. Test: every orange pixel on a screen must answer "this is Wicket" or "this is where you are / what is selected / where you can go".

**The Grey Syntax Rule.** Code is highlighted in greys only (keywords and tags mid-grey, strings near-white, comments dim). Orange in code marks a line added by the current step, never a token type.

**The Light Button Rule.** The primary action is an ink-filled button with ground-coloured text, turning white on hover. Orange is never a button fill.

## Typography

**Display Font:** Schibsted Grotesk (with system-ui, sans-serif), self-hosted at 400, 400 italic, 500, 700, 800.
**Body Font:** Schibsted Grotesk.
**Label/Mono Font:** Red Hat Mono (with ui-monospace, SFMono-Regular, Menlo), self-hosted at 400 and 500.

**Character:** One grotesque does all the talking: at 800 with tight negative tracking it reads as poster-like headings, at 400 it is a calm reading face. The monospace is the voice of the code and of anything machine-like (versions, dates, file names, step numbers, rail and column labels).

### Hierarchy
- **Display** (800, lockup only, tracking -0.04em): the homepage lockup "Apache Wicket 11"; the version number is set at 400 in Ink 3.
- **Headline** (800): homepage section heads; the page title band uses the same treatment capped at 4rem with line-height 1.03.
- **Title** (800): h1/h2 inside reading pages.
- **Step Title** (700): the reveal steps' headings, preceded by a two-digit mono step number at 0.72em.
- **Subtitle** (700): h3 in reading pages, release highlight titles; homepage cards use 1.1875rem at the same weight.
- **Lead** (400): the page sub-title under a page heading; the homepage definition runs larger (clamp(1.2rem, 1.9vw, 1.6rem), line-height 1.38, 38ch) and the preamble paragraph smaller in Ink.
- **Body** (400, line-height 1.6, 1.7 in reading pages, measure 68ch).
- **Small** (400): metadata, captions, board footers, stage captions.
- **Label Mono** (500, no case change, no extra tracking): rail title "On this page", file names over code, column heads in the board group rows, news dates.
- **Figure** (mono 500): large numbers in release-highlight fact rows.

### Named Rules
**The Heavy Heading Rule.** Every heading is Schibsted Grotesk at 700 or 800 with negative tracking proportional to size (-0.04em at display down to -0.01em at small heads), balanced wrapping. No light or thin heading weights.

**The Mono Is Machine Rule.** Monospace is for code and machine values (versions, dates, file names, step numbers) and for small structural labels. Prose never runs in mono.

## Layout

Content sits in a centred column of at most 1320px with a fluid page gutter (clamp(20px, 4.5vw, 64px)). Homepage sections are separated by a tall fluid gap (clamp(96px, 14vh, 168px)); the footer keeps the same gap above it.

Homepage sections open with a two-column head (headline at 1.15fr, a short paragraph at 0.85fr, bottom-aligned), collapsing to one column below 860px. The reveal uses a 4:9 text-to-figure grid per step in its static form; with JavaScript, a wide screen (1000px and up) and motion allowed it becomes a 3.6:8.4 grid of step texts beside one sticky stage (height min(720px, 100vh - 120px), vertically centred). Below 1000px, without JavaScript or under reduced motion, every step keeps its own tree and code figure inline. The "stable" section pairs a two-column fact list with the compact release board (6fr:5fr), stacking below 1100px. "New in Wicket 11" is four columns divided by vertical rules (two at 1099px, one at 600px); "Built with Wicket" is a three-column ruled name list at subtitle size, followed by the onward row: three ruled columns (User guide, Migration guides, Help and support).

Reading pages have a title band (heading, sub-title, optional mono date) closed by a rule, then a reading column of at most 54rem. From 1100px a page with a table of contents gets a 15rem sticky rail at the left; the news archive gets a 13rem sticky year index at the right. Below 1100px the rail becomes a compact index panel above the text, showing only the first level.

Breakpoints in use: 600px (phones), 760px (tables reflow to cards), 860px (two-column heads collapse), 999px (sub-page nav wraps under the brand), 1000px (sticky reveal stage), 1100px (rail and index appear), 1280px (step figures stack their tree above the code). Touch screens get 44px targets on small links.

## Elevation & Depth

The system is flat. Depth comes from tonal steps (ground, surface, raised surface) and one-pixel rules, not shadows. Two soft ambient shadows exist and both sit under objects that float over the page: the sticky reveal stage, and book covers on the books page.

### Shadow Vocabulary
- **Stage float** (`box-shadow: 0 30px 80px -40px rgba(0, 0, 0, .9)`): only on the sticky reveal stage.
- **Cover** (`box-shadow: 0 0 0 1px var(--line-2), 0 18px 40px -24px rgba(0, 0, 0, .9)`): book covers; on hover the ring becomes a 2px orange ring.

### Named Rules
**The Rule-Not-Box Rule.** Lists, tables, facts and news entries are separated by one-pixel top rules in Rule, not by cards. A surface panel is reserved for content that is code, data or a control.

## Shapes

Corners are softly rounded and scale with the size of the object: 4px for tags and the focus ring, 5px for inline code, 6px for tree rows, rail entries and images, 9-10px for controls and buttons, 12px for code blocks, 13px for the install box, 16px for panels (step figure, release board, wizard), 18px for the reveal stage. Segmented controls and the build-tool select are full pills. Borders are always one pixel; the only two-pixel lines are the link underline, the focus outline, the orange bar on a newly added code line and the blockquote bar. The component-tree connector is a one-pixel elbow with a 6px rounded corner, and the same elbow draws the reading rail.

## Components

### Masthead
- **Home:** the menu alone, centred, no brand: the hero lockup carries the mark.
- **Sub pages:** the registered mark (32px) and the wordmark "Apache Wicket" in the heading face (800, 1.3125rem, -0.035em) at the left, menu at the right; below 1000px the menu wraps onto its own line, left-aligned.
- **Menu:** 0.9375rem, 500, Ink 2 at rest, Ink on hover; the current section is Ink with the orange 2px underline at a 0.5em offset. GitHub carries an inline 16px SVG mark.

### Lockup
The homepage hero: registered mark at 0.9em, "Apache Wicket" in Display, the current major version in Ink 3 at 400. Below it the definition (Lead, centred, 38ch). On phones the mark sits above the name at 64px.

### Install Box
A surface panel (1px Strong Rule border) with a row of controls and a command row. Controls: a segmented pill for the mode (Existing project / New project), a segmented pill for the release line (current and LTS, full versions in mono), a native select for the build tool (Maven, Gradle, bld, AI prompt) with an orange chevron. Each segmented pill is a radio group with one tab stop and arrow keys. The checked segment gets a 1px orange outline, Ink text and the Raised Surface, never an orange fill, so it reads apart from the focus ring. The command is mono Ink in a single line (58ch, ellipsis), one option per line for a new project, or wrapping prose for a prompt; the Copy button is a light button with an inline copy icon. Under the box a centred hint in Ink 3 says what the copy is and what it needs; after a copy the outcome replaces it for a few seconds. Versions and templates come from `_data/releases.yml` and `_config.yml`. Versions and templates come from `_data/releases.yml` and `_config.yml`.

### News Strip
A full-width band between two Rule lines directly under the hero: up to four headlines in equal columns across the page (one column on phones). Each item is one link as a whole: a bold title (700, 1.0625rem) with the orange underline and under it one short teaser in Ink 3 (0.9375rem, balanced wrap) that hints at what is behind the link without giving it away. Hover turns the title orange and the teaser Ink 2. Both come from `_data/news_strip.yml` (`title`, `note`, `url`). The onward row at the end of the homepage uses the same pattern.

### Reveal Step and Sticky Stage
Each step is a two-digit mono number and a Step Title, then a short paragraph (40ch). Inactive steps are dimmed to Ink 3; the active step goes to Ink with its number in orange (0.45s). The stage is a surface panel (18px radius, Stage float shadow) with a bar (page name in bold sans, "04 / 07" in mono), the big tree at the left (38%, min 214px) with a caption at its foot, and the code panes at the right. Panes cross-fade and rise 12px; added lines wipe in an orange wash with a 2px orange bar, staggered 45ms per line.

### Component Tree
A list of nodes, each row showing the id (mono, Ink), the component type (Ink 3) and the markup tag (mono, Ink 3, right-aligned; hidden when the container is narrow). The root is set in bold sans. Children hang on one-pixel Orange Dim elbows (6px corner); the active node's elbow turns full orange, its row gets the Orange Wash gradient and its id turns orange. In the stage, nodes grow in by animating grid rows from 0fr to 1fr (0.6s) with a delayed fade.

### Release Board
- **Compact (homepage):** a surface panel with a small heading, group rows (In service / Next / Ended) as small Ink 3 labels over a Rule, release name in Ink, version in mono, LTS as an outlined tag, date right-aligned in mono; a footer link to the full board.
- **Full (download page):** a plain table in the reading column with columns Release, Service, When, Supported, Status; versions are mono links; status "live" carries a 7px orange dot; end-of-life rows drop to Ink 3 with an outlined EOL tag. Below 760px each row becomes a two-column card. Both boards render from `_data/releases.yml`.

### Reading Layout and Rail
Title band, then rail plus reading column. The rail is the component tree applied to the page's table of contents: Ink 3 entries hanging on Orange Dim elbows under a mono "On this page" label; the section in view is orange text on the Orange Wash with a full-orange elbow. Jump lists that only repeat the rail are hidden on pages that have one.

### Tables
Full width, no vertical rules, no zebra. Head cells are small 500 Ink 3 over a Strong Rule; body rows are separated by Rule lines; row header cells are 700 Ink. Below 760px wide tables scroll inside their own box; the release and upgrade tables reflow to stacked rows instead.

### Code
Blocks are surface panels (12px radius, 1px Rule border, padding 18px 20px) in Code Ink with grey Rouge highlighting; a file name in Label Mono may sit above. Inline code is a small chip (Raised Surface, 1px Rule border, 5px radius, 0.86em).

### Links
Ink text with a 2px orange underline at a 0.28em offset; hover turns the text orange. Inside navigation, rails, indexes and buttons the underline is dropped and hover moves to Ink or orange text. Long title lists use a 1px Orange Dim underline.

### Buttons and Pills
- **Primary:** light button (Ink fill, Ground text, 700 1rem, 10px radius, 12px 20px), white on hover, 1px press-down on active.
- **Go:** the larger homepage variant (14px 22px) with a drawn arrow made from a clipped shape in the text colour.
- **Jump list:** the Markdown `.button-bar` becomes a ruled grid of plain labels (600, Ink, top Rule), orange on hover.
- **Pills:** segmented controls and select in the install box (full radius, 1px Strong Rule border); the checked state is an orange outline on the Raised Surface.
- **Tags:** LTS and EOL as small 500 labels in a 1px Strong Rule outline with a 4px radius.

### Inputs / Fields
Quick start wizard fields: Ground fill inside a surface panel, 1px Strong Rule border, 9px radius, mono 0.9375rem Ink text; focus turns the border orange (no outline glow). Selects use the orange chevron. The full-width light button copies the command; its copied state is Raised Surface with an inset orange ring.

### Section Index and Facts
Section landing pages list their pages as a ruled grid: label (700 Ink) with a one-line description in Ink 3; hover turns the label orange. Facts are a definition list (term 700 Ink, description body) in a two-column grid. Release highlights repeat the ruled pattern with optional mono Figure numbers and a code block.

### News Archive
Entries separated by top Rules: title as Subtitle link, date in Label Mono, summary. Earlier years collapse to a compact two-column list of mono date and title. A sticky year index at the right (from 1100px) lists years in mono and months as small Ink 3 links. Posts end with a ruled back-link row.

### Footer
A top Rule, then the ASF logo on its light tile (10px radius) beside a wrapping row of Ink 2 links (orange on hover) and the legal text in small Ink 3.

## Do's and Don'ts

### Do:
- **Do** spend orange only on the mark, the tree line, active/checked/current states, the focus ring and link underlines.
- **Do** separate list items, table rows and facts with one-pixel Rule lines; keep surface panels for code, data and controls.
- **Do** reuse the component-tree elbow (one pixel, Orange Dim, 6px corner, full orange when active) for any new hierarchical wayfinding.
- **Do** mark a current item the way the reveal marks a new node: orange text on the Orange Wash gradient, full-orange connector.
- **Do** set versions, dates, file names and step numbers in Red Hat Mono.
- **Do** keep every animated reveal readable without it: under reduced motion, without JavaScript and below 1000px every step shows its own tree and code.
- **Do** drive release-dependent content (install box, release boards, strip) from `_data/` and `_config.yml`, never hard-coded versions in templates.
- **Do** keep the registered orange-circle mark unchanged and the ASF logo on its light tile.

### Don't:
- **Don't** fill buttons, backgrounds or headings with orange, or introduce a second hue.
- **Don't** colour syntax tokens; code highlighting stays grey, with orange only for lines added by the current step.
- **Don't** wrap lists of links or facts in cards; use ruled rows.
- **Don't** add shadows beyond the stage float and the book cover; depth is tonal.
- **Don't** use icon fonts; icons are inline SVG (the leftover Font Awesome elements in old Markdown are hidden).
- **Don't** set headings below weight 700 or run prose in monospace.
