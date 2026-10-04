---
version: 1
slug: "index-md"
primary_target: "index.md"
related_targets: ["start/download.md","_layouts/default.html"]
---

# Surface brief: wicket.apache.org homepage (world-setting surface)

Scope: homepage (`index.md`), with the world carried into Download/releases (`start/download.md`), the `default` and `post` layouts (docs, help, news), and Contribute/Community. Visitor mode: Persuade on the homepage; Read on the inherited surfaces.

Audience and job: Java developers evaluating Wicket and teams running it, equally. The homepage leads with Wicket 11 and the new release rhythm, then why Wicket. Proof: real Wicket code, the actual release schedule, Built with Wicket, 20+ years at the ASF. Must not feel like an enterprise vendor or like obvious AI design, and must never make old users' paths (8.x/9.x pages, old URLs) harder to find.

## Direction contract

THESIS: Wicket runs a timetabled service: a yearly LTS intercity and quarterly majors in between, read off a departure board. Refuses the framework-homepage default of headline, code panel and three feature cards.

OWN-WORLD: Light station-hall ground with deep night-blue board panels carrying white tabular rows; Wicket orange is the "now" signal; signage yellow only on platform plates; end-of-life lines run as struck "cancelled" rows with a red plate. Overpass for signage and headings, Source Sans body, Source Code Pro for code. Square enamel plates, 1px timetable rules, tabular numerals everywhere.

STORY: The visitor sees 11.0.0 is here and the next departures, understands LTS versus quarterly and where their own version stands, takes the ticket (Maven coordinates or Quick start), then reads why Wicket in timetable-ruled sections with real code.

FIRST VIEWPORT: Slim signage nav. Below it, the board spans 8/12: title "Apache Wicket 11", rows for 11.0.0, 12.0.0, 13.0.0, 14.0.0 LTS, 10.x LTS on its platform until 14, 9.x and 8.x cancelled. Right 4/12: the ticket, Maven dependency with copy, primary action Quick start. Signature interaction: version cells flip in once like split-flaps; reduced motion shows them settled.

FORM: The Departure Board (European railway timetables), ranked 1 of 7 on my list; seed key b3a5a949.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Wicket 11.0.0 release date and Java baseline: the board shows 11.0.0 as boarding until the release is cut; flip `released` in `_data/releases.yml` on release day.
- Built with Wicket feed (Tumblr) freshness.
