export const sortByStringTime =
    <T>(key: keyof T, isDesc = false) =>
        (a: T, b: T) => {
            const timeA = new Date(a[key] as never).getTime();
            const timeB = new Date(b[key] as never).getTime();
            return isDesc ? timeB - timeA : timeA - timeB;
        };

export const sortByDateTime =
    <T>(key: keyof T, isDesc = false) =>
        (a: T, b: T) => {
            return isDesc ? (b[key] as never ?? Infinity) - (a[key] as never ?? Infinity)
                : (a[key] as never ?? Infinity) - (b[key] as never ?? Infinity);
        };
