---
title: "Defining a Workflow"
date: "2014-03-19"
description: "Nailing down the workflow of Time Tracker"
aliases: []
tags: ['projects', 'timetracker']
linktitle: "defining-a-workflow"
groups: ['blogposts']
groups_weight: 1
published: true
---

## Montly Billing Workflow

Until I'm told otherwise, I'm assuming billing occurs on a monthly cycle (my first client does, so that's the first goal). 
This is my current draft workflow for an admin when they want to settle the books for the month (or other, configurable, time 
period).

### Paystub Creation
 * For each employee, bring up a list of all sessions that employee has logged during that time period: 
       {{% figure src="/static/img/timetracker/paystubcreate.png" %}}
 * Review the information and make any necessary adjustments or changes, then advance to creating the paystub

### Invoice Creation
 * The system should provide a preview of the paystub and then email it out.
 * For each client, bring up a list of all sessions that the client will be billed for: 
         {{% figure src="/static/img/timetracker/invoicecreate.png" %}}
 * The system should provide a preview of said invoice and allow customization of the text of the invoice as well as
    allowing the attachment of additional information (flyers/coupons/annual statement, etc). The system should then email
    the invoice out.{{% footnote 1 %}}Eventually I would like to include some online payment opportunities. Stripe, Paypal, or other{{% /footnote %}}


## Up Next
 * Quarterly/Annual Profit/Loss
 * More workflow
 * Subscription Plans
 * Cancellations
 * Classes/Group Lessons