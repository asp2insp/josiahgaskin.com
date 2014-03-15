---
title: "hugoadmin (For Lack of a Better Name)"
date: "2014-03-14"
description: "A companion tool to Hugo (by spf13) which helps create projects/types"
aliases: []
linktitle: "hugoadmin"
groups: ['projects']
groups_weight: 1
published: true
---

## Motivation
Hugo (https://www.github.com/spf13/hugo) is a static site generator written in Go. It's super fast and fairly flexible. I've really enjoyed using it to build this site.

However, it requires a very strict folder layout and filenaming convention which is daunting when first starting out.
This project aims to provide a small helper tool that will help you through creating the initial project structure as
well as project types. It's modelled after django-admin.

## Implementation

hugoadmin is written in Go using Cobra (https://www.github.com/spf13/cobra).

## Usage

 * `hugoadmin createproject new-project-name` creates an initial project.
 * (Within an existing project) `hugoadmin createtype new-type-name` creates a new content type.