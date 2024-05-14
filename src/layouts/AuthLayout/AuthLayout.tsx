// MUI
import { Box, Container, styled } from "@mui/material";
// Components
import Companies from "components/molecules/Companies/Companies";
import AuthHeader from "components/organisms/AuthHeader/AuthHeader";
// Router
import { Outlet } from "react-router-dom";

const AuthWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : "unset",
    [theme.breakpoints.down("sm")]: {
        height: "100vh",
    },
}));

const CompaniesContainer = styled(Container)(({ theme }) => ({
    marginTop: "-1.5rem",
    marginBottom: "1.5rem",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const AuthLayout = () => {
    console.log("Auth layout rerendered");

    return (
        <Box>
            <AuthWrapper>
                <Container maxWidth="xxl">
                    <AuthHeader />
                    <Box component="main" paddingTop={6}>
                        <Outlet />
                    </Box>
                </Container>
            </AuthWrapper>
            <CompaniesContainer maxWidth="xxl">
                <Companies />
            </CompaniesContainer>
        </Box>
    );
};

export default AuthLayout;
