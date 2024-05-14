import { TypographyOptions, Typography } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles/createTypography" {
    interface TypographyOptions {
        fontWeightSemiBold?: number;
    }

    interface Typography {
        fontWeightSemiBold: number;
    }
}
