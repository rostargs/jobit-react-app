// MUI
import { ButtonProps } from "@mui/material";

export type TNavButton = {
    path?: string;
    text: string;
    nestedButtons?: Omit<TNavButton, "nestedButtons">[];
} & ButtonProps;

export type TNavNestedButtons = {
    isOpened: boolean;
} & Required<Pick<TNavButton, "nestedButtons">>;
