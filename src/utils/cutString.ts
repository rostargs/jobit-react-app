export const cutString = (str: string, maxStringLength: number): string => {
    if (str.length <= maxStringLength) return str;
    return `${str.substring(0, maxStringLength).trim()}...`;
};
