---
date: 2021-03-04
title: Read Model on the write side
description: "Explanation of why and how Read Models can be useful on the write side"
keywords: cqrs, read model, write model, eventual consistency
---

This post explains why and how Read Models can be useful on the write side of a software. First, the terms CQRS, write side, read side and Read Models are briefly explained. Then, it is discussed how the read side works and why Read Models can also be used in other areas. Next, one common use case for read data on the write side is described. As last part, the whole topic is illustrated with a simplified example.

## The many ways of CQRS

CQRS is a pattern that separates software into a write side and a read side. The idea is to treat write-related use cases differently from the ones that primarily yield data. However, the concept itself does not dictate any technological decision. Specifically, it does not demand to use separate data storages. Although this is a common setup, it is completely optional. Even the sole use of a caching mechanism or a view in an SQL database are some form of CQRS.

## What is a Read Model?

A Read Model is a data structure for displaying information that is in some way based on a Write Model. The contained data may be denormalized, derived and even aggregated from multiple sources. Read Models can be expressed as concrete code components, but can also exclusively manifest as structural descriptions. Independent of a specific technological setup, a Read Model should be considered eventually consistent. This means, it must not be excepted to contain the most current state at all times.

## Read side vs. Read Model

The read side of a software is responsible for executing read-related use cases. For this purpose, it typically maintains one or more Read Models. When a Query is issued to a responsible handler, the according read data is retrieved and returned. While Read Models are an integral part of a read side, they can also exist on a write side. Even more, there are certain use cases where the write side of a software should maintain its own Read Model.

## Rules across Aggregates

One use case for a Read Model on the write side is the enforcement of a rule across transactional boundaries. Invariants protect individual Aggregates from entering an invalid state. On top of that, there can also be less critical rules that affect a collection of transactional boundaries. These constraints should normally be satisfied, but may be violated temporarily. For such scenarios, a Read Model can be used to provide the necessary information that is spread across Aggregates.

## Example: Product reviewers

As example, consider a product review functionality of an e-commerce system. The rule is that one customer may only write one review for a single product. If this rule is considered an invariant, it demands that all reviews for a product share the same transactional boundary. Otherwise, it is impossible to satisfy the constraint at all times. However, enclosing all reviews for a product in one Aggregate results in a poor persistence performance and risks concurrency conflicts.

### Reviewers Read Model

An alternative is to accept that the rule can be violated, as long as it is only temporary. This approach demands the ability to detect a violation and to perform a corrective action. Reviews are considered separate Aggregates and the write side can maintain a reviewers Read Model. For each product, there is a list of all customer reviews. When a Command for adding a new review is issued, the Read Model is used to decide whether this action is allowed.

### Detecting the violation

For multiple concurrent review additions from a single customer, the Read Model may not be up to date. In such a case, the "one review per customer and product" rule can be violated. However, when the Read Model is synchronized, the violation can be detected. At this point, the software can report the issue or trigger a corrective action to remove extraneous reviews. Since a Read Model synchronization is ideally a matter of seconds, the temporary rule violation is negligible.

Here is some pseudo-code to demonstrate how the approach could be implemented:

```javascript
class ReviewCommandHandlers {

  #reviewersReadModel; #reviewRepository;

  constructor({reviewersReadModel, reviewRepository}) {
    this.#reviewersReadModel = reviewersReadModel;
    this.#reviewRepository = reviewRepository;
  } 

  writeReview(command) {
    const {productId, reviewId, customerId, rating, comment} = command.data;
    if (this.#reviewersReadModel[productId][customerId])
      throw new Error('customer already wrote a review');
    this.#reviewRepository.save(new Review({id: reviewId,
      productId, customerId, rating, comment}));
  }

}
```

For each new review, the event "ReviewWritten" is published, which is used to update the Read Model:

```javascript
class ReviewersReadModelSynchronization {

  #reviewersReadModel;

  constructor({reviewersReadModel, eventBus}) {
    this.#reviewersReadModel = reviewersReadModel;
    eventBus.subscribe('ReviewWritten', this.handleEvent.bind(this));
  } 

  handleEvent(event) {
    const {productId, customerId} = event.data;
    if (this.#reviewersReadModel[productId][customerId]) 
      console.log(`customer ${customerId} wrote multiple reviews for ${productId}`);
    this.#reviewersReadModel[productId][customerId] = reviewId;
  }

}
```

In this case, the synchronization component for the Read Model only reports the rule violation. As mentioned previously, another option is to trigger a corrective action. 

Naturally, there are alternative approaches for enforcing a rule that spans across Aggregates. The important part here is to understand that Read Models are not exclusive to the read side of a software.

[Buy my book "Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)