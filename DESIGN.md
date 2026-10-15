---
name: Apache Wicket
description: The project site for Apache Wicket, where one orange ribbon runs through the component tree under a seasonal photograph.
colors:
  ribbon: "#EE7F2D"
  ribbon-under: "#C9661F"
  ribbon-text: "#F39A55"
  ribbon-deep: "#9A430A"
  cloth: "#103C35"
  cloth-deep: "#0B2E28"
  muted: "#A8C7BD"
  paper: "#F6F8F7"
  paper-tint: "#E9F0ED"
  code-bg: "#E4ECE8"
  rule: "#CFDAD5"
  field-stroke: "#9FB4AC"
  ink: "#14241F"
  ink-soft: "#4A5E57"
  code-green: "#1C5E43"
  code-tag: "#0F4A40"
typography:
  display:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(3.4rem, 5.6vw, 5.1rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(2rem, 3vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.2
  lead:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Alegreya SC, Alegreya, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.03em"
  ui:
    fontFamily: "Alegreya Sans, Alegreya, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.2
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  square: "2px"
  bead: "3px"
spacing:
  pad-wide: "56px"
  pad-mid: "36px"
  pad-narrow: "18px"
  column-gap: "48px"
  section-y: "56px"
  measure: "68ch"
  max: "1440px"
  ribbon-w: "7px"
components:
  button-primary:
    backgroundColor: "{colors.ribbon}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.square}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.ribbon-text}"
    textColor: "{colors.ink}"
  bead:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.bead}"
    padding: "0 1ch"
  bead-lit:
    backgroundColor: "{colors.ribbon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bead}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 44px 0 12px"
    height: "44px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.square}"
    padding: "14px 16px"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "16px 18px 18px"
  cloth-band:
    backgroundColor: "{colors.cloth}"
    textColor: "{colors.paper}"
    padding: "40px 56px"
  footer:
    backgroundColor: "{colors.cloth}"
    textColor: "{colors.muted}"
    padding: "40px 56px 48px"
---

# Design System: Apache Wicket

## Overview

**Creative North Star: "The Ribbon Through the Tree"**

A Wicket page is a tree of Java components that mirrors its HTML, and the site is drawn the same way: one orange ribbon runs from the seasonal photograph at the top of a page down into the component tree, into the reading rail, into lists of guide pages, folding at a square elbow into every child. The ribbon is the only loud element. Everything else is cool paper, bookcloth green and ink, set in a humanist book face.

Every page opens on a photograph of the current season (or a dated occasion) under a cool paper veil that only thickens where text sits. The homepage hero carries the lockup on it; every other page carries its title band on it. Below the photograph the page turns to paper for reading, with bookcloth green fields for the homepage component tree and the footer, and a pale green tint for alternating sections and asides. The density is that of a well-set book: generous measure, ink rules above lists and tables, hairlines between rows, few boxes.

The world refuses the framework-homepage default of a headline, a code panel and three feature cards, and it refuses cream or warm paper.

**Key Characteristics:**
- One orange ribbon, drawn as a continuous band with square folded elbows, connecting parent to child wherever there is a hierarchy.
- A seasonal photograph behind the masthead and title on every page, under a paper veil.
- Bookcloth green fields for the tree and the footer; cool paper and a pale green tint for reading.
- Alegreya for headings and body, Alegreya SC for dates and small labels, Alegreya Sans for interface text, JetBrains Mono for code.
- Square corners (2px), beads at 3px, ink rules (2px) over lists and tables, hairlines (1px) between rows.

## Colors

A cool, green-grey book palette with a single warm voice: Wicket orange.

### Primary
- **Wicket Ribbon Orange** (`ribbon`): the ribbon itself, rules that open a highlighted list, the run of ribbon under the active menu item, the lit bead, the one action button, text selection. Graphic use only; never text on paper.
- **Ribbon Reverse** (`ribbon-under`): the ribbon's back side, shown on diagonal runs at a fold in the drawn tree and as the stroke of knots.
- **Ribbon on Cloth** (`ribbon-text`): orange for text and code on the green fields (5.6:1), and the hover state of orange buttons.
- **Burnt Ribbon** (`ribbon-deep`): orange for text on paper (6.2:1): link underlines, dates, small-caps labels, list markers, Java keywords, the focus ring.

### Secondary
- **Bookcloth Green** (`cloth`): the homepage component-tree band and the footer.
- **Deep Bookcloth** (`cloth-deep`): name chips in the narrow-screen tree list, the photo credit chip.
- **Lichen** (`muted`): secondary text on cloth (6.7:1).

### Neutral
- **Cool Paper** (`paper`): the page ground, sheets, fields, beads at rest. Also the veil over the photograph.
- **Pale Green Tint** (`paper-tint`): the second field for alternating homepage sections, blockquotes and version notes.
- **Code Ground** (`code-bg`): code blocks, inline code, the quick start's generated command.
- **Hairline** (`rule`): 1px row separators and section hairlines.
- **Field Stroke** (`field-stroke`): input and select borders, scrollbar thumb.
- **Ink** (`ink`): text, headings, the 2px ink rules, and text on orange.
- **Soft Ink** (`ink-soft`): secondary text, summaries, file names, table headers (6.3:1 on paper).
- **Code Green** (`code-green`) and **Tag Green** (`code-tag`): strings and numbers, and HTML tags and types, in highlighted code.

### Named Rules
**The One Ribbon Rule.** Wicket orange is a ribbon, a rule or the one action on a screen. It is never a fill for a panel, a heading color or a decorative wash beyond the light hover tint (`rgba(238, 127, 45, .16)`).

**The Two Oranges Rule.** Text in orange uses `ribbon-deep` on paper and `ribbon-text` on cloth. The bright `ribbon` carries ink text when it is a fill.

**The Cool Paper Rule.** The ground is cool paper with a green cast. No cream, no warm white, no pure white.

## Typography

**Display Font:** Alegreya (with Georgia, serif)
**Body Font:** Alegreya (with Georgia, serif)
**Label Font:** Alegreya SC for dates and small labels; Alegreya Sans for interface text
**Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** One humanist book family in three cuts: the serif reads and titles, the small caps date and label, the sans runs the menu, buttons and metadata. All four families are self-hosted under the SIL Open Font License.

### Hierarchy
- **Display** (700, `clamp(3.4rem, 5.6vw, 5.1rem)`, 0.9): the homepage lockup "Apache Wicket", with the release number at the same size in weight 400 behind a 3px orange rule.
- **Headline** (700, `clamp(2.4rem, 4.4vw, 3.8rem)`, 1.02): the title of every page on the photo band, at most 20ch wide.
- **Section** (700, `clamp(2rem, 3vw, 2.6rem)`, 1.05): homepage and guide front-page section titles.
- **Title** (700, `clamp(1.75rem, 2.6vw, 2.25rem)`, 1.1): h2 inside reading pages and guide groups.
- **Subtitle** (700, 1.45rem, 1.2): h3 in reading pages and the "Why Wicket" columns; list entries in the serif run 1.2 to 1.35rem.
- **Lead** (italic 400 for taglines and page subtitles; roman 400 for the preamble and definition): the sentence under a title.
- **Body** (400, 1.1875rem, 1.55; 1.6 in reading pages; 1.125rem on phones): running text, at a measure of 68ch.
- **Label** (Alegreya SC 500, 1rem, letter-spacing .03 to .06em): dates, table headers, rail and list headings, "LTS", the guide breadcrumb. Small caps, never forced uppercase.
- **UI** (Alegreya Sans 500 to 700, about 1rem): menu, buttons, links rows, summaries, metadata, table cells.
- **Code** (JetBrains Mono 400, .8125rem, 1.65; 12 to 13px in homepage snippets): code blocks, beads, file paths.

### Named Rules
**The Small Caps Rule.** Dates and labels are set in Alegreya SC in `ribbon-deep` or `ink-soft`. A label names the list or table directly below it; it is not a tag line above a heading.

**The Lining Numbers Rule.** Version numbers in the serif use lining figures; dates in lists use tabular figures.

## Layout

Content sits in a 1440px frame with side padding of 56px, 36px below 1400px, and 18px below 861px. Homepage sections and two-column heads use a 4 : 8 grid with a 48px gap: the title on the left, the text or list on the right. Sections run 56px top and 60px bottom on wide screens, about 44px on phones, alternating paper and pale tint, with the cloth band after the hero and the cloth footer at the end.

Reading pages have a title band on the photograph (at least 200px tall, title bottom-aligned), then a reading column of up to 54rem with a 68ch measure. From 1100px the column gets a sticky 15rem rail on the left for the page's sections, or a 13rem index on the right for the news archive. Below 1100px the rail becomes a first-level index above the text.

The homepage component tree is a three-column grid (Java sheet, ribbon lane, markup sheet) on shared rows. Below 1240px it becomes a nested list with the ribbon down the left, each Java line followed by its tag.

On phones the photograph becomes its own band (380px on the homepage, 250px on other pages) that fades to paper, and the title and lockup read on paper below it. The homepage menu wraps onto two centred rows; other menus scroll sideways with a fade at the edge. Touch targets on link rows get 10px vertical padding under `pointer: coarse`.

## Elevation & Depth

Flat by default. Depth comes from three things: the photograph under its veil, the change of field from paper to tint to cloth, and a single family of soft, low sheets that lift paper off a darker ground.

### Shadow Vocabulary
- **Sheet on cloth** (`box-shadow: 0 1px 0 rgba(0, 0, 0, .06), 0 16px 36px -22px rgba(0, 0, 0, .55)`): the Java and markup sheets in the component tree.
- **Sheet on paper** (`box-shadow: 0 1px 0 rgba(20, 36, 31, .06), 0 14px 30px -20px rgba(6, 26, 22, .35)`): dependency cards and the quick start wizard; the guide search sheet uses the same shape at .45.
- **Dropdown** (`box-shadow: 0 1px 0 rgba(20, 36, 31, .06), 0 24px 48px -24px rgba(6, 26, 22, .55)`): search results over the page.
- **Book cover** (`box-shadow: 0 1px 0 rgba(0, 0, 0, .06), 0 16px 32px -20px rgba(6, 26, 22, .5)`): covers on the books page; on hover a 3px orange ring is added.

### Named Rules
**The Paper Veil Rule.** Text on the photograph sits under a cool paper scrim that is strongest at the masthead and the text corner and clear elsewhere. A dark photo gets the stronger veil; a small photo is shown softened rather than stretched sharp.

**The Low Sheet Rule.** Shadows are long, soft and negative-spread, so a sheet reads as paper resting on a ground. No hard offset shadows, no card stacks.

## Shapes

Corners are square: 2px on buttons, sheets, code, fields, images and chips; 3px on beads (the ribbon's components, letter and step markers, kind and version tags, the lit rail entry). Nothing is rounder.

The ribbon is the recurring form. Drawn in SVG on the homepage it is a mitred band whose diagonal runs show the reverse side; drawn in CSS it is a 5 to 7px left border with a bottom border into each item and a 2px inner radius at the fold, with 3px runs for nested levels. A line in service carries a 16 x 5px run of ribbon before its status.

Rules are structural: a 2px ink rule opens every list, table and index; 1px hairlines separate rows; a 1px or 2px orange rule opens the release line, blockquotes, version notes, the release highlights and the search results.

## Components

### Buttons
Few and orange: one action per section.
- **Shape:** square corners (2px).
- **Primary:** orange fill, ink text, Alegreya Sans 700 at 1.0625rem, 12 to 13px by 18px.
- **Hover / Focus:** fill moves to `ribbon-text` over .15s; focus is a 2px `ribbon-deep` outline at 3px offset.
- **Copy:** a small primary button inside the top right of a snippet; it turns ink on paper when copied.
- **Jump lists:** Markdown button bars render as a ruled index of serif link labels, not as buttons.

### Beads
The components on the ribbon. Monospace or serif label in a 1px orange border, 3px corners, paper fill. Hover, focus or the current item fills orange. The root bead is always filled. Used for the tree's components, the guide's kind tag, A-Z letters, tutorial step numbers, quick start step numbers and the search shortcut key.

### Inputs / Fields
- **Style:** paper fill, 1px `field-stroke` border, 2px corners, 44px tall (52px for the large guide search), Alegreya Sans or mono text.
- **Hover:** border moves to `ink-soft`.
- **Focus:** border in `ribbon-deep` with a 2px orange-wash outline.
- **Selects:** native appearance removed, a small `ribbon-deep` chevron drawn in SVG.

### Cards / Containers
- **Sheets:** paper on a tint or cloth ground, no border, square corners, the low sheet shadow, 16 to 20px padding. Used for dependency cards, the quick start wizard, the guide search and the code sheets of the tree.
- **Asides:** blockquotes and version notes on the pale tint with a 1px orange top rule.

### Navigation
- **Masthead:** lies on the photograph. Alegreya Sans 500 at 1.0625rem, ink, 26px gaps. Hover shows a `ribbon-deep` underline; the current section carries a 4px orange underline at a deep offset. GitHub is set off by a hairline. On the homepage the menu is centred without the brand; elsewhere the mark and the serif wordmark sit left.
- **Rail:** the page's sections hang from the ribbon, which drops from the photograph's edge. Entries are Alegreya Sans in `ink-soft`; hover shows the orange wash; the section in view is a lit bead.
- **Footer:** cloth field, lichen text, paper links with orange underlines, the ASF logo on a paper tile.

### Links
Inherit the text color with a 1.5px `ribbon-deep` underline at .22em offset that thickens to 3px on hover. Titles in lists hide the underline until hover.

### Component Tree (signature)
On cloth: the Java sheet left, the markup sheet right, beads on the ribbon between, thin threads joining each Java line to its tag on the same row. The ribbon unrolls once from the top over 1.4s (`cubic-bezier(.16, 1, .3, 1)`); pointing at or focusing a bead lights its path and its Java and HTML lines with the orange wash and dims the rest. Reduced motion shows it drawn.

### Seasonal Photograph
One element in two uses: behind the homepage hero and behind every page title. The season or dated occasion comes from `_data/seasons.yml`. Credits sit in a small cloth chip in the photo's corner. Review builds with `season_selector: true` add a season selector chip beside the credit; production builds do not show it.

### Release Line
One compact line on the photo: the current release and the LTS in bold serif figures with Alegreya SC labels, a link to release lines and support, on a translucent paper panel with a 1px orange top rule. The full release board lives on the download page as a ruled table grouped under small-caps headings.

## Do's and Don'ts

### Do:
- **Do** draw hierarchy with the ribbon: a left run and a folded elbow into each child, in `ribbon` at 5 to 7px.
- **Do** open lists, tables and indexes with a 2px ink rule and separate rows with 1px `rule` hairlines.
- **Do** set dates and labels in Alegreya SC, in `ribbon-deep` or `ink-soft`.
- **Do** put the season's photograph behind the title of every new page, through the shared page head.
- **Do** keep corners at 2px, and 3px for beads.
- **Do** use `ribbon-deep` for orange text on paper and `ribbon-text` on cloth.

### Don't:
- **Don't** fill panels, headings or large areas with orange; it is the ribbon, a rule or the one action.
- **Don't** use cream, warm white or pure white as a ground.
- **Don't** build feature-card grids; mechanisms are columns of text with their code, on shared rows.
- **Don't** use hard offset shadows or stacked cards; sheets rest on the ground with the low sheet shadow.
- **Don't** put kickers or eyebrow labels above headings; small caps head the list or table below them.
- **Don't** use icon fonts or glyph icons; the Wicket mark, the ASF logo, the GitHub mark and the select chevron are the only drawn images in the interface.
- **Don't** round corners beyond 3px.
