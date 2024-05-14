// MUI
import { BadgeProps } from "@mui/material";

export type TNavBadge = {
    to?: string;
    children: JSX.Element;
    name: string;
    onClick?: () => void;
    disabled?: boolean;
} & BadgeProps;

export type TBadgeLinkProps = {
    disabled?: boolean;
}
