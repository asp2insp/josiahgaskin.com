---
title: "On Second Thoughts and Tables"
date: "2014-03-17"
description: "Revisiting decisions about data models and prototyping the admin interface for generating a monthly bill."
aliases: []
tags: ['projects', 'timetracker']
linktitle: "on-second-thoughts-and-tables"
groups: ['blogposts']
groups_weight: 1
published: true
---

This is the second in a series of posts about designing (the easy stuff right now) and building (the hard stuff that I'm putting off) my  time accounting and billing SaaS app Time Tracker.{{% footnote 1 %}}Still a working name{{% /footnote %}}

## Revisiting the data model
Yesterday as I was suffering through a musical that was almost there but lacked sparkle and energy, my mind wandered to my design choices for my data model setup. I had previously decided on a parent-child relationship between Clients and Sessions, and each Session would hold a key to the Employee who conducted that session. Since that point, I realized through conversation with a potential client that I might want to allow group sessions or Classes. Now, I had to make a decision on how to integrate group work into my data models. I considered the following options for laying this data out in a NoSQL fashion:{{% footnote 2 %}} I'm well aware that this is a sign that I should be using a relational database, but I'm trying to shoehorn this into a NoSQL store at the moment, partially to teach myself about life in the NoSQL world, and partly so I can be a cheapskate and use the AppEngine datastore {{% /footnote %}}

### 1) Make Classes Implicit
This option leaves my models alone and just assumes that any two Sessions which take place on the same date with the same instructor.

{{% codeblockwithsyntax %}}
Session := {
	_Parent: *Client{"John Doe"},
	Date: 01/31/2014,
	StartTime: 0900,
	Hours: 1,
	Employee: *Employee{"Jane Daw"},
	SessionType: "APBiology",
	Notes: "Cell Mitosis/Meiosis",
	BonusPayItems: [],
}
{{% /codeblockwithsyntax %}}
This requires adding a start time to the session object which I don't like. Session is a billing line-item rather than a scheduling construct in my current thought model of the project.

### 2) Make Sessions into Classes
This option turns my session model into a class model where each class belongs to an Employee and has multiple pointers to clients.

{{% codeblockwithsyntax %}}
Session := {
	_Parent: *Employee{"Jane Daw"}
	Clients: [*Client{"John Doe"}, *Client{"James White"},],
	Date: 01/31/2014,
	Hours: 1,
	SessionType: "APBiology",
	Notes: "Cell Mitosis/Meiosis",
	BonusPayItems: [],
}
{{% /codeblockwithsyntax %}}

On the plus side, no additional models are necessary and it becomes easy to figure out how to pay an employee. However, it becomes expensive to compute a client's monthly bill since it requires building a seperate index of Client->Classes.

## 3) Make Classes be Collections of Sessions
This option creates a simplistic model of Classes that are the sum of the Client Sessions which they encapsulate.

{{% codeblockwithsyntax %}}
Session := {
	_Parent: *Client{"John Doe"},
	Date: 01/31/2014,
	Hours: 1,
	Employee: *Employee{"Jane Daw"},
	SessionType: "APBiology",
	Notes: "Cell Mitosis/Meiosis",
	BonusPayItems: [],
}

Class := {
	_Parent: *Employee{"Jane Daw"},
	StartDate: 03/21/14 - 0800,
	EndDate: 03/21/14 - 0900,
	Sessions: [ *Session{"01/31/14 - John Doe"}, 
			    *Session{"01/31/14 - James White"}, ]
}
{{% /codeblockwithsyntax %}}

I love this option. It allows me to build a lot of flexibility into the platform. With this model, a class can be at a single time with a single person, or it can be with many people over several weeks, or it can be a single day's worth of classes. This flexibility will go a long way in allowing the program to suit the high level of variety I'm anticipating. I'm undecided on whether I want to create a Course data model which would be a collection of Classes. Probably a good idea at some future date, but I think that's straying from my core offering and my current vision of providing billing for people who have very fluid schedules.

## Up Next
 * Monthly Workflow
 * Monthly admin
 * Quarterly/Annual Profit/Loss
 * Subscription Plans
 * Cancellations
 * Classes/Group Lessons