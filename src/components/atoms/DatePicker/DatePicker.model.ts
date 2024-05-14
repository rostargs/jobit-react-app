import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Control, FieldValues, Path } from "react-hook-form";

export type TDatePicker<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T & Path<T>
} & DatePickerProps<Dayjs>;
