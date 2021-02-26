---
date: 2021-02-26
title: "Releasing Appendix B for my book"
description: Release notes for the version 1.3.0 of the book "Implementing DDD, CQRS and Event Sourcing"
keywords: book, ddd, cqrs, eventsourcing, javascript, nodejs, eventstoredb, redis, rabbitmq, nginx
---

Today, I released version 1.3.0 of my book ["Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing). 

This release adds Appendix B: Going into production. The appendix uses [EventStoreDB](https://www.eventstore.com/) as Event Store, [Redis](https://redis.io/) for Read Models, [RabbitMQ](https://www.rabbitmq.com/) as Message Bus and [NGINX](https://nginx.org/) as HTTP proxy.

Also, this release applies the following changes to the existing content:

- add section on frameworks to conclusion part
- fix line lengths of various code examples
- fix password hashing when changing user password
- simplify indexed storage component with partial updates
- introduce link to project overview from team management page
- shorten note example
- replace door locker example with message inbox example
- fix missing parts of TypeScript implementation

[Buy the book on Leanpub](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)