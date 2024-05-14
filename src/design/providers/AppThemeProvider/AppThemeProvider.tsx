// MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
// Theme
import appTheme from "design/theme/appTheme";
// Model
import { TAppThemeProviderProps } from "./AppThemeProvider.model";

const AppThemeProvider = ({ children }: TAppThemeProviderProps) => {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppThemeProvider;
