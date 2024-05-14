// React
import { ReactNode } from "react";
// Hook Form
import { FieldValues, UseFieldArrayRemove, UseFieldArrayReturn } from "react-hook-form";

export type TNestedList = {
    currentIndex: number;
};

export type TNestedListContext = {
    name: string;
} & UseFieldArrayReturn<FieldValues, string, "id">;

export type TNestedListProvider = {
    children: ReactNode;
    currentIndex: number;
};

export type TEditableDetailSection = UseFieldArrayReturn<FieldValues, "details", "id">;

export type TEditableDetailSectionControls = {
    onRemoveSection: UseFieldArrayRemove;
};
