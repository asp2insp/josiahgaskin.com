---
title: "Splay Tree Encryption"
date: "2014-02-26"
description: "Musings on building an encryption protocol for asynchronous messaging using splay trees."
aliases: []
tags: ['cryptography', 'projects']
linktitle: "splay-tree-encoding"
groups: ['blogposts']
groups_weight: 1
published: false
---

Keys
-----------

The big idea: Key rachet system with immediate racheting. This works well since keys are very ephemeral, they only stay in memory for the time necessary for one message.

I want to implement this through the use of Splay Trees. The splay tree is a symmetrical-key shared secret and is described more in the [Splay Tree][SplayTrees] section.

The splay tree is used to encode the message and once receipt has been confirmed, the tree can be splayed with the contents of the message in order to ratchet the key forward. Upon receipt, recipient(s) decode the message with their own tree key and then use the message contents in order to ratchet their own keys forward and then proceed.

This has several issues.

One is eventual decoding which means that the key's ephemerality is completely irrelevant. If you store all the messages and get just one key and the corresponding ciphertext that lets you trivially decode forwards in time. You can also decode backwards in time (just conceptually more difficult) although this can be mitigated by using a one-way transform on the tree (look up tree one way transforms)

Second is synchronicity. If a message arrives out of order it will screw up the whole thing since the sender and recipient will be on different ratchets. We can help solve this by using a counter embedded in the messages. Solution is to make it self-healing like OTR-DH key exchange (3 step advertise/acknowledge/accept key exchange) so at most you would lose a few messages.

WhisperSystems has successfully implemented a protocol like this. Their protocol has the added benefit of spinning off and caching intermediate keys that are bound to a single message in the chain in case you're waiting for an out-of-order message to arrive but you want to keep decoding later messages.

We could also publish MACs like OTR does in order to improve deniability.

Forward Error Correction could really help with dropped messages. We can calculate

`FEC = XOR(M1, M2, ..., MN)`

after every set of N messages so that if one of the N messages gets dropped, we can recover it easily. The drawback to this approach is it requires out-of-order evaluation which is not possible in the basic splay tree model.
