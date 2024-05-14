// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";
// MUI
import { RatingProps } from "@mui/material";

export type TRatingInput<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T & Path<T>;
    labels?: Record<number, string>;
    helperText?: string;
} & RatingProps;
