---
layout: default
title: "Migration Guides"
subtitle: "Upgrading your Wicket application"
---

When upgrading your application from an older Wicket version to a newer one, you may
encounter API changes. The migration guides document all the changes between versions
and provide clear upgrade paths.

If you encounter a change that is not covered in a migration guide, please let us know
on the [developer mailing list]({{ site.baseurl }}/community).

## Available Migration Guides

- [Wicket 10 Migration Guide](https://s.apache.org/wicket10migrate){:target="_blank" rel="noopener"} — Upgrading from Wicket 9.x to 10.x (requires Java 17+)
- [Wicket 9 Migration Guide](https://s.apache.org/wicket9migration){:target="_blank" rel="noopener"} — Upgrading from Wicket 8.x to 9.x (requires Java 11+)
- [Wicket 8 Migration Guide](https://s.apache.org/wicket8migration){:target="_blank" rel="noopener"} — Upgrading from Wicket 7.x to 8.x
- [Wicket 7 Migration Guide](https://s.apache.org/wicket7migrate){:target="_blank" rel="noopener"} — Upgrading from Wicket 6.x to 7.x

## General Upgrade Advice

When upgrading, we recommend:

1. Read the migration guide for your target version before starting.
2. Update your Maven or Gradle dependency to the new version.
3. Address any compilation errors — these indicate removed or renamed APIs.
4. Run your test suite to catch behavioural changes.
5. Check the [mailing list archives]({{ site.baseurl }}/community) if you encounter unexpected issues.
