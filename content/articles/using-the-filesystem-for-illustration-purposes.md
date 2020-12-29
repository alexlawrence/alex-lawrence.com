---
date: 2020-12-29
keywords: javascript, nodejs, filesystem
title: Using the filesystem for illustration purposes
---

This article describes the approach of using the filesystem for illustrating the implementation of concepts related to persistence and messaging. Some of the explanations are put into the context of my book ["Implementing DDD, CQRS and Event Sourcing"](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing). The approach is compared to the alternatives of using existing technologies as well as providing pseudo in-memory implementations. At the end, the article outlines the most relevant benefits and implications.

## The approach

Apart from Node.js and JavaScript, my book does not explain or utilize specific frameworks or technologies. For all functionalities that require persistence or inter-process communication (IPC), it provides exemplary implementations that work with directly the filesystem. This includes Repositories, the Event Store, Read Model storages and an inter-process event distribution. The goal is to convey a deeper understanding of the concepts that are related to persistence and messaging. For production purposes, these implementations can be easily replaced with suitable technologies.

As example, the following snippet shows a basic variant of a generic filesystem-based Repository:

```javascript
class FilesystemRepository {

  storageDirectory; #convertToData; #convertToEntity;

  constructor({storageDirectory, convertToData, convertToEntity}) {
    mkdirSync(storageDirectory, {recursive: true});
    Object.defineProperty(
      this, 'storageDirectory', {value: storageDirectory, writable: false});
    this.#convertToData = convertToData;
    this.#convertToEntity = convertToEntity;
  }

  async save(entity) {
    const data = this.#convertToData(entity);
    await writeFile(this.getFilePath(entity.id), JSON.stringify(data));
  }

  async load(id) {
    const dataString = await readFile(this.getFilePath(id), 'utf-8');
    return this.#convertToEntity(JSON.parse(dataString));
  }

  getFilePath(id) {
    if (!id) throw new Error('invalid identifier');
    return `${this.storageDirectory}/${id}.json`;
  }

}
```

The component can be used as base for specialized Repository components, such as the following:

```javascript
class BookRepository extends FilesystemRepository {

  constructor({storageDirectory}) {
    super({storageDirectory,
      convertToData: entity => /* .. */,
      convertToEntity: data => new Book(data)});
  }

  async findBooksPublishedAfter(date) {
    const files = await readdir(this.storageDirectory);
    const ids = files.map(filename => filename.replace('.json', ''));
    const entities = await Promise.all(ids.map(id => this.load(id)));
    return entities.filter(book => book.publishingDate.getTime() >= date.getTime());
  }

}
```

The class `FilesystemRepository` is a generic Repository component that can be used as base class for arbitrary Entity types. As constructor arguments, it expects a storage directory as well as custom converter operations. These operations define how Entities are converted to data representations and vice versa. The class `BookRepository` is an example for a specific Repository that implements the domain-specific query `findBooksPublishedAfter()`. Apart from a small utility function, the base Repository is identical to the initial version in my book.

Notifications of data changes for filesystem-based storages can be achieved with the Node.js utility [`fs.FSWatcher`](https://nodejs.org/api/fs.html#fs_class_fs_fswatcher). This component utilizes native system mechanisms to watch for filesystem changes, such as inotify on Linux. While it is a powerful abstraction, it is not guaranteed to work for all systems and scenarios. Specifically, it does not work with shared filesystems, such as NFS. Nevertheless, it is a good choice for the illustration of certain concepts, such as event stream subscriptions or inter-process event publishing.

## Why not specific frameworks or technologies?

The use of specific frameworks or technologies for illustrating concepts related to persistence or messaging has both advantages and disadvantages. One benefit is the possibility to provide production-ready code. Furthermore, it allows to explain the used technologies, if that is a goal. However, there are multiple disadvantages. The use of specific tools inherently seems like a recommendation. Also, the reader requires more experience compared to when utilizing the filesystem. Finally, many technologies introduce an overhead, both in setup and use.

As example, consider my book would be using PostgreSQL as storage technology for an Event Store. In order to provide executable example implementations, the database setup would need to be explained. Also, reading the according code would require to understand SQL. Generally, PostgreSQL is a suitable candidate for an Event Store. However, there are also many other fitting databases. As always, the right choice of technologies depends on the specific use case. Therefore, implicit recommendations can in fact be counterproductive.

### Build it yourself and throw it away

Attempting to build something yourself enables to gain a deep understanding of the associated concepts. With this approach, the goal is not to successfully build a production-grade functionality, but to learn as much as possible. In addition to a deep understanding of the concepts, one typically acquires the necessary knowledge to identify suitable existing technologies. Obviously, it is very subjective and generic to say that learning by building it yourself works well. Your individual experience may be different, of course.

For me personally, there were many occasions where this approach worked great. When I programmed with Turbo Pascal in my early adolescence, I tried to implement a 3D graphics engine. When I first worked as a freelancer, I built and used a small CMS, completely equipped with authentication and authorization. During my studies, I built a 2D physics engine in ActionScript/Flash. In the end, none of the projects were vastly successful. Nevertheless, my personal learning experience was second to none.

## Why not a pseudo-implementation?

Another possibility for illustrating certain concepts is to provide a pseudo-implementation, such as an in-memory storage. While this can work, it is ill-suited for concepts related to persistence and inter-process communication. There are many challenges an in-memory functionality can simply ignore, such as transactions. Of course, these aspects can be simulated in some way, but the resulting implementations are likely to feel very artificial. Also, there are some concepts that simply require actual persistence, such as persistent Read Model projections.

As example, consider a minimal in-memory variant of the previously shown Repository component: 

```javascript
class InMemoryRepository {

  #storage;

  constructor() {
    this.#storage = new Map();
  }

  save(entity) {
    this.#storage.set(entity.id, entity);
  }

  load(id) {
    return this.#storage.get(id);
  }

}
```

The class `InMemoryRepository` is a Repository that stores Entities transiently. While its code is very short, it completely misses some crucial aspects. For one, it works synchronously, whereas actual persistence mechanisms are always asynchronous. Secondly, there is no data conversion, as the Map instance stores the actual objects. This practice can even lead to unexpected side effects, as the same reference objects are shared across all consumers. Overall, the class provides almost no abstraction over using a Map instance directly. 

## All the glitters is not gold

Using the filesystem for illustrating concepts related to persistence or messaging can be beneficial, but also has implications. Ideally, it enables to convey detailed knowledge. Also, it avoids technology preferences, does not require additional knowledge and can prevent overhead. At the same time, utilizing the filesystem for complex topics can feel like re-inventing the squared wheel. In the worst case, it produces more overhead than using an existing technology. Still, for the examples in my book it proved itself useful.

[Buy the book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing)
•
[Discuss on Twitter](https://twitter.com/lx_lawrence/status/1343871960783187968)