# P2 Blueprint

## Goal

Ship a useful, searchable, English-only Offpedia site that demonstrates the full loop:

```txt
Wiki -> Stack -> Kit -> Guide -> Compare
```

## Product Shape

Offpedia is a structured workflow site for people who want durable knowledge systems. It focuses on tools and workflows that preserve data ownership, portability, and long-term maintainability.

## Initial Content

The first release includes:

- Tool and concept wiki entries
- Three workflow stacks
- Two starter kits
- Three setup guides
- Editorial comparisons
- Generated pSEO compare, persona-goal, and workflow pages

## Deployment

The production site is built with Astro and deployed through GitHub Pages using a GitHub Actions workflow.

## Operating Rules

- Keep content in English.
- Keep generated pages useful and bounded.
- Avoid thin programmatic SEO.
- Use frontmatter as the structured data layer.
- Keep kit downloads intentional and documented.
