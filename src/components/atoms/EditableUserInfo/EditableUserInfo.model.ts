// MUI
import { InputBaseProps } from "@mui/material";
// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";

export type TEditableUserInfo<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
} & InputBaseProps;
