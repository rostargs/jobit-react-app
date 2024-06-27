export const removeWhiteSpace = (input: string, spaceCount: number): string => {
    const spaces =
        spaceCount === 0
            ? ""
            : Array.from({ length: spaceCount })
                  .map(() => " ")
                  .join("");

    return input.replace(/\s+/g, spaces);
};
