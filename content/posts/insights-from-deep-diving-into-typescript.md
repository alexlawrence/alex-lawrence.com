---
date: 2021-03-03
title: Insights from deep-diving into TypeScript
description: "Summary of insights from deep-diving into TypeScript"
keywords: typescript, classes, type inference, discriminating unions, template literal types
---

This post summarizes some insights from my deep dive into TypeScript during writing an appendix for [my book](https://leanpub.com/implementing-ddd-cqrs-and-event-sourcing). While I have been working with TypeScript for quite some time, most of the code I encountered was pretty trivial. The majority of the following aspects were new to me and helped me to understand TypeScript better. Also, writing a lot of my book's code again in TypeScript allowed me to identify potential downsides of the tool.

## Class magic

TypeScript has a special support for the `class` keyword. For every class within the global scope (of a module), it implicitly defines an instance type with the same name. This enables to write things like `const user: User = new User()`. Also, `export` and `import` statements combine same-named values and types. However, this mechanism does not work for dynamically created classes or plain constructors. In such cases, the behavior must be emulated with the utility `InstanceType` and the `typeof` keyword.

The following code example illustrates this behavior:

```typescript
class StaticClass {}
const a: StaticClass /* instance type */ = new StaticClass(); /* constructor */

const createClass = () => class {};
const DynamicClass = createClass(); /* no implicit type definition */
// this does not work yet: const b: DynamicClass = new DynamicClass();

type DynamicClass = InstanceType<typeof DynamicClass>; /* now there is a type */
const b: DynamicClass /* instance type */ = new DynamicClass(); /* constructor */

export {StaticClass, DynamicClass}; /* exports both constructors and types */
```

The statement `type X = InstanceType<typeof X>;` is logically equivalent to what TypeScript does automatically when encountering the `class` keyword.

## No type inference for members

For an implementation of an interface, the types of member attributes and member functions could sometimes be inferred. As example, when an interface `Logger` defines the function `log(message: string): void`, an implementation `ConsoleLogger` could just use the signature `log(message)`. TypeScript could infer that the function parameter is a string and the return value is `void`. For different reasons, this is currently not supported. All member attributes and member functions must be typed explicitly, independent of interfaces or base classes.

The following example illustrates the potential repetition due to this necessity:

```typescript
interface Logger {
  logInfo(message: String): void;
  logWarning(message: String): void;
  logError(message: String): void;
}

class ConsoleLogger implements Logger {
  logInfo(message: String) { /* .. */ }
  logWarning(message: String) { /* .. */ }
  logError(message: String) { /* .. */ }
}
```

## No partial type inference

TypeScript can infer the types for type parameters from their usage. For example, the function `asArray = <T>(item: T) => [item]` can be invoked without defining the type parameter, such as `asArray('foo')`. In this case, `T` is inferred to be of type `"foo"` (which extends `string`). However, this does not work for multiple type parameters, where only some should be inferred. One possible workaround is to split a function into multiple, with one having all type parameters to be inferred.

The next code shows a generic function to create object factories with pre-filled data:

```typescript
const createFactory1 =
  <R extends {}, P extends {}>() => (required: R) => ({...required, ...prefilled});
// requires to specify second type parameter, even though it could be inferred
const createAdmin1 = createFactory1<{email: string}, {admin: true}>({admin: true});
const adminUser1 = createAdmin1({email: 'john@example.com'});

const createFactory2 = <R extends {}>() =>
  <P extends {}>(prefilled: P) => (required: R) => ({...required, ...prefilled});
// first function specifies type parameter, for second function it is inferred
const createAdmin2 = createFactory2<{email: string}>()({admin: true});
const adminUser2 = createAdmin2({email: 'jane@example.com'});
```

The function `createFactory1()` requires to specify both type parameters, even though the second one could be inferred. The operation `createFactory2()` eliminates this issue by splitting the function into two individual operations.

## Discriminating Unions usage

Discriminating Unions are useful for working with a heterogeneous set of similar items, such as Domain Events. The mechanism allows to distinguish between multiple types using a discriminating field. Every item type uses a specific type for the field that makes it distinct. When processing an item with a union type, its type can be narrowed down based on the discriminating field. One downside of this mechanism is that it demands the code to be written in a specific way.

The next example compares a JavaScript implementation of an event handler to its TypeScript counterpart with Discriminating Unions:

```typescript
// JavaScript
const handleEvent = ({type, data}) => { // early destructuring
  if (type == 'UserRegistered')
    console.log(`new user with username: ${data.username}`);
  if (type == 'UserLoggedIn')
    console.log(`user logged in from device: ${data.device}`);
};

// TypeScript
type UserRegisteredEvent = {type: 'UserRegistered', data: {username: string}};
type UserLoggedInEvent = {type: 'UserLoggedIn', data: {device: string}};
type UserEvent = UserRegisteredEvent | UserLoggedInEvent;

const handleEvent = (event: UserEvent) => { // destructuring must not happen here
  if (event.type == 'UserRegistered')
    console.log(`new user with username: ${event.data.username}`);
  if (event.type == 'UserLoggedIn')
    console.log(`user logged in from device: ${event.data.device}`);
};
```

When using TypeScript, a value with a Discriminating Union type cannot be destructured correctly before narrowing down the type.

## Template Literal types

Template Literal types are essentially Template Literals on a type level. They can be used to create string literal types that are the result of evaluating a template literal. The article ["Exploring Template Literal Types in TypeScript 4.1" by David Timms](https://davidtimms.github.io/programming-languages/typescript/2020/11/20/exploring-template-literal-types-in-typescript-4.1.html) explains them in detail with advanced examples. One specific use case is the definition of message processing components, where different message types are handled by individual operations. 

The following example demonstrates this using the previous logger example:

```typescript
type MessageType = 'Info' | 'Warning' | 'Error';

type Logger = {
  [k in MessageType as `log${MessageType}`]: (message: string) => void;
}

class ConsoleLogger implements Logger {
  logInfo(message: String) { /* .. */ }
  logWarning(message: String) { /* .. */ }
  logError(message: String) { /* .. */ }
}
```

The type definition `Logger` iterates over the union type `MessageType` and defines one operation for each message type.

## Don't let TypeScript get into your way

TypeScript is a powerful statically typed language. Many times, it is referred to as a "superset of JavaScript". However, for some functionalities, it forces to write code in a specific way. For one, Discriminating Unions influence how destructuring assignments can be used. Furthermore, the lack of partial type inference can necessitate to split up one function into multiple ones. While the benefits of TypeScript likely outweigh its potential downsides, it is still important to be aware of them.