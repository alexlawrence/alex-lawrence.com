---
date: 2021-01-20
title: "Domain Modeling by example"
description: "This post illustrates a Domain Modeling process using a simple example."
keywords: ddd, domain modeling
---

This post illustrates a Domain Modeling process using a simple example. As first step, the actual problem is identified. Next, a solution approach is discovered. This is followed by the creation of an initial Domain Model. Afterwards, a first implementation is provided. Then, technical and logical challenges are discussed and solved. Also, the differences between a Domain Model and its implementation are explained. The post ends with a recommendation to use a problem-centric and model-driven approach, even for small projects.

## Problem identification

Domain-Driven Design puts emphasis on the problems to solve and its involved knowledge areas. In [my book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing), a Domain Model is defined as "set of knowledge abstractions that is focused on [..] solving specific problems". This means, in order to create a useful model, one needs to identify the problems first. As specific example, consider the following problem I encountered during the time when I was working on my book: **I want to know the occurrences of individual words in a text.**

At first, this statement seems useful. However, it is not really describing a problem, but already implying a specific solution. The relevant question is: What problem was I trying to solve with counting the occurrences of individual words? As I am not a native speaker, I am generally unsure about the diversity of my vocabulary. I wanted to somehow measure this aspect. Therefore, the real problem to solve that I had was to **determine the vocabulary diversity of a text**.

## Solution approach

With the problem identified, one can decide on specific solution approaches. In my case, I was already settled on one. The idea was that I'd be able to determine the vocabulary diversity by looking at the occurrences of individual words. However, this approach implied that the software part alone is not a complete solution. Rather, it would only generate data that helps to derive indications of vocabulary use. Determining the actual diversity would be done by me as the user.

## Initial Domain model

As mentioned previously, a Domain Model is a set of knowledge abstractions. Therefore, it does not have to have a specific manifestation or representation. Even more, while a model is commonly expressed in some way, the individual artifacts are often only subsets of information. For the vocabulary example, the knowledge abstractions can be conveyed through plain text. Note that this approach does not make any statement towards the complexity of the problem or the Domain Model.

The goal is to determine the degree of vocabulary diversity in a text. "Text" stands for a collection of words together with punctuation marks. "Vocabulary" can be defined as set of individual words. The term "diversity" incorporates the appearance of distinct words and their occurrences. The expression "degree" implies bounds and discrete steps between them. For the example, the vocabulary diversity is assumed to be a subjective metric that cannot be computed through software.

Altogether, the resulting Domain Model aspects can be summarized with the following points:

- given a text, the vocabulary diversity should be determined
- a text is a collection of words and punctuation marks
- a vocabulary is a set of individual words
- vocabulary diversity is a subjective metric that is determined manually

## First implementation

After having the Domain Model defined, the implementation can be started. For the example, an iterative software development process is assumed. As a consequence, there are lower requirements in terms of completeness and correctness for the Domain Model. Rather, the above definition can be seen as initial draft that evolves further. Another way to understand it is that the following iterations are part of an experimentation phase without building production software.

The following code is the first implementation for counting the occurrences of individual words in a text:

```javascript
const countWordOccurrences = text => {
  wordOccurrences = {};
  text.split(' ').forEach(word => {
    if (wordOccurrences[word] == null) wordOccurrences[word] = 0;
    wordOccurrences[word]++;
  });
  return wordOccurrences;
};

const wordOccurrences = countWordOccurrences(`This is a basic example.
  Also, this is only one of many possible examples.`);

console.log(wordOccurrences);
/* output: {
  This: 1, is: 2, a: 1, basic: 1, 'example.\n': 1, '': 1, 'Also,': 1,
  this: 1, only: 1, one: 1, of: 1, many: 1, possible: 1, 'examples.': 1
} */
```

The exemplary usage and its output demonstrate the capabilities of the initial solution.

## Technical issues

There are some technical issues with the first implementation. These aspects are not due to flaws in the model, but related to correctly integrating implicit requirements into the code. One problem is that punctuation marks are mistakenly considered as part of a word. The same is true for newline characters. Another issue is that multiple whitespaces cause to create empty word entries. These aspects are ill-suited as explicit parts of the model, as they should be seen as common sense.

The following code provides a reworked implementation that overcomes the mentioned issues:

```javascript
const wordRegex = /[a-z0-9]{1}[a-z0-9-]*/gi;

const countWordOccurrences = text => {
  wordOccurrences = {};
  Array.from(text.matchAll(wordRegex), match => match[0]).forEach(word => {
    if (wordOccurrences[word] == null) wordOccurrences[word] = 0;
    wordOccurrences[word]++;
  });
  return wordOccurrences;
};

const wordOccurrences = countWordOccurrences(`This is a basic example.
  Also, this is only one of many possible examples.`);

console.log(wordOccurrences);
/* output: {
  This: 1, is: 2, a: 1, basic: 1, example: 1, Also: 1, this: 1,
  only: 1, one: 1, of: 1, many: 1, possible: 1, examples: 1
} */
```

The second variant solves the mentioned technical issues by using a regular expression. This expression defines two rules. For one, every word must start with an alphanumerical character. Secondly, the first character can be followed by an arbitrary combination of alphanumerical characters and dashes.

## Model refinements

The reworked implementation is an improvement, but still faces issues. There are problems that hint to flaws in the Domain Model. One is that the implementation is case-sensitive, which causes multiple entries for identical words with different casing. Another issue is that the singular and the plural form of one word are considered different things. Unlike the technical issues, these aspects should be explicit model parts. This is because they may be treated differently, depending on the problem statement.

The Domain Model definition can be updated as follows:

- given a text, the vocabulary diversity should be determined
- a text is a collection of words and punctuation marks
- a vocabulary is set of individual words
- vocabulary diversity is a metric that indicates the language quality
- different casings of one word are considered the same
- singular and plural of one word are considered the same

The final example provides an implementation that reflects the latest Domain Model:

```javascript
const wordRegex = /[a-z0-9]{1}[a-z0-9-]*/gi;

const countWordOccurrences = (text, {asSingular}) => {
  wordOccurrences = {};
  text = text.toLowerCase();
  Array.from(text.matchAll(wordRegex), match => match[0]).forEach(word => {
    word = asSingular(word);
    if (wordOccurrences[word] == null) wordOccurrences[word] = 0;
    wordOccurrences[word]++;
  });
  return wordOccurrences;
};

const pluralize = require('pluralize');

const wordOccurrences = countWordOccurrences(`This is a basic example.
  Also, this is only one of many possible examples.`,
  {asSingular: pluralize.singular});

console.log(wordOccurrences);
/* output: {
  this: 2, is: 2, a: 1, basic: 1, example: 2,
  also: 1, only: 1, one: 1, of: 1, many: 1, possible: 1
} */
```

The case sensitivity is mitigated by making the input text lowercase. For the merging of singular and plural forms, the implementation introduces the dependency `asSingular`. This argument must be assigned with an operation that takes a word and returns the singular form. As example, the npm module `pluralize` is loaded and its function `singular()` is passed in as dependency. This approach ensures to express the model behavior correctly, while at the same staying free of concrete dependencies.

## Model versus code

There is a difference between a Domain Model and the knowledge an implementation expresses. Consider the following excerpt from [my book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing): "An actual implementation may only reflect a subset of the underlying abstractions, and eventually deals with extraneous technical aspects." The vocabulary diversity example illustrates both statements. For one, the implementation does not express the full model, as it exclusively counts occurrences per individual word. Secondly, it also deals with purely technical issues such as multiple whitespaces or newline characters. 

## DDD for small problems

Another aspect this post illustrates is that allegedly simple problems can have a lot of complexity to them. Domain-Driven Design and its individual patterns are often recommended for large software projects with rich and complex Domains. However, starting with the problem space and creating a useful conceptual model before going into implementation is always beneficial. Even for a small functionality such as determining vocabulary diversity, a problem-centric and model-driven approach is valuable.

[Buy my book "Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)
•
[Discuss on Twitter](https://twitter.com/lx_lawrence/status/1351998550536810501)