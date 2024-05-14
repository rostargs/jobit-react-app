// MUI
import { OutlinedInputProps } from "@mui/material";
// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";

export type TFormInput<T extends FieldValues> = {
    isVisiblePassword?: boolean;
    onTogglePassword?: (label: string) => void;
    control: Control<T>;
} & TBaseFormInputProps<T>;

export type TBaseFormInputProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    helperText?: string;
} & OutlinedInputProps;
