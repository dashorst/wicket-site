# Three directions for wicket.apache.org (homepage, Persuade)

Seed key ff8b07bb. All three keep PRODUCT.md: the same users, content, release model, ASF constraints and volunteer-editable Markdown. Each replaces the visual world of the departure board, which stays available as its own design.

Every homepage carries the same content: what Wicket is, the release lines (in service, next, out of service), the Maven dependency with copy, the quick start, "Why Wicket" with real code, "New in Wicket 11", upgrade paths, announcements, Built with Wicket.

---

## A. Grid system

**Thesis.** Wicket's mechanism is composition: small components placed into a page by a fixed contract. The Swiss International Typographic Style is the graphic tradition built on exactly that, a modular grid where every element takes whole fields. The homepage is a grid sheet in the Müller-Brockmann manner: objective, asymmetric, typographic, with the grid itself as the identity. It refuses the developer-landing template (dark hero, code window, three cards) by making the module grid carry everything.

**Palette and material.** Committed colour: one saturated field colour owns large grid regions (a Wicket orange or a signal red field), black type, white ground, one secondary flat colour for code. No gradients, no shadows, no rounded corners; flat printed areas.

**Type.** One grotesque in several weights and large size steps, flush-left ragged-right, numbers set big. Code in a plain monospace.

**First viewport.** A 12-column module grid, visibly ruled at the top. "Apache Wicket" set very large across the upper fields; the definition in one field; the release lines as a typographic table on the grid (version numbers at display size); the Maven dependency in a coloured field with its copy action. The quick start link is a field of its own.

**Visitor path.** Definition → release lines → dependency → why Wicket (component, markup and Java side by side on the grid) → what is new → upgrade paths → announcements.

**Signature interaction.** The grid is live: hovering or focusing a component in the "Why Wicket" sample highlights its `wicket:id` binding across the markup and Java fields, field to field.

**Cross-surface reach.** Reading pages use the same grid: a narrow column for the section index, a wide column for text, code blocks spanning fields. Very easy for volunteers: Markdown flows into the text column.

**Raises from declined challengers.**
- From the Designers Republic sleeve: density as material. The grid is filled to its edge, information packed tight, nothing floats in empty margins.
- From the creator-hardware bench: one satisfying asymmetry. A single action colour, used once per view, for the one thing that matters.
- From the tensegrity column: structural honesty. Annotations pin to the element they explain with a rule, never a floating caption.

**Honest risk.** Swiss style is a familiar register for "serious design"; done timidly it reads as a corporate template. It must commit to the field colour and the scale contrasts.

---

## B. Drawing sheet (impeccable's pick)

**Thesis.** A Wicket component is a part with two views, its markup and its Java, joined by an identifier. The engineering drawing sheet is the artifact made for exactly that: orthographic views of one part, callouts with leader lines, a title block, a revision table. The homepage is a drawing sheet: Wicket drawn as a part, releases kept in the revision table. It refuses the developer-landing template by being a technical drawing, not a marketing page.

**Palette and material.** Drawing-office materials: a blueprint or white-print ground, line work in one ink colour, a single red for revisions and corrections. Hairline and medium line weights as in a real drawing standard; sheet border with zone markings (A–F, 1–8).

**Type.** Technical lettering in the spirit of ISO 3098: upright, even strokes, capital-heavy labels; a plain reading face for paragraphs.

**First viewport.** The sheet border with zone markings frames the page. In the centre, "HelloWorld" drawn in two views (the HTML and the Java), leader lines connecting `wicket:id="message"` in both. In the lower right corner the title block: Apache Wicket, the definition, the current version, the Maven coordinates with copy. Above the title block the revision table: 10.11.0 LTS, 11.0.0, the next releases, struck-out end-of-life lines.

**Visitor path.** The drawing explains the mechanism at a glance → title block gives the coordinates → revision table gives the release lines → further sheets below for why Wicket, new in 11, upgrade paths, announcements.

**Signature interaction.** Callouts: hovering a leader-line label lights the matching element in both views.

**Cross-surface reach.** Reading pages are further sheets of the same set: sheet number and zone references in the margin, a revision block per page (last changed), section numbers as zone references.

**Honest risk.** This is my own top-ranked candidate and the most expected "technical" reading of a framework site; blueprint aesthetics can slide into costume (fake grid paper, fake stamps). It works only if the drawing really explains Wicket.

---

## C. Provenance ribbon (competitive challenger)

**Thesis.** Wicket has a twenty-year lineage: release lines hand over to each other, LTS lines carry applications for years, old lines end. The provenance ribbon, from museum curation, follows one object through dated custody in one continuous line, with gaps and handovers shown honestly. Here the object is the Wicket codebase: one ribbon runs from 1.0 (2005) through 6, 7, 8, 9, 10 LTS to 11 and the scheduled 12, 13, 14 LTS, splitting where lines run in parallel and ending where a line reaches end of life. It refuses the developer-landing template by making the project's history and future the page's structure.

**Palette and material.** The ribbon in Wicket orange as the one continuous custody line; ended lines thin to grey thread; scheduled lines in a dashed weave. The ground is not cream or archival buff (the model's default for "museum"): it takes a saturated field from elsewhere in the world, for example a deep ink or bookcloth colour, with paper-white panels for reading.

**Type.** A ledger face with dated small caps at every fold of the ribbon; known passages in solid type, scheduled ones lighter.

**First viewport.** The ribbon enters from the left, running through the dated release lines; at the present moment it splits into "for production" (10 LTS) and "for new features" (11), and runs on dashed into 12, 13 and 14 LTS. Above it, "Apache Wicket" and the definition; beside the present split, the Maven dependency for each line with copy, and the quick start.

**Visitor path.** Where Wicket is now (the split at the present) → what it is → why Wicket → new in 11 → upgrade paths as routes along the ribbon (9 → 10 LTS → 14 LTS) → announcements as dated folds.

**Signature interaction.** The ribbon is navigable: focus a release line and its fold opens with its dates, support window, migration guide and announcement.

**Cross-surface reach.** The download page is the full ribbon; branch pages open at their fold; news posts carry their fold date.

**Honest risk.** The ribbon is the boldest of the three and the least familiar for a framework site; it needs care to stay readable on phones (vertical ribbon) and not to bury what Wicket is under its history.

---

## Declined challengers

- Designers Republic info-noise sleeve: declined (hostile density hides the offer; enterprise audience does not identify). Kept in A: density as material.
- Creator-hardware desk instrument: declined (a costume of the audience's own tools). Kept in A: one action colour, one asymmetry.
- Tensegrity breathing column: declined (forces do not explain components). Kept in A: annotations pinned by rules.
- Darkroom under safelight: declined (wrong scene, no product truth). Kept for the quick start: fixed stations in order.
- Suminagashi ink basin: declined (no mechanism to show). Kept: one continuous surface with a still reading margin.

---

## C2. Provenance ribbon, with seasons (revision after review)

Review: the grid system and drawing sheet are too far from what people expect of a web framework. The provenance ribbon is liked, and so is the Wicket 8 draft of 2018 (seasonal photo hero, big logo lockup, short tagline, light body), without copying it and with less white space. The pre-Apache site of 2005 (wicket.sourceforge.net) showed an orange windscreen on a beach in a circle beside the orange-circle mark.

**Thesis.** The ribbon of release lines stays the structure; it now opens under a seasonal photograph, as the Wicket 8 draft did, so the page feels like a living project in its own landscape rather than a museum ledger.

**Logo.** The registered mark (orange circle, white figure: `img/logo-apachewicket-mark.svg`) is fixed. The wordmark "Apache Wicket" may be set in the heading face. The big lockup in the hero adds the featured version: mark, "Apache Wicket", "11".

**Seasons.** One photograph per season, chosen by month from data: winter (Dec–Feb) the frosted red leaf; spring (Mar–May) the sunlit meadow; summer (Jun–Aug) and autumn (Sep–Nov) still need photographs (summer could be the 2005 windscreen on the beach if the original is found). Until then summer uses the meadow and autumn the leaf.

**First viewport.** The seasonal photograph carries the opening; the lockup and a short tagline over the definition sit on it, legibly; the ribbon enters along the bottom of the photograph and splits at the present into 10 LTS (for production) and 11 (for new features), each with its Maven dependency and copy action, the quick start beside them.

**Body.** Light paper ground with less white space than the 2018 draft; the bookcloth green stays as a secondary field (ribbon band, footer), not the whole page.

**History.** The ribbon starts with Wicket 1.0 on SourceForge in 2005 (1.0.2 and 1.1-beta3 were announced on 22 August 2005).
