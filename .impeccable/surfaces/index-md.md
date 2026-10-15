---
version: 1
slug: "index-md"
primary_target: "index.md"
related_targets: ["start/download.md","_layouts/default.html"]
---

# Surface brief: wicket.apache.org homepage (world-setting surface)

Scope: homepage (`index.md`), with the world carried into every page: Download/releases (`start/download.md`), the `default`, `post`, `news_archive` and guide layouts, Contribute/Community. Visitor mode: Persuade on the homepage; Read on the inherited surfaces.

Audience and job: Java developers evaluating Wicket and teams running it, equally. The homepage sells the framework: what Wicket is and how it works first, then why, proof that it lasts, how to start, news. Release facts are one compact element. Proof: real Wicket code, Built with Wicket, twenty years at the ASF.

Review build: a season selector (winter, spring, summer, autumn, Halloween) is shown only when `season_selector: true` is set at build time (the published previews); on wicket.apache.org the date picks the photograph. Sub pages carry a slim band of the same seasonal photograph behind the page title.

## Direction contract

THESIS: A Wicket page is a tree of Java components mirroring its HTML; one orange ribbon runs through that tree, joining each Java line to the tag it renders. Refuses the framework-homepage default of headline, code panel and three feature cards, and refuses putting the release calendar first.

OWN-WORLD: A seasonal photograph opens every page under a cool paper veil; bookcloth green (#103C35) fields carry the tree and the footer; cool paper (#F6F8F7) and a pale green tint for reading; Wicket orange only as the ribbon, rules and the one action. Alegreya for headings and body, Alegreya SC for dates and small labels, Alegreya Sans for UI, JetBrains Mono for code. Square 2px corners, ink rules, folded ribbon elbows.

STORY: The visitor sees Apache Wicket 11 in its season, reads the definition, follows the ribbon from Java to markup, then why Wicket with real code, that it lasts, what's new, how to start, and the news.

FIRST VIEWPORT: Centred menu on the photograph; lockup with mark, "Apache Wicket" and "11" at display size, tagline, definition, one release line (11.0.0 current, 10.11.0 LTS, link). Below, the bookcloth band where the ribbon drops from the photo's edge into OrderPage. Signature interaction: the ribbon unrolls once; pointing at a component lights its path and its Java and HTML lines.

FORM: Provenance ribbon redrawn as the component tree (direction C3), ranked first of the owner's shortlist after the second critique; seed key ff8b07bb.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Tagline: "Write less, achieve more." is the Wicket 8 announcement's line, kept until the project picks one.
- Spring photograph only exists at 1024 px.
