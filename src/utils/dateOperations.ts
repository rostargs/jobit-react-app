export const getYearFromDate = (date: Date): number => {
    return date.getFullYear();
};

export const setDefaultDateByYear = (year: number): Date => {
    return new Date(year, 8, 1);
};

export const formatDate = (date: Date | string | number) => {
    if (typeof date === "number") return date;
    return String((typeof date === "string" ? new Date(date) : date).toLocaleDateString());
};
