// MUI
import { createTheme, responsiveFontSizes } from "@mui/material";

const defaultBreakpoins = {
    xs: 320,
    sm: 476,
    md: 764,
    lg: 1024,
    xl: 1204,
    xxl: 1312,
};

const primary = {
    main: "#0049FC",
    light: "#EBF5FF",
};

const success = {
    main: "#13D427",
    light: "#d3f4c2",
};

const appTheme = createTheme({
    typography: {
        fontFamily: ["Outfit"].join(","),
        fontWeightSemiBold: 600,
    },
    palette: {
        mode: "light",
        primary,
        success,
    },
    breakpoints: {
        values: defaultBreakpoins,
    },
});

export default responsiveFontSizes(appTheme);
