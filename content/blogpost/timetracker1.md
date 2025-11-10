---
title: "Starting Time Tracker"
date: "2014-03-14"
description: "First in a series of posts concerning my hourly billing Saas project"
aliases: []
tags: ['projects', 'timetracker']
linktitle: "starting-time-tracker"
groups: ['blogposts']
groups_weight: 1
---

Today I sat down with my client and wrote down the first design draft for Time Tracker. I suppose you still call them clients
even if they aren't paying you.

## Big Picture and Motivation

Many small businesses provide a variety of hourly services through a small number of employees. Each employee offers a subset of the total services offered, and has a different experience level. Similarly, each client has a slightly different relationship with the company, and requires a different subset of services. In many cases, this leads to a somewhat complex billing and payroll system.

A good example of this is a tutoring business. Each tutor has several academic subject areas in which they are proficient. Tutors may have varying degrees in their subject fields, ranging from simple credentials to PhDs, and all have a unique level of experience. Clients come from a variety of economic backgrounds and each requires help with a different subject area. There are also distinctions and gradations within each subject area (such as Honors, AP, remedial). Clearly, a tutor with a PhD (let's call her Jane) in physics should be paid more to tutor physics than a tutor who simply holds a BS (we'll call him Ted) in the same field. The easy answer would be to pay Jane at a higher hourly rate than Ted. However, it would not necessarily be fair to pay Jane a higher rate to tutor biology, as her experience and expertise may be on a level with Ted, since it is neither's primary field of study. Thus, the rate of pay for the Employee must be linked to a tuple of {Tutor, Subject Area}. The client also plays a role in determining the cost of the session. A tutoring service may charge more for a high school student than one who is struggling in primary education, and furthermore may charge a premium on top of the high school rate for AP coursework. Each student may also require help with multiple subjects, some of which may be of different levels. Additionally, some clients may ask for a discount, or joined the service through a promotional offer. Thus, our tuple of influences on the cost of a lesson has expanded to: {Tutor, Subject Area, Subject Level, Student}. Taken to the extreme, it is possible for every single lesson to be billed at a different rate. If the company wishes to pay the employees fairly, then by extension, each tutor may be compensated for each of the lessons which they taught in the previous billing cycle at a different rate as well.

Other examples of fields where this type of payroll system appears include therapy (physical, mental, or emotional), yoga, music and voice lessons, and more. All follow this same pattern of a Employee serving a Client, but the nature of that service must be picked from the cartesian product of several sets of factors.

This becomes a headache to manage by hand. Many small businesses keep track of their billing and payroll on paper or by manually adjusting spreadsheets. More technically savvy office managers may even use mail merging or payroll software. Payroll software, however, is generally tailored towards larger firms, and ones with more straightforward needs. Describing the somewhat-complex relationship between the parties involved in each sale is either difficult to set up or tedious to maintain.

This is the problem that Time Tracker (it's a working name) sets out to solve. The goal is to serve this niche population by allowing easy definition of services rendered and allowing them to be tweaked on a per-client basis or per-employee basis, or both.

## Design

### Data Models
Each data item is assumed to have a GUID and a link to a parent object. This mirrors the specification of the Google AppEngine datastore which is used for the implementation.

#### Employee:

{{% codeblockwithsyntax %}}
{
	Name: "Jane Daw",
	Phone: "###-###-####",
	Email: "janedaw@service.com",
	BonusPayItems: [
		"Holiday Bonus": 1000,
	],
}
{{% /codeblockwithsyntax %}}

#### Client:

{{% codeblockwithsyntax %}}
{
	Name: "John Doe",
	Phone: "###-###-####",
	Email: "johndoe@example.com",
	BillingRates {
		"JaneDaw/APBiology": 80,
		"JaneDaw/APPhysics": 100,
		"TedSmith/Writing": 75,
	},
}
{{% /codeblockwithsyntax %}}


#### Session:

{{% codeblockwithsyntax %}}
{
	_Parent: *Client{"John Doe"},
	Date: 01/31/2014,
	Hours: 1,
	Employee: *Employee{"Jane Daw"},
	SessionType: "APBiology",
	Notes: "Cell Mitosis/Meiosis",
	BonusPayItems: [],
}
{{% /codeblockwithsyntax %}}

#### Employee Pay Stub:

{{% codeblockwithsyntax %}}
{
	_Parent: *Employee{"Jane Daw"},
	Date: 01/31/2014,
	Amount: 5400,
	CheckNumber: 9999,
	Memo: "",
}
{{% /codeblockwithsyntax %}}

#### Client Pay Receipt

{{% codeblockwithsyntax %}}
{
	_Parent: *Client{"John Doe"},
	Date: 01/31/2014,
	Amount: 600,
	CheckNumber: 55555,
	Memo: "",
}
{{% /codeblockwithsyntax %}}

### Session Recording Screen

Obviously an office manager should be able to record sessions on behalf of an employee, but the employee should also have the ability to enter their own completed work. This allows for distributed responsibility, a useful system if the employees are technically contractors (common in tutoring and music lessons).

This requires that the employee or office manager be logged in, so there is some identity associated with the session record.

#### Prototype

The prototype for this screen can be found on codepen: http://codepen.io/ca-geo/pen/jbmLF. It was built with JQuery and Semantic-UI.{{% footnote 1 %}}http://semantic-ui.com/{{% /footnote %}}

{{< responsiveslides "/static/img/timetracker/NewSessionPrototype.png" "/static/img/timetracker/NewSessionPrototypeDropdown.png" "/static/img/timetracker/NewSessionPrototypeCalendar.png" >}}


### Next up: 
 * Prototype Admin Overview
 * Prototype Quarterly/Annual Profit/Loss
 * Write about the Workflow