// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";
// MUI
import { InputBaseProps } from "@mui/material";
import { ComponentProps } from "react";

export type TEditableListItem<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    onDelete: (id: number) => void;
    index: number;
    baseInputProps?: InputBaseProps;
    listItemProps?: ComponentProps<"li">;
    hideVerifiedIcon?: boolean;
};

export type TStyledListItemProps = {
    isError: boolean;
};

export type TErrorState = {
    message?: string;
};
