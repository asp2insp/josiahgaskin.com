---
title: "Time Tracker"
date: "2014-03-14"
description: "A SaaS offering for businesses who bill clients by the hour for a variety of services."
aliases: []
linktitle: "timetracker"
groups: ['projects']
groups_weight: 1
published: true
---

## Overview

## Problem Description
Hugo (https://www.github.com/spf13/hugo) is a static site generator written in Go. It's super fast and fairly flexible. I've really enjoyed using it to build this site.

However, it requires a very strict folder layout and filenaming convention which is daunting when first starting out.
This project aims to provide a small helper tool that will help you through creating the initial project structure as
well as project types. It's modelled after django-admin.

## Existing Solutions

TODO: Fill this in

## Time Tracker (or why I'm re-inventing the wheel)

Why is this better? Good question.

## Implementation

Time Tracker is built in several pieces.
 
 1. A core API which manages records and provides endpoints for lookup and manipulation
 2. A desktop web client
 3. (Future Planning) A native Android app
 4. (Future Planning) A native iOS app

All of these first party clients are clients of the same API that is exposed publicly. The API speaks JSON.

This core API is built on Google AppEngine and written in Go. The web client is also served from an AppEngine module, but mostly consists of static files and thus may be served by any web framework with URL routing. It is built using HTML5/CSS3/JQuery and utilizes the Semantic-UI frontend framework.

## Documentation

### API

