import {consoleSpeed, generateArray, type Item, runTest} from "./shared.ts";
import {sortByDateTime, sortByStringTime} from "./sort-array.ts";

const ARRAY_SIZE = 100000
const ARRAY_STEP = 20
const RUN_TIMES = ARRAY_SIZE / ARRAY_STEP

export const sortArrayTest = async () => {
    console.warn('Array update performance test')
    console.warn('Array size: ', ARRAY_SIZE, 'Update times: ', RUN_TIMES)

    const arr: Array<Item> = generateArray(ARRAY_SIZE)

    let sortNumber: () => void =
        () => arr.sort(sortByDateTime('dateTime'))
    const sNumber = runTest(sortNumber, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .sort number ..................... ', sNumber)

    let sortString: () => void =
        () => arr.sort(sortByStringTime('dateTime'))
    const sStringDate = runTest(sortString, ARRAY_SIZE, ARRAY_STEP)
    consoleSpeed('performance .sort string to date ............. ', sStringDate)
}

await sortArrayTest()