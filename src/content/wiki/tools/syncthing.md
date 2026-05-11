---
title: Syncthing
description: Syncthing is a peer-to-peer file sync tool that keeps local folders in sync across devices without handing the archive to one hosted workspace.
customSlug: tools/syncthing
kind: tool
category: sync
status: published
website: https://syncthing.net
github: https://github.com/syncthing/syncthing
openSource: true
selfHosted: true
localFirst: true
offlineReady: true
pricing: Free and open source.
gitSupport: Works alongside Git because it syncs normal folders instead of replacing repository history.
bestFor:
  - Local-first device sync
  - Cross-device vault access
  - Peer-to-peer folder replication
pseo:
  compare: false
  workflow: false
dataFormats:
  - Folder
  - Markdown
  - Binary assets
platforms:
  - macOS
  - Windows
  - Linux
  - Android
limitations:
  - Syncthing moves files well, but it does not replace version history or editorial review, so keep Git or backups for meaningful checkpoints.
  - Initial setup and conflict management still require the operator to understand what should sync and what should stay local.
relatedStacks:
  - writer-obsidian-github
  - personal-wiki-obsidian-quartz
relatedKits:
  - writer-vault-starter
  - personal-wiki-kit
tags:
  - syncthing
  - sync
  - local-first
updatedAt: 2026-05-11
---

## One-line definition

Syncthing is a peer-to-peer sync layer for local folders.

## Why it matters in Offpedia

Syncthing is useful when you want the same vault on multiple devices without making a cloud workspace the source of truth.

## Best for

- Personal vaults shared across your own devices
- Offline-first workflows that still need mobile or secondary-machine access
- Teams that only need file delivery, not realtime co-editing

## Recommended next step

- Read [Writer Stack: Obsidian + GitHub](/stacks/writer-obsidian-github)
- Read [Personal Wiki Stack: Obsidian + Quartz](/stacks/personal-wiki-obsidian-quartz)
