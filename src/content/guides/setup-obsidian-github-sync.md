---
title: How to sync Obsidian with GitHub
description: A complete path from initializing a Git repository to pushing Markdown notes from an Obsidian vault.
customSlug: setup-obsidian-github-sync
status: published
quickAnswer: Sync Obsidian with GitHub by treating the vault as a Git repository, committing small meaningful changes, and pushing regularly. Keep secrets, private attachments, and generated files out of the repo.
faq:
  - question: Is GitHub the same as Obsidian Sync?
    answer: No. GitHub gives version history and remote backup for files, while Obsidian Sync is a purpose-built app sync service. Git is better for reviewed publishing workflows.
  - question: Should I commit the whole vault?
    answer: Commit only the folders you intentionally want in Git. Exclude private files, local plugins, caches, and anything that should not leave your machine.
difficulty: beginner
timeRequired: 30min
relatedStack: writer-obsidian-github
relatedKits:
  - writer-vault-starter
relatedWiki:
  - tools/obsidian
  - tools/github
  - concepts/git-based-publishing
tags:
  - obsidian
  - github
  - sync
updatedAt: 2026-05-09
---

## What you will have

An Obsidian vault that can be pushed to GitHub.

## Prerequisites

- Obsidian is installed.
- You have a GitHub account.
- Git is installed on your machine.

## Step 1: Create a local vault

Download Writer Vault Starter, or create an empty folder for your vault.

## Step 2: Initialize Git

Run this inside the vault folder:

```bash
git init
git add .
git commit -m "Initial vault"
```

## Step 3: Create a GitHub repository

Create a new GitHub repository, for example:

```txt
writer-vault
```

## Step 4: Connect the remote repository

```bash
git remote add origin https://github.com/YOUR_NAME/writer-vault.git
git branch -M main
git push -u origin main
```

## Step 5: Daily use

After each writing session:

```bash
git add .
git commit -m "Update notes"
git push
```

## FAQ

### What if I have many images?

Do not put unlimited images and large attachments into Git. Compress images or store large files separately.

### What if I do not know the command line?

Use GitHub Desktop first, or configure an Obsidian Git plugin later.

## Acceptance check

If you can see your `.md` files in the GitHub repository, the minimal sync workflow is working.
