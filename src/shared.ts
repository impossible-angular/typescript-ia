export type Item = {
    id: number | string
    name: string
    dateTime?: number
    dateTimeS?: string
    items: Array<Item>
}

/**
 * performance in percentage
 *
 * Example: process1 = 10ms, process2 = 15ms
 * - performancePercent(10, 15) => 50; process1 50% faster than process2
 * - performancePercent(9, 10) => -11; process1 11% slower then process2
 *
 * @param mainProcess - time for main process
 * @param secondProcess - time for second process
 * @returns percentage - (+) process1 faster (-) process1 slower
 */
export const performancePercent = (mainProcess: number, secondProcess: number): number => {
    const smallerNum = mainProcess < secondProcess ? mainProcess : secondProcess
    return Math.round(((secondProcess - mainProcess) / smallerNum) * 100)
}

export const consoleSpeed = (str: string, speed: number) => {
    // console.warn(str, Math.round(speed * 100) / 100, 'ms')
    console.warn(str, speed.toFixed(2), 'ms')
}

export const generateArray = (count: number): Item[] => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push({
            id: 'id-' + i,
            name: i.toString(),
            dateTime: Date.now(),
            dateTimeS: Date.now().toString(),
            items: [{id: i, name: i.toString(), items: []}],
        }  satisfies Item)
    }
    return result
}

const newObj = (index: number): Item => {
    return {id: 'id-' + index, name: 'A'.repeat(index), items: []} as Item
}

export const runTest = (fn: any, arraySize: number, arrayStep: number) => {
    let timePerf = performance.now()
    for (let i = 0; i < arraySize; i += arrayStep) {
        fn(newObj(i))
    }
    timePerf = performance.now() - timePerf
    return timePerf
}
