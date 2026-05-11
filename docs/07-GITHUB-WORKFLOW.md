# GitHub Workflow

## Repository Strategy

The site can start as one repository that contains:

- Astro site source
- Markdown content
- Starter vaults
- GitHub Actions deployment workflow

Kits can move into separate template repositories later if contribution volume grows.

## Branch Strategy

- `main`: production
- `dev`: preview work
- `content/*`: content updates
- `kit/*`: kit updates

## Content Update Flow

1. Edit Markdown in `src/content`.
2. Keep frontmatter valid.
3. Run validation:

```bash
npm run validate:content
npm run search:index
npm run build
```

4. Open a pull request.
5. Merge to `main` to deploy.

## Commit Style

Use short imperative commits:

- `Add Logseq tool page`
- `Update writer stack guide`
- `Fix sitemap generation`

## Deployment

The repository uses `.github/workflows/deploy.yml` to build Astro and deploy the `dist/` artifact to GitHub Pages.

The workflow:

- Uses GitHub Pages OIDC permissions, not deployment secrets.
- Builds with Node.js 22.
- Uses the current Node 24-compatible major versions of the official Pages actions.
- Runs project checks, content validation, search-index generation, and the Astro build before uploading the Pages artifact.

After every release candidate, verify the public endpoints:

```bash
curl -I -L https://offpedia.com/
curl -I -L https://www.offpedia.com/
curl -I -L https://offpedia.com/sitemap-index.xml
curl -sL https://offpedia.com/robots.txt
```

Then follow `docs/10-P4-SEARCH-CONSOLE-BASELINE.md` to submit the sitemap and record the Search Console baseline.
