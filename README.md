# Offpedia

Offpedia is a workflow encyclopedia for **local-first, offline-capable, self-hostable, Git-based publishing** systems.

It is not a generic tool directory. It has three product layers:

1. **Wiki**: explains tools, concepts, data formats, and workflow terms.
2. **Stacks**: combines tools into repeatable workflow patterns.
3. **Kits**: provides downloadable, forkable, ready-to-use Obsidian vaults or GitHub template projects.

This repository includes:

- Product planning and execution docs
- An Astro content-site codebase
- Example Wiki, Stack, Kit, Guide, and Compare content
- A Writer Vault Starter Kit
- A GitHub Actions deployment workflow
- A local search-index generation script
- A simple PWA caching layer

## License Boundary

- Site code and build scripts: MIT
- Original editorial content in `src/content/`: CC BY-SA 4.0
- Downloadable vault examples and starter structures: keep the same boundary unless a kit page states a narrower rule

Contributors should preserve this split instead of collapsing everything under one generic repository license.

## Quick Start

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:4321
```

Build:

```bash
npm run build
```

Validation:

```bash
npm run validate:content
npm run search:index
npm run health:workflow
```

## Recommended Deployment

- Manage content in a GitHub repository.
- Deploy the frontend with GitHub Pages, Cloudflare Pages, or Vercel.
- Open `src/content` in Obsidian as a content vault.
- Keep each kit in `vaults/` or in a separate template repository.

## Structure

```txt
.
├── docs/                         # Product documentation
├── src/
│   ├── content/                  # Offpedia content library
│   ├── components/               # Astro components
│   ├── layouts/                  # Page layouts
│   ├── pages/                    # Routes
│   └── styles/                   # Global styles
├── vaults/                       # Downloadable Obsidian starter kits
├── scripts/                      # Content validation and search index scripts
├── public/                       # Static assets, manifest, service worker
└── .github/workflows/            # Deployment CI
```

## Content Types

- `wiki`: tool and concept entries
- `stacks`: workflow combination pages
- `kits`: template project pages
- `guides`: step-by-step workflow guides
- `compare`: comparison pages

## Core Goal

The goal is not to build a forum or SaaS editor first. The first product loop is a searchable, browsable, downloadable, reusable workflow platform.

Minimal loop:

```txt
Search problem -> open Stack -> understand workflow -> download Kit -> follow Guide -> return to Wiki for concepts
```

## License Guidance

- Site code: MIT
- Original content: CC BY-SA 4.0
- Contribution process: see `CONTRIBUTING.md`
- Security reports: see `SECURITY.md`

Before a public visibility change, review `docs/11-OPEN-SOURCE-READINESS-REPORT.md` and confirm the repository state matches that report.
