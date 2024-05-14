export const checkFileFormat = (file: File, acceptableFormats: string[]): boolean => {
    return acceptableFormats.some((format) => file.type.includes(format));
};
