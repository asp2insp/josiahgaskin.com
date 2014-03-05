---
title: "Atom Review"
date: "2014-03-04"
description: "A collection of thoughts on GitHub's new editor"
aliases: []
linktitle: "atom-review"
groups: ['blogposts']
groups_weight: 1
---

### First Impressions

So far so good. I've been working on my website using my hot-off-the-press copy
of Atom for the past 30 minutes and I'm enjoying myself thus far.

### Likes
 * `cmd-P` opens files and `cmd-shift-p` opens the command palette. This is great
   since I'm coming from using SublimeText as my primary editor. (This was one
   reason I could never make myself enjoy using LightTable). I feel familiarity
   right off the bat here.
 * Dark theme by default. Very nice and easy on the eyes (except for the font,
   more on that below).
 * Git modified markers on the left gutter. Very helpful and much less distracting
   than the ones in IntelliJ IDEA. (In IDEA the modification annotations share
     a gutter with the syntax error markers).
  * As a subpoint, the folder coloring is ridiculous. Looks like Christmas in March:

  ![Orange and Green folder highlights](/static/img/atom-screencap-folders.png "Oh git markers, Oh git markers, how ever green thy new files...")

### Dislikes

 * The default text size is gargantuan. Like monstrous.
 * The default font color is very low-contrast for Markdown standard text.
 * The indentation logic is not quite as intuitive as ST. Hard to put my finger
 on it, but it's definitely inferior.
  * Ah, got an example. Define a CSS rule, enter the {} and then hit return.
    Rather than creating:

    ```CSS
    h1 {
    }
    ```
    
    Atom does this:

    ```CSS
    h1 {
    |}
    ```

    (imagine the pipe is your final cursor position)
 * No auto-suggest for CSS attributes.
