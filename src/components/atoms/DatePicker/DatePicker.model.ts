// MUI
import { DatePickerProps } from "@mui/x-date-pickers";
// Dayjs
import { Dayjs } from "dayjs";
// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";

export type TDatePicker<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T & Path<T>;
    helperText?: string;
} & DatePickerProps<Dayjs>;
