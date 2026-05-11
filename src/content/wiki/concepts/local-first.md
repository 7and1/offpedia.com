---
title: Local-first
description: Local-first is an application model that stores data locally first and uses the network for sync, backup, or collaboration.
customSlug: concepts/local-first
kind: concept
category: architecture
status: published
website: null
github: null
openSource: null
selfHosted: null
localFirst: true
offlineReady: true
dataFormats: []
platforms: []
relatedStacks:
  - writer-obsidian-github
  - personal-wiki-obsidian-quartz
relatedKits:
  - writer-vault-starter
tags:
  - local-first
  - offline
  - data-ownership
updatedAt: 2026-05-09
---

## Definition

Local-first means an app treats the user's local device as the primary place where data lives. The network is used for sync, backup, or collaboration, not as a hard requirement for basic work.

## Why it matters

Local-first workflows solve long-term availability and data ownership problems.

Users usually care about practical questions:

- Can I keep working without internet access?
- Will my data survive if a platform shuts down?
- Can I export everything?
- Can I move to another tool?

## Local-first vs offline-first

Offline-first focuses on whether the app works without a connection. Local-first focuses on where data belongs and how portable it remains.

The two ideas often overlap, but they are not identical.
