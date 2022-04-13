export const debounce = <T extends (...args: any) => any>(
    func: T,
    time: number
): T => {
    let timeout: any;
    return ((...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, time);
    }) as any;
};
