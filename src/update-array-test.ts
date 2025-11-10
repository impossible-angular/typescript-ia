import { performancePercent } from './shared.ts'
import {
    updateArrayById_filter,
    updateArrayById_map,
    updateArrayByIdFindIndex, updateArrayByIdFindIndex_splice,
    updateArrayByObjId_for, updateArrayByObjId_reduce,
    updateArrayObjByIndexSliceConcat,
    updateArrayObjByIndexSliceDest
} from './update-array.ts'


/**
 * Test performance of array functions
 */

const ARRAY_SIZE = 100000
const ARRAY_STEP = 20
const RUN_TIMES = ARRAY_SIZE / ARRAY_STEP

type Item = {
    id: number | string
    name: string
    items: Array<Item>
}

type IndexKey = { [key: string | number]: number }

const generateArray = (count: number): Item[] => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push({id: 'id-' + i, name: i.toString(), items: [{id: i, name: i.toString(), items: []}]} as Item)
    }
    return result
}

const generateIndexMap = (arr: Item[]): IndexKey => {
    let perfTime = performance.now()
    const indexMap = arr.reduce((acc: IndexKey, item: Item, index: number) => {
        acc[item.id] = index
        return acc
    }, {})
    perfTime = performance.now() - perfTime
    consoleSpeed('create [key: value]:index one time................ ', perfTime)
    return indexMap
}

const newObj = (index: number): Item => {
    return {id: 'id-' + index, name: 'A'.repeat(index), items: []} as Item
}

const consoleSpeed = (str: string, speed: number) => {
    // console.warn(str, Math.round(speed * 100) / 100, 'ms')
    console.warn(str, speed.toFixed(2), 'ms')
}

const runTest = (fn: any, arraySize: number, arrayStep: number) => {
    let timePerf = performance.now()
    for (let i = 0; i < arraySize; i += arrayStep) {
        fn(newObj(i))
    }
    timePerf = performance.now() - timePerf
    return timePerf
}

export const updateArrayTest = async () => {
    console.warn('Array update performance test')
    console.warn('Array size: ', ARRAY_SIZE, 'Update times: ', RUN_TIMES)

    const arr: Array<Item> = generateArray(ARRAY_SIZE)
    // Using [key: value]:index to find index from key property of array
    let indexMap = generateIndexMap(arr)

    let findIndexByKey: (obj: Item) => number =
        (obj: Item) => indexMap[obj.id] ?? -1
    const timeFindIndexKey = runTest(findIndexByKey, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed(`performance: find index by Index Key ${RUN_TIMES} times... `, timeFindIndexKey)

    let findIndexByFunc: (obj: Item) => number =
        (obj: Item) => arr.findIndex(f => f.id === obj.id)
    const timeFindIndexFunc = runTest(findIndexByFunc, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed(`performance: find index by findIndex ${RUN_TIMES} times... `, timeFindIndexFunc)
    console.warn(`Index Key (not include index creation) vs findIndex .......... ${performancePercent(timeFindIndexKey, timeFindIndexFunc)}%, `)
    console.warn()

    let updateObjSliceDest: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayObjByIndexSliceDest(arr, obj, findIndexByFunc(obj))
    const timeSliceDest = runTest(updateObjSliceDest, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .slice .destructing  ....... ', timeSliceDest)

    let updateObjSliceConcat: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayObjByIndexSliceConcat(arr, obj, findIndexByFunc(obj))
    const timeSliceConcat = runTest(updateObjSliceConcat, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .slice .concat ............. ', timeSliceConcat)
    console.warn(`(...)destructing vs .concat  ......... ${performancePercent(timeSliceDest, timeSliceConcat)}%, `)
    console.warn()

    let updateObjSplice: (obj: Item) => void =
        (obj: Item) => updateArrayByIdFindIndex_splice(arr, obj)
    const timeSplice = runTest(updateObjSplice, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .splice ..................... ', timeSplice)

    let updateObjFindIndex: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayByIdFindIndex(arr, obj)
    const timeObjFindIndex = runTest(updateObjFindIndex, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .findIndex .slice .concat ... ', timeObjFindIndex)

    let updateObjMap: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayById_map(arr, obj)
    const timeObjMap = runTest(updateObjMap, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .map ........................ ', timeObjMap)

    let updateObjFilter: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayById_filter(arr, obj)
    const timeObjFilter = runTest(updateObjFilter, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .filter ..................... ', timeObjFilter)

    let updateObjFor: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayByObjId_for(arr, obj)
    const timeObjFor = runTest(updateObjFor, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .for ........................ ', timeObjFor)

    let updateObjReduce: (obj: Item) => Array<Item> =
        (obj: Item) => updateArrayByObjId_reduce(arr, obj)
    const timeObjReduce = runTest(updateObjReduce, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .reduce ..................... ', timeObjReduce)

    // let timeClone = performance.now()
    // const arrClone = structuredClone(arr)
    // timeClone = performance.now() - timeClone
    // consoleSpeed('performance structuredClone one time..... ', timeClone)

    console.warn()
    console.warn('[.findIndex .slice .concat] compare to others (+):faster (-):slower')
    console.warn(`.splice ......................... ${performancePercent(timeObjFindIndex, timeSplice)}%, `)
    console.warn(`.map ............................ ${performancePercent(timeObjFindIndex, timeObjMap)}%, `)
    console.warn(`.filter ......................... ${performancePercent(timeObjFindIndex, timeObjFilter)}%, `)
    console.warn(`.for ............................ ${performancePercent(timeObjFindIndex, timeObjFor)}%, `)
    console.warn(`.reduce ......................... ${performancePercent(timeObjFindIndex, timeObjReduce)}%, `)
}

await updateArrayTest()
