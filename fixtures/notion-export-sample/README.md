# Notion Export Sample Fixture

This is an anonymous synthetic Notion export fixture for the Offpedia Notion to Obsidian audit script. It is not a real user export and contains no private user data.

Run it from the project root:

```bash
npm run audit:notion -- "fixtures/notion-export-sample/Workspace 11111111-2222-3333-4444-555555555555" --out /tmp/offpedia-fixture-audit --notion-export-format fixture-2026-05 --obsidian-importer fixture --obsidian fixture
```

The fixture intentionally triggers these findings:

- `database-csv-rebuild`: `Tasks ...csv`
- `missing-local-references`: `Welcome ...md` links to a missing asset
- `notion-web-links`: `Welcome ...md` contains a fake `notion.so` URL
- `duplicate-page-titles`: `duplicate/Notes ...md` and `other/Notes ...md`
- `publishing-frontmatter-gap`: Markdown files are missing publishing metadata
- `private-path-names`: the `private/` folder simulates material that should not be published

Use `expected-findings.json` as the regression baseline when changing the audit script. The fixture preserves Notion-style ID suffixes because the audit logic strips those suffixes when detecting duplicate page titles.
