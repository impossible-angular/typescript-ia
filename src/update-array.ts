/**
 * Impossible Angular
 * TypeScript/JavaScript examples
 * Author: Sergii Lutchyn
 *
 * All these functions are used to update one object in the array by ID, each using a different method.
 * [.findIndex .slice .concat], [.findIndex, .splice], [.map, if], [.filter] [.for, if] [.reduce, if]
 * All these functions return a new array, but objects inside remain mutable and referential. (they are still references to the original objects).
 * A function based on .splice() changes the original array; it does not return a new array.
 *
 * If you need to change the array without creating a new one, then .splice() is the fastest way for any array size.
 * For array sizes between 100 and 10k, all functions are, on average, fast.
 * However, .map() and .filter() are generally preferred because they are more readable and explicit about their intent.
 * For an array size over 100k, the most efficient approach will be a combination of .findIndex(), .slice(), and .concat().
 *
 * If your array does not change its size or the IDs of its elements, it's beneficial to create an Index Map (e.g., {[ID]: index}) for efficiently finding the index.
 * It's a one-time expensive operation that provides significant performance gains compared to other methods, such as findIndex() or a simple for loop with an if statement.
 *
 * You can ensure immutability by using:
 * - Object.freeze() (for a shallow freeze)
 * - structuredClone() (to create a deep copy)
 *
 * update-array-test.ts - test performance
 */


/**
 * Update array object by id using filter
 * @param arr
 * @param obj
 */
export const updateArrayById_filter = <T extends { id: number | string }>(arr: Array<T>, obj: T): T[] => {
    return arr.filter(f => f.id !== obj.id)
}

/**
 * Update array object by id using map
 * @param arr
 * @param obj
 */
export const updateArrayById_map
    = <T extends { id: number | string }>(arr: Array<T>, obj: T): T[] => {
    return arr.map((item) => item.id === obj.id ? obj : item)
}

/**
 * Update array object by id using for loop
 * @param arr
 * @param obj
 */
export const updateArrayByObjId_for
    = <T extends { id: number | string }>(arr: Array<T>, obj: T): T[] => {
    const newArray: Array<T> = []
    for (const item of arr) {
        if (item.id === obj.id) {
            newArray.push(obj)
        } else {
            newArray.push(item)
        }
    }
    return newArray
}

/**
 * Update array object by id using reduce
 * @param arr
 * @param obj
 */
export const updateArrayByObjId_reduce
    = <T extends { id: number | string }>(arr: Array<T>, obj: T): T[] => {
    return arr.reduce((acc, cur) => {
        if (cur.id === obj.id) {
            acc.push(obj)
        } else {
            acc.push(cur)
        }
        return acc
    }, [] as T[])
}

/**
 * Update array object by id using slice + concat
 * @param arr
 * @param obj
 */
export const updateArrayByIdFindIndex
    = <T extends { id: number | string }>(arr: Array<T>, obj: T): T[] => {
    const index = arr.findIndex(f => f.id === obj.id)
    if (index >= 0) {
        return arr.slice(0, index).concat(obj).concat(arr.slice(index + 1))
    } else {
        return arr.slice(0, arr.length)
    }
}

export const updateArrayByIdFindIndex_splice
    = <T extends { id: number | string }>(arr: Array<T>, obj: T): void => {
    const index = arr.findIndex(f => f.id === obj.id)
    if (index >= 0) {
        arr.splice(index, 1, obj)
    }
}

/**
 * @param arr
 * @param obj
 * @param index
 */
export const updateArrayObjByIndexSliceDest
    = <T extends { id: number | string }>(
    arr: Array<T>,
    obj: T,
    index: number
): T[] => {
    return [
        ...arr.slice(0, index),
        obj,
        ...arr.slice(index + 1)
    ]
}

/**
 * @param arr
 * @param obj
 * @param index
 */
export const updateArrayObjByIndexSliceConcat
    = <T extends { id: number | string }>(
    arr: Array<T>,
    obj: T,
    index: number
): T[] => {
    return arr.slice(0, index).concat(obj).concat(arr.slice(index + 1))
}

