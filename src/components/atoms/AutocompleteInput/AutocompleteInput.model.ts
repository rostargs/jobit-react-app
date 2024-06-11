// Hook form
import { Control, FieldValues, Path } from "react-hook-form";
// MUI
import { AutocompleteProps } from "@mui/material";

export type TAutocompleteInput<T extends FieldValues, Y extends Record<string, string>> = {
    name: keyof T & Path<T>;
    label?: string;
    options: Readonly<TAutocompleteInputOpition<Y>[]>;
    optionLabel: keyof Y;
    control: Control<T>;
    helperText?: string;
} & Partial<AutocompleteProps<TAutocompleteInputOpition<Y>, boolean, true, false>>;

export type TAutocompleteInputOpition<T> = Record<keyof T, string | undefined | any>;
