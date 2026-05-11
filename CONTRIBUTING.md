# Contributing to Offpedia

Offpedia accepts workflow improvements, not just more pages.

## Before you open a PR

1. Start from a concrete workflow problem, broken claim, or missing relationship.
2. Keep edits connected across stack, kit, guide, compare, and wiki pages when the surface depends on them.
3. Respect the license boundary:
   - Site code and scripts are MIT.
   - Original editorial content is CC BY-SA 4.0.
   - Third-party assets need explicit redistribution rights before they enter the repo.

## Good contribution types

- Correct outdated tool, pricing, export, or portability details.
- Improve comparison verdicts and migration warnings.
- Add missing internal links between related content surfaces.
- Add new tool pages only when they support a real workflow decision.
- Improve validation scripts, sitemap/search coverage, or contribution documentation.

## Changes that will be rejected

- Thin pSEO pages with no editorial distinction.
- Vendor promotion that hides portability or migration risks.
- Copied docs, screenshots, or downloads without clear rights.
- Workflow claims without evidence or a reproducible operator note.

## Validation

Run these from `source/` before asking for review:

```bash
npm run validate:content
npm run search:index
npm run health:workflow
```

When dependencies are available, also run:

```bash
npm run check
npm run build
```

## Editorial rules

- Prefer the simplest claim that is still defensible.
- Keep tool pages factual, but keep stacks and compare pages judgmental.
- Add or update internal links when a new page changes the decision surface.
- If a stack is starter-ready, it should usually have both a kit and a guide.

## Security issues

Do not file public issues for security-sensitive reports. Follow `SECURITY.md`.
