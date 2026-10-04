---
name: Apache Wicket
description: The project site for Apache Wicket, laid out as a station hall with a departure board of release lines.
colors:
  signal: "#E9752A"
  signal-deep: "#B4511A"
  plate: "#FFC72C"
  stop: "#C8102E"
  board: "#0D1B3D"
  board-row: "#13244D"
  board-rule: "#26386A"
  board-text: "#FFFFFF"
  board-dim: "#A9B5D3"
  hall: "#F4F6F9"
  paper: "#FFFFFF"
  ink: "#13203F"
  ink-soft: "#46536E"
  rule: "#CDD4DF"
typography:
  display:
    fontFamily: "Overpass, Source Sans Pro, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Overpass, Source Sans Pro, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Overpass, Source Sans Pro, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Source Sans Pro, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Source Sans Pro, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Overpass, Source Sans Pro, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.06em"
    fontFeature: "\"tnum\" 1"
  board-figure:
    fontFamily: "Overpass Mono, Source Code Pro, ui-monospace, monospace"
    fontSize: "1.35rem"
    fontWeight: 600
    fontFeature: "\"tnum\" 1"
  code:
    fontFamily: "Source Code Pro, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  plate: "0.125rem"
  panel: "0.313rem"
spacing:
  unit: "1rem"
  gutter: "1rem"
  gutter-wide: "3rem"
  panel: "1.5rem"
  panel-wide: "2.25rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.board}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.6rem 1rem 0.5rem"
  button-primary-hover:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
  button-primary-active:
    backgroundColor: "{colors.board-row}"
    textColor: "{colors.board-text}"
  button-neutral:
    backgroundColor: "transparent"
    textColor: "{colors.board}"
    rounded: "{rounded.plate}"
    padding: "0.6rem 1rem 0.5rem"
  button-neutral-hover:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
  plate-lts:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.board}"
    rounded: "{rounded.plate}"
    padding: "0.35em 0.5em 0.25em"
  status-boarding:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.board}"
    rounded: "{rounded.plate}"
    padding: "0.2em 0.55em 0.1em"
  status-last-call:
    backgroundColor: "transparent"
    textColor: "{colors.plate}"
    rounded: "{rounded.plate}"
    padding: "0.1em 0.45em 0"
  status-eol:
    backgroundColor: "{colors.stop}"
    textColor: "{colors.board-text}"
    rounded: "{rounded.plate}"
    padding: "0.2em 0.55em 0.1em"
  board:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
    rounded: "{rounded.panel}"
    padding: "2.25rem 2.25rem 1.5rem"
  ticket:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "1.5rem"
  reading-rail:
    textColor: "{colors.ink-soft}"
    width: "14rem"
  jump-list-entry:
    backgroundColor: "transparent"
    textColor: "{colors.board}"
    padding: "0.75rem 0 0.8rem"
  station-header:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
    height: "4.25rem"
  page-sign:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
    padding: "3.5rem 3rem 2.75rem"
  table-head:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-text}"
    padding: "0.6rem 0.75rem 0.45rem"
  input-wizard:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.plate}"
    height: "2.5rem"
  code-inline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0.05em 0.3em"
---

# Design System: Apache Wicket

## Overview

**Creative North Star: "The Departure Board"**

The site is a European railway station. A pale station-hall ground carries deep night-blue board panels with white tabular rows; the release lines are trains on that board, departing on a timetable (a quarterly major, a yearly long-term-support intercity). Every page arrives under a night-blue signage band, and reading pages open with a platform sign carrying the page title. Information is set the way a timetable sets it: ruled rows, tabular figures, short heavy labels, no ornament that a station would not hang.

Density is timetable density: rows are compact and ruled with 1px lines, while the sections between them breathe (5rem between home sections). Colour is spent by function, as signage spends it. Wicket orange means "now", signage yellow sits on plates, red means a cancelled line. The light hall and the dark board are the only two grounds; everything else is lettering, rules and plates.

The page refuses the framework-homepage default of headline, code panel and three feature cards. Groups are ruled lists and tables, not card grids.

**Key Characteristics:**
- Two grounds: light station hall and night-blue board.
- Orange marks what is current; yellow marks plates; red marks end of life.
- Overpass for signage and headings, Source Sans Pro for reading, Overpass Mono for board figures, Source Code Pro for code; tabular numerals in every table and date.
- Square enamel plates (2px corners), 1px timetable rules, a 4px orange band under the header.
- One signature motion: version figures flip in once like split-flaps.

## Colors

A night-blue and hall-white signage palette with three functional signal colours.

### Primary
- **Wicket Signal Orange** (signal): the "now" signal. Primary buttons, the boarding status plate, the boarding row's version, the featured version in the board title, the active navigation underline, the 4px band under the header and above the legal strip, the first stop on the route line, the ticket's top edge. On the board it is legible as text; on light ground it is a fill, not text.
- **Deep Signal Orange** (signal-deep): orange as text on hall and paper. Body links and link hovers on light ground, where plain signal orange would fail contrast.

### Secondary
- **Signage Yellow** (plate): platform plates only. The LTS plate, the last-call outline plate, the "In service / Departures / Out of service" group headers on the board, link hovers on board ground, the focus ring and text selection.

### Tertiary
- **Stop Red** (stop): end of life only. The end-of-life plate and the 2px strike through a cancelled version.

### Neutral
- **Night Board** (board): the board panel, the header band, the platform sign, the footer, table heads, and the colour of headings and plate lettering on light ground.
- **Board Row Blue** (board-row): pressed state of the primary button.
- **Board Rule Blue** (board-rule): 1px rules between board rows, the 2px rule under the board head, the board's 1px edge on the homepage.
- **Board White** (board-text): lettering on the board and the signage bands.
- **Board Dim** (board-dim): secondary lettering on the board: column heads, "when" dates, superseded and scheduled lines, the platform-sign subline, footer text.
- **Station Hall** (hall): the page ground, code ground inside the ticket, the notches cut out of the ticket stub.
- **Ticket Paper** (paper): raised reading surfaces: the ticket, code blocks, inline code, the upgrade paths table, the "Also included" panel, the legal strip.
- **Timetable Ink** (ink): body text on hall and paper.
- **Soft Ink** (ink-soft): secondary text on light ground: intros, dates, descriptions, file names above code.
- **Timetable Rule** (rule): 1px rules on light ground: table rows, ruled list items, code-block borders, the dashed perforation of the ticket stub.

### Named Rules
**The Now Signal Rule.** Orange marks what is current or the one primary action. It is never a decorative accent, a section tint or a background wash.

**The Plate Rule.** Signage yellow appears on plates, on board ground, and as the focus ring. It is never body text on the light hall.

**The Stop Rule.** Red is reserved for end of life: the red plate and the struck-through version. Nothing else on the site is red.

## Typography

**Display Font:** Overpass (with Source Sans Pro, system-ui)
**Body Font:** Source Sans Pro (with system-ui)
**Label/Mono Font:** Overpass Mono for board figures (with Source Code Pro); Source Code Pro for code

**Character:** Overpass is highway and station signage lettering: heavy, open, slightly condensed, read at a distance. Source Sans Pro is the timetable's small print, calm at length. All faces are self-hosted.

### Hierarchy
- **Display** (800, clamp(2.4rem, 4.6vw, 3.75rem), 0.95): the board title only. The version inside it switches to Overpass Mono 700 in signal orange.
- **Headline** (800, clamp(2rem, 4vw, 3rem), -0.03em): home section heads ("Why Wicket", "New in Wicket 11"). Section headings are plain words; the station metaphor lives in the visual system, not in the names. The platform-sign h1 on reading pages uses the same weight at clamp(2.1rem, 4.5vw, 3.6rem), line-height 1, max 22ch. Secondary section heads (Announcements, Built with Wicket) step down to clamp(1.6rem, 3vw, 2.25rem) over a 2px board rule.
- **Title** (700, clamp(1.35rem, 2.2vw, 1.75rem), -0.02em): route stops and panels. Base markdown headings run h1 2.25rem/800, h2 1.6rem, h3 1.25rem, h4 1.1rem, all 700, line-height 1.2, balanced wrapping, in board blue.
- **Lead** (400, clamp(1.15rem, 1.6vw, 1.3rem), 1.55): preambles and section intros, max 62ch.
- **Body** (400, 15px rising to 17px at 769px, 1.6): reading copy, max 72ch.
- **Label** (600, 0.8rem, 0.06em, uppercase): board column heads and board group headers only. Navigation, footer links, table heads and dates use Overpass 600 in sentence case.
- **Board figure** (Overpass Mono 600, 1.35rem): version numbers on the board.

### Named Rules
**The Tabular Figures Rule.** Every table, board, date and step number sets `font-variant-numeric: tabular-nums`, so figures line up like a timetable.

**The Signage Voice Rule.** Overpass carries everything a station would sign (headings, nav, table heads, dates, plates, buttons); Source Sans Pro carries everything a passenger reads at length.

## Layout

Content sits in a centred column capped at 82rem with 1.25rem side gutters, widening to 3rem from 960px. Breakpoints are 590px, 769px, 960px, 1152px and 1295px; the legacy Taiga 48-column grid and its layout classes (full, half, one-third and so on) remain in use by Markdown page content and must keep working.

The homepage arrival hall sets the board (8fr) beside the ticket (4fr, at least 19rem), top edges aligned, from 1152px, on a hall ground whose top 7rem continues the night-blue header band behind them. Below 1152px they stack. Below the hall the homepage runs: "Why Wicket" (the route), Built with Wicket as proof that it lasts, the release highlights, then announcements; the upgrade paths live on the download page. Home sections are separated by 5rem (4.5rem for announcements and showcase). Route stops run as a two-column 5/7 split of text and code from 960px. Ruled lists (station index, "Also included") go one, two, then three columns at 769px and 1152px.

Under 769px tables become stacked rows: the board turns each line into a two-column grid of release and status over service and date, with support beneath; the connections table stacks its cells. Code samples keep their lines and scroll sideways under 590px, with a fade at the right edge.

Reading pages open with a full-width platform sign. Below it the reading area shares the 82rem column with 2.5rem top padding (2.75rem from 960px), and everything in it is left-aligned to the column's edge: no centred components. When the page has sections, from 1152px it becomes a two-column grid of a 14rem sticky "On this page" rail and a content column of at most 52rem, 4rem apart, so the right side of a wide screen is not left empty beside a narrow text. Below 1152px the rail moves above the text. Base spacing is 1rem paragraph rhythm.

## Elevation & Depth

The site is flat except for two objects that hang in the hall: the departure board and the ticket. Both carry a soft, downward, board-tinted shadow with a negative spread so it reads as a hanging object, not a floating card. Everything else is separated by ground colour (hall against board against paper) and by rules.

### Shadow Vocabulary
- **Board hang** (`box-shadow: 0 1.5rem 3rem -1.5rem rgba(13, 27, 61, 0.55)`): the departure board.
- **Ticket hang** (`box-shadow: 0 1.25rem 2.5rem -1.5rem rgba(13, 27, 61, 0.45)`): the ticket.

### Named Rules
**The Two Objects Rule.** Only the board and the ticket cast shadows. Panels, tables, code and buttons are flat.

## Shapes

Corners are nearly square, as enamel plates are. Plates, buttons, inputs, inline code and code blocks take a 2px radius (plate); the board panel and the quick-start wizard take 5px (panel). The ticket is square-cornered, with a 6px orange top edge and a stub torn off along a 2px dashed perforation, notched by two half-circles of hall colour. The one round form is the station dot on a route line: route stops on the homepage are 1.35rem circles with a 4px board-blue ring on a 4px line, the first stop filled orange; the reading rail repeats the form at 0.8rem with a 3px ring on a 3px line, the current section filled orange.

Rules carry the structure: 1px for rows and list items, 2px under section heads and the board head, 3px for the navigation underline, 4px for the orange header band.

### Named Rules
**The Ruled Groups Rule.** Groups are separated by a 1px top or bottom rule, never by boxes or card outlines.

## Components

### Buttons
Enamel signage plates: square, heavy Overpass lettering, no gloss.
- **Shape:** near-square corners (plate radius), 2px border reserved for outline variants.
- **Primary:** signal orange fill with board-blue lettering, Overpass 700 at 1rem, padding 0.6rem 1rem 0.5rem.
- **Hover / Focus:** hover turns the plate night blue with white lettering; pressed goes board-row blue. Focus is a 3px signage-yellow outline offset 2px. Colour transitions run 160ms on cubic-bezier(0.16, 1, 0.3, 1).
- **Neutral:** transparent with a 2px board-blue border and board-blue lettering, filling night blue on hover. The ticket's copy button is a small neutral plate that turns board blue with yellow "Copied" lettering.

### Plates and status
- **Style:** small Overpass 700 to 800 plates at 0.8 to 0.9rem with plate radius. LTS is yellow with board lettering; Boarding is orange with board lettering and blinks three times after 1.5s; Last call is a 2px yellow outline with yellow lettering; End of life is red with white lettering. Scheduled, current and superseded are plain lettering in white or dim.

### Cards / Containers
- **Corner Style:** square (ticket, panels) or panel radius (board, wizard).
- **Background:** paper on hall for reading panels; board blue for the board and wizard.
- **Shadow Strategy:** only board and ticket (see Elevation & Depth).
- **Border:** none, or the board's 1px board-rule edge on the homepage.
- **Internal Padding:** 1.5rem, widening to 2.25rem from 769px.

### Inputs / Fields
- **Style:** inside the quick-start wizard (a ticket machine on board ground): paper fields, 2px transparent border, plate radius, 2.5rem high, Source Code Pro lettering; labels in Overpass 600 board-dim.
- **Focus:** the border turns signage yellow; no outline glow.

### Navigation
- **Style:** a night-blue signage band at least 4.25rem tall with a 4px orange bottom band. Overpass 600 at 0.95rem white links with a 3px transparent underline; hover shows a board-dim underline, the active section an orange underline. The GitHub link sits at the far right and turns yellow on hover. Under 960px the links wrap onto their own rows under the logo.
- **Footer:** night-blue ground, Overpass 600 white links turning yellow and underlined on hover, closed by a paper legal strip under a 4px orange band, carrying the current ASF logo (self-hosted, linked to apache.org) beside the trademark notice.

### Skip link and touch targets
Every page opens with a "Skip to content" link, hidden until focused, then a paper plate with board-blue Overpass 700 in the top left corner. On touch screens (coarse pointer) the small links (ticket links, board foot, How to upgrade, section footers) and the copy plate grow to 44px targets without changing the desktop layout.

### Links
Deep signal orange, underlined 1px at a 0.18em offset; hover goes board blue with a 2px underline. Links inside headings inherit the heading colour.

### Tables
Tables are timetables: a board-blue head row in white Overpass 700 at 0.875rem, 1px rule under each body row, tabular figures, paper on row hover. End-of-life rows strike the version in red.

### The Departure Board (signature)
A night-blue panel. A head with the display title, on the homepage a one-line definition of Wicket in white Overpass 600 (max 40ch), and on the download page a board-dim subline that leads with the LTS, over a 2px board-rule; on the download page columns When, Release, Service, Supported, Status in uppercase board-dim labels; group headers "In service", "Departures" and, while a line has just reached end of life, "Out of service" in yellow uppercase; rows ruled 1px in board-rule; version figures in Overpass Mono. The boarding line's version is orange; end-of-life versions are struck through in red and their text dims. The strike and the link underline are drawn on the version as a whole (a 2px rule and a 2px bottom border), because text decoration does not reach the flipping characters. On load each version flips in character by character from a half-turned, half-visible start (700ms per character on cubic-bezier(0.16, 1, 0.3, 1), staggered 35ms per character and 50ms per row, capped at the sixth character and the fifth row so no value waits more than about half a second), once per page load. Under reduced motion, or without JavaScript, the figures stand still and the boarding blink is off. The board is driven by the releases data file and reused on reading pages at a smaller title size. Lines in service run LTS first, and their Status cell names their role ("For production", "For new features") instead of repeating the group header. Version links carry a 2px board-dim underline at 45% so they read as links. On the homepage the board shows how Wicket works instead of a timetable, because the homepage sells the framework: under the title and the definition sit the two halves of HelloWorld on paper code cards (the HTML, then the Java, stacked, each under a board-dim file name) and one sentence on the wicket:id contract. Release facts shrink to one summary line at the board's foot, with yellow labels: "In service" with the LTS and current versions as Overpass Mono figures, their LTS plate and role, and, while lines have just reached end of life, "Out of service" with their series struck through in red and a "How to upgrade" link to the upgrade paths on the download page. The foot links to all release lines and support. The download page shows the full board.

### The Ticket (signature)
A square paper ticket beside the board: orange 6px top edge, a title and one primary action, then a perforated stub carrying one Maven dependency per line in service, LTS first, each labelled with its version in Overpass Mono, its LTS plate and its role, with its own copy plate. Only the first snippet is shown on hall-coloured code ground; the others differ only in their version, so they show their label and copy their own hidden snippet.

### Release Highlights
What is new in the featured release line, from the highlights data file. On the homepage a "New in Wicket N" section follows "Why Wicket": a headline with a link to the line's page on its baseline, a lead intro, then the highlights as ruled entries in two balanced columns from 960px (CSS columns, entries never split). Every release line's page lists its highlights in one column under "New in Wicket N", including those kept off the homepage, at the full width of the reading column so code samples fit. Each entry has a title, one or two sentences, and optionally facts or a code sample. Facts are board figures on light ground: an Overpass 600 label in soft ink over the value in Overpass Mono 600 at 2rem in board blue, with tabular figures. Code samples use the route's file label and code block.

### The Route (signature)
Content sections hang on a 4px board-blue route line as numbered stops, each a ringed station dot with text on the left and real code on the right.

### Platform Sign
Reading pages open with a full-width night-blue band holding the page title in white headline type and a board-dim subline, max 50ch.

### Reading Rail
The page's sections as stops on a route. From 1152px a 14rem column sticks 1.5rem from the top beside the text, scrolling on its own if taller than the viewport. A board-colour heading ("On this page", from the site config) sits over a 3px board-blue line; top-level sections hang on it as 0.75rem hall-filled dots with a 3px board-blue ring and Overpass 600 labels at 0.875rem in soft ink, turning board blue and underlined on hover. The section in view becomes the current stop: its label turns board blue and its dot fills signal orange, set by a scroll observer. Second-level sections share the 0.875rem size at weight 500 and are indented without dots. Section numbers are hidden. Below 1152px the rail is a compact paper block above the text listing top-level sections only.

### Jump Lists
Lists of links in page content are a left-aligned ruled index, not boxed tiles: each entry is an Overpass label at 1.05rem in board blue under a 1px timetable rule, hovering to deep signal orange with a 2px underline. They run one column, two from 769px, three from 1152px, like the other ruled lists. Icon glyphs, line breaks and empty placeholder cells in the legacy markup are hidden. When the reading rail is present, a jump list whose links all point within the page is hidden because it repeats the rail; lists that link to other pages stay.

## Do's and Don'ts

### Do:
- **Do** keep the two grounds: station hall for reading, night board for signage, the board, the wizard and the footer.
- **Do** spend orange only on what is current and on the single primary action per view.
- **Do** set every figure in tables, boards and dates as tabular numerals.
- **Do** separate groups with 1px rules in timetable rule colour (light ground) or board-rule colour (board ground).
- **Do** keep corners at 2px for plates, buttons, inputs and code, and 5px for board panels.
- **Do** run the split-flap entrance once per load and switch it off under reduced motion.
- **Do** self-host every font and script; Overpass, Overpass Mono, Source Sans Pro and Source Code Pro ship from the site's own fonts directory.
- **Do** align reading content to the left edge of the column and keep text to 52rem beside the rail; never centre components in the reading area.
- **Do** keep page content writable in plain Markdown with the legacy layout classes; new station components are styled by class, not by requiring authors to write new markup on ordinary pages.

### Don't:
- **Don't** load fonts or scripts from external hosts (ASF policy).
- **Don't** use red for anything but end of life, or yellow as text on the light hall.
- **Don't** add shadows to anything other than the board and the ticket.
- **Don't** group content in card grids; use ruled lists, tables and the route.
- **Don't** use orange as a tint, gradient or decorative stripe beyond the header band, the legal-strip band and the ticket edge.
- **Don't** add icon-font glyphs to new surfaces.
