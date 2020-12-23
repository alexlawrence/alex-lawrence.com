---
date: 2020-12-18
keywords: book, ddd, cqrs, eventsourcing, javascript, nodejs
title: Why I wrote a book on DDD, CQRS and Event Sourcing 
---

This article explains my motivation for writing a book on DDD, CQRS and Event Sourcing. It starts with outlining how I came in contact with the concepts. Then, it describes how I first applied the patterns accidentally and afterwards worked with them extensively. Finally, it presents the initial book idea, my personal progress throughout the years and the actual result. 

## First contact

I first heard of Domain-Driven Design when I worked as a Senior Software Developer at [AutoScout24](https://www.autoscout24.de/). It was in 2012, when colleague developers told me about the concept and recommended ["Domain-Driven Design"](https://www.goodreads.com/book/show/179133.Domain_Driven_Design) by Eric Evans. I immediately bought the book, but only skimmed it initially. Although I was working as a full-stack developer, I was primarily focused with UI development at that time.

Either also in 2012 or in 2013, I got introduced to CQRS and Event Sourcing. First, a few colleagues started to talk about the concepts. Some time later, Greg Young gave a workshop at AutoScout24. While I wasn't directly taking part, the workshop participants shared their gained knowledge with the rest of the department afterwards. Back then, I understood CQRS, but was concerned with the potential associated complexity. In contrast, I did not really grasp the idea of Event Sourcing.

## Accidental application

Later in 2013, I started to work on a business idea with a good friend of mine. We built a Session Replay tool for UX testing purposes. In essence, the software recorded user interaction in the browser and reconstructed a video-like replay. There was a JavaScript snippet to include on websites that tracked the rendered HTML, AJAX calls and all user interaction. The data was sent to our Node.js backend and was exposed as playbacks through an according UI. 

While I consciously defined a certain architecture for the software, it was merely a typical combination of MVC and ORM. At some point, it progressed from a monolithic software to a set of services. Only many months in, I realized that the software was applying some form of CQRS and Event Sourcing. On the write side, user interaction events were validated and persisted in a log. On the read side, those events were projected into a Session Replay. 

## Conscious application

In 2014, I started working for a startup that developed a collaborative web-based meeting software. There was a feature-complete prototype of the tool, which was already used in production. However, it faced various serious issues. The startup had decided to rewrite it completely in Node.js and to utilize selected patterns of DDD. As part of the overall software architecture, they also wanted to apply CQRS and Event Sourcing.

The startup developers were ambitious and talented. However, there was only limited theoretical knowledge and no practical experience with the concepts. Most had read the book from Evans and also recommended me ["Implementing Domain-Driven Design"](https://www.goodreads.com/book/show/15756865-implementing-domain-driven-design) by Vaughn Vernon. Throughout the following year, I read both books multiple times and consumed everything I found online. This included the paper ["CQRS Documents"](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf) and countless videos by Greg Young. Still, there were quite some unanswered questions on how to put everything into code.

In the end, we built a working software that applied tactical DDD patterns, CQRS and Event Sourcing. The implementation was backed by useful Domain Models. Personally, I acquired a lot of knowledge and practical experience. We even built a Node.js framework as byproduct. However, there were many mistakes, such as missing delivery guarantees or boundary violations. The overall inexperience was problematic. The software was effectively misused as playground for learning and applying patterns. This slowed down the project progress significantly.

## Book idea

In 2016, before leaving the startup, I first thought about writing a book on implementing DDD, CQRS and Event Sourcing. I planned to use JavaScript and Node.js as an alternative to Java, which was used in comparable literature. Effectively, I wanted to write the book that the developers and I would have needed in the beginning. Although we acquired knowledge through the literature from Evans, Vernon and Young, we missed some guidance on the implementation part. 

## Personal progress

I worked on the book from the end of 2016 until the end of 2020, primarily as a side project. When I started, I was confident that I had all the required knowledge and experience. However, throughout the years, I learned many details, such as the conceptual difference between Domain Events and Event Sourcing records. Today, I know that I could not have written it at once in 2016 with the same quality.

## Final result

The final book is quite different from what I envisioned it to be at first. Overall, it has much greater detail compared to what I had in mind in 2016. My initial goal was to write a short book with approximately 150 pages. The complete published version has now over 450 pages. However, I consider this a good thing. The book provides enough context to be read without any prior knowledge in DDD, CQRS or Event Sourcing.

[Buy the book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)