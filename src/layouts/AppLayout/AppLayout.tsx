// MUI
import { Box, Container, Stack, styled } from "@mui/material";
// Components
import AsideNav from "components/organisms/AsideNav/AsideNav";
import AppHeader from "components/organisms/AppHeader/AppHeader";
// Router
import { Outlet } from "react-router-dom";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Utils
import { sleep } from "utils/sleep";

const Wrapper = styled(Box)({
    display: "flex",
    height: "100vh",
});

const NavWrapper = styled(Box)(({ theme }) => ({
    minWidth: 271,
    zIndex: theme.zIndex.appBar,
}));

const ContentWrapper = styled(Box<"main">)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[50] : "inherit",
    height: "100dvh",
    paddingBlock: "1rem",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: 0,
    },
}));

const AppLayout = () => {
    const { currentUser, loading } = useAppSelector((state: RootState) => state.user);

    if (loading && !currentUser) sleep(1000);

    return (
        <Wrapper>
            <NavWrapper>
                <AsideNav />
            </NavWrapper>
            <Stack width="100%">
                <AppHeader />
                <ContentWrapper component="main" id="main-content">
                    <Container maxWidth="xxl">
                        <Outlet />
                    </Container>
                </ContentWrapper>
            </Stack>
        </Wrapper>
    );
};

export default AppLayout;
