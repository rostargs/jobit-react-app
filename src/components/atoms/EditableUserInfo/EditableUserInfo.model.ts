import { InputBaseProps } from "@mui/material";
import { Control, FieldValues, Path } from "react-hook-form";

export type TEditableUserInfo<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T & Path<T>;
    label: string;
} & InputBaseProps;
