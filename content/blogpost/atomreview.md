---
title: "Atom Review"
date: "2014-03-04"
description: "A collection of thoughts on GitHub's new editor"
aliases: []
tags: ['reviews', 'personal']
linktitle: "atom-review"
groups: ['blogposts']
groups_weight: 1
published: false
---

### First Impressions

So far so good. I've been working on my website using my hot-off-the-press copy
of Atom for the past 30 minutes and I'm enjoying myself thus far.

### Likes
 * `cmd-P` opens files and `cmd-shift-p` opens the command palette. This is great
   since I'm coming from using SublimeText as my primary editor. (This was one
   reason I could never make myself enjoy using LightTable).{{% footnote 1 %}}http://www.lighttable.com/{{% /footnote %}}
 * Dark theme by default. Very nice and easy on the eyes (except for the font,
     more on that below).
 * Git modified markers on the left gutter. Very helpful and much less distracting
   than the ones in IntelliJ IDEA. (In IDEA the modification annotations share
     a gutter with the syntax error markers).
  * As a subpoint, the folder coloring is ridiculous. Looks like Christmas in March:
    {{% figure src="/static/img/atom-screencap-folders.png"
    caption="Oh git markers, Oh git markers, how ever green thy new files..."
    alt="A folder hierarchy view showing orange and green folders" %}}

### Dislikes

 * The default text size is gargantuan. Like monstrous.{{% footnote 2 %}}Like HUGE{{% /footnote %}}
 * The default font color is very low-contrast for Markdown standard text.
 * The indentation logic is not quite as intuitive as ST. Hard to put my finger on it, but it's definitely inferior.
  * Ah, got an example. Define a CSS rule, enter the {} and then hit return.
    Rather than creating:

    {{% codeblockwithsyntax %}}
    h1 {
      |
    }
    {{% /codeblockwithsyntax %}}

    Atom does this:

    {{% codeblockwithsyntax %}}
    h1 {
    |}
    {{% /codeblockwithsyntax %}}

    (imagine the pipe is your final cursor position)
 * No auto-suggest for CSS attributes.
