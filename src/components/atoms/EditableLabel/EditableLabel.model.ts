// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";
// MUI
import { TextFieldProps } from "@mui/material";

export type TEditableLabel<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
} & TextFieldProps;
