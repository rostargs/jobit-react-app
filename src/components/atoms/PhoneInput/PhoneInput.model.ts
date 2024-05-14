// Hook Form
import { Control, FieldValues, Path } from "react-hook-form";

export type TPhoneInput<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T & Path<T>;
    helperText?: string;
    label: string;
};
