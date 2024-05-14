// React
import { createContext } from "react";
// Models
import { TNestedListContext, TNestedListProvider } from "./EditableDetailSection.model";
// Hook Form
import { useFieldArray, useFormContext } from "react-hook-form";

export const NestedListContext = createContext<TNestedListContext | null>(null);

const NestedListProvider = ({ children, currentIndex }: TNestedListProvider) => {
    const { control } = useFormContext();
    const path = `details[${currentIndex}].content`;
    const methods = useFieldArray({ control, name: path });

    return <NestedListContext.Provider value={{ name: path, ...methods }}>{children}</NestedListContext.Provider>;
};

export default NestedListProvider;
