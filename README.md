## TypeScript/JavaScript examples

- [Update array object](#update-array-object)

### Update array object

[**Source file:** update-array.ts](src/update-array.ts)

**Briefly**

All this function used to update one object in array by `id` in different way and test performance.

**Usage**

```shell
 npm run update-array
```

**Details**

All input parameters remain mutable.

You can ensure immutability by using:
- Object.freeze() (for a shallow freeze)
- structuredClone() (to create a deep copy)

Tested with next methods:
- filter
- map
- for & push
- slice & concat
- slice & destruction(...)
    - by `findIndex` method
    - by `[key: value]` index
