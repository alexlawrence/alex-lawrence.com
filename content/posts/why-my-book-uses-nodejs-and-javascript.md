---
date: 2020-12-21
keywords: ddd, cqrs, eventsourcing, javascript, nodejs
title: Why my book uses Node.js and JavaScript
---

This article explains why I chose Node.js as runtime platform and JavaScript as programming language for [my book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing). The described reasons incorporate personal experience, the desired target audience as well as platform and language characteristics. Also, the benefits and implications of static types are briefly discussed. Finally, the article closes with an outlook of future additions to the existing book.

## Personal experience

One reason for using Node.js and JavaScript in my book is that I've worked with both for almost 8 years. As for JavaScript as a programming language, I have around 14 years of experience. Also, two projects in which I applied CQRS and Event Sourcing made use of those technologies. Therefore, it seemed like a natural choice for me when I planned to write a technical book.

## Broad audience

Another reason for JavaScript is that it is a very widespread language, with which I can reach a broad audience. While not everybody may like it, there are many people who understand it. Furthermore, its syntax can look similar to other languages such as Java or C#, especially when using classes. While there are certainly languages with distinct characteristics for specific purposes, the use of JavaScript simply enables a high reach.

As for syntax similarities, here is a categorized Application Services class in JavaScript:

```javascript
class NoteApplicationServices {

  #noteRepository;
  
  constructor({noteRepository}) {
    this.#noteRepository = noteRepository;
  }

  async createNote({noteId, content, category}) {
    const note = new Note({id: noteId, content, category});
    await this.#noteRepository.save(note);
  }

  /* .. */

}
```

The equivalent (blocking) implementation in Java mostly differs in its type annotations:

```java
public class NoteApplicationServices {

  private NoteRepository noteRepository;
  
  constructor(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  public void createNote(UUID noteId, string content, string category) {
    Note note = new Note(noteId, content, category);
    this.noteRepository.save(note);
  }

  /* .. */

}
```

The syntax similarity is also given for other programming languages, such as C# or PHP.

## Universal language

My book contains a dedicated chapter on the User Interface. There, I also use JavaScript for all client-side code. This is because it is natively supported in the browser and probably the most used language for web frontends. There is even some universal infrastructure code that is consumed by both the server and the client. With this approach, the reader only needs to know one language in order to understand both backend and frontend code. 

## Platform simplicity

Over the years, I've worked with multiple languages, runtimes and servers for backends. Professionally, I used PHP and Apache, as well as C#, the CLR and IIS. When I started with Node.js, I was impressed by the minimal overhead for certain use cases. At the same time, it is also suitable for building complex production-grade software, especially with selected third-party libraries. Overall, it made a good fit for the implementations in my book, which often serve an illustration purpose.

As example, take a look at a greatly simplified variant of a filesystem Repository:

```js
class FilesystemRepository {

  constructor({storageDirectory, convertToData, convertToEntity}) {
    mkdirSync(storageDirectory, {recursive: true});
    this.#storageDirectory = storageDirectory;
    this.#convertToData = convertToData;
    this.#convertToEntity = convertToEntity;
    this.getFilePath = id => `${this.#storageDirectory}/${id}.json`;
  }

  async save(entity) {
    const data = this.#convertToData(entity);
    await writeFile(this.getFilePath(entity.id), JSON.stringify(data));
  }

  async load(id) {
    const dataString = await readFile(this.getFilePath(id), 'utf-8');
    return this.#convertToEntity(JSON.parse(dataString));
  }

}
```

This is not to say that Node.js generally makes things simpler. However, there are definitely alternative platforms where there is a lot more boilerplate code to it.

## Concise and compact code

The code examples shown in my book must be compact. Especially in the PDF version, where there is a line length limit of 85 characters. For certain aspects, JavaScript enables to write concise and compact code. Often, this is the case for simple things due to the minimal overhead or ceremony. On top of that, there are specific language constructs that help with keeping code short. Some examples are arrow function expressions, object literals, shorthand property names and destructuring assignments.

The following code shows the implementation of a simple Value Object type:

```javascript
const Money = function({value, currency}) {
  Object.freeze(Object.assign(this, {value, currency}));
};
```

At first glance, the example may even look overly complex. One could also implement an arrow function that creates an anonymous object and freezes it. However, the above implementation is comparable to a full-blown class in a class-based language. The constructor function returns an instance that can be checked for its type. For example, the expression `new Money({value: 10, currency: 'USD'}) instanceof Money` evaluates to `true`.

## What about types?

JavaScript is a dynamically typed language. Put the other way round, it lacks static typing. This can be either seen as advantage or as shortcoming. With regard to DDD and the modeling of complex domains, it is typically a disadvantage. The implementation of a complex Domain Model benefits from static typing and a powerful type system. One advantage for the examples in my book is that the absence of type annotations keep the code more compact.

As example for the benefits of a powerful static type system, look at the following Domain Model implementation:

```typescript
type Author = {id: UUID, firstName: string, lastName: string};
type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

type ExamResult = {author: Author, grade: Grade};
```

The type `Grade` expresses the domain-specific concept of a grade on type level.  There are no runtime checks required for ensuring correct values. Apart from the Domain layer, other software parts may not benefit as much from static types. Furthermore, trivial domain problems may be implemented adequately even with plain JavaScript. There are even possibilities for runtime type checking. Generally, the use of TypeScript likely has no disadvantages. At the same time, plain JavaScript can also be sufficient.

## Why not something else?

There would have been many alternatives for a programming language and a runtime to use for my book. Node.js and JavaScript are generally **not** superior for applying DDD, CQRS or Event Sourcing. As explained, plain JavaScript can even be ill-suited for tackling complex domain problems due to the lack of static types. However, the two proved to be an overall fitting choice for the book. Also, most of the example implementations can be easily mapped to any other technology.

## Plans for the book

While working on the book, I was sometimes concerned about not using TypeScript or even the overall choice of technologies. In order to ease my mind, I thought about future editions using TypeScript or even Rust without Node.js. As of now, I don't think that this makes sense. However, there is potential for useful future additions. My near-term plan is to either write an appendix on the benefits of types or annotate the existing affected content.

[Buy the book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)
•
[Discuss on Twitter](https://twitter.com/lx_lawrence/status/1341147952195231745) 