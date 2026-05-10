# Information Architecture

## Core Sections

- `/`: home page with search, featured stacks, kits, wiki entries, guides, and comparisons.
- `/wiki`: structured tool and concept entries.
- `/stacks`: complete workflow combinations.
- `/kits`: downloadable templates and starter vaults.
- `/guides`: step-by-step task guides.
- `/compare`: tool comparison pages.
- `/for/[persona]/[goal]`: generated persona and goal landing pages.
- `/workflow/[tool-a]-with-[tool-b]`: generated workflow connection pages.

## Content Relationships

Stacks are the hub. A stack links to:

- Core tools in the wiki
- Concepts in the wiki
- One or more kits
- One or more guides
- Relevant comparisons and workflow pages

Kits and guides should always point back to the stack they support.

## Navigation Priorities

1. Search
2. Stacks
3. Wiki
4. Kits
5. Guides
6. Compare

## URL Rules

- Use lowercase English slugs.
- Use hyphens between words.
- Keep generated pSEO routes predictable.
- Avoid changing published URLs unless a redirect is added.
