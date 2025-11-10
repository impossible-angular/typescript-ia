## TypeScript/JavaScript examples

- [Update array object](#update-array-object)

### Update array object

[**Source file:** update-array.ts](src/update-array.ts)
[**Test:** update-array-test.ts](src/update-array-test.ts)

**Briefly**

All these functions are used to update one object in the array by ID, each using a different method.
`[.findIndex .slice .concat], [.findIndex, .splice], [.map, if], [.filter] [.for, if] [.reduce, if]`
All these functions return a new array, but objects inside remain mutable and referential. (they are still references to the original objects).
A function based on .splice() changes the original array; it does not return a new array.

**Usage**

```shell
 npm run update-array-test
```

**Details**

- If you need to change the array without creating a new one, then `.splice()` is the fastest way for any array size.
- For array sizes between 100 and 10k, all functions are, on average, fast.
However, `.map()` and `.filter()` are generally preferred because they are more readable and explicit about their intent.
- For an array size over 100k, the most efficient approach will be a combination of `.findIndex()`, `.slice()`, and `.concat()`.

If your array does not change its size or the IDs of its elements, it's beneficial to create an `Index Map` (e.g., {[ID]: index}) for efficiently finding the index.
It's a one-time expensive operation that provides significant performance gains compared to other methods, such as `findIndex()` or a simple for loop with an if statement.

Tested with next methods:
- .findIndex .slice .concat
- .filter
- .map
- .for of
- .reduce
- slice & destruction(...)
- slice & concat
    - by `findIndex` method
    - by `[key: value]` index

You can ensure immutability by using:
- `Object.freeze()` (for a shallow freeze)
- `structuredClone()` (to create a deep copy)

