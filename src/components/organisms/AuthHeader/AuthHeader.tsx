// MUI
import { AppBar, Toolbar, Stack, styled, List } from "@mui/material";
// Components
import Logo from "components/atoms/Logo/Logo";
import NavButton from "components/atoms/NavButton/NavButton";
import NavItem from "components/atoms/NavItem/NavItem";
// Data
import { authNavButtons, authNavigation } from "data/authNavigation";

const AppToolbar = styled(Toolbar)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const NavItems = styled(List)(({ theme }) => ({
    zIndex: theme.zIndex.tooltip,
}));

const AuthHeader = () => {
    const renderNavigation = authNavigation.map((nav) => {
        return (
            <NavItems key={nav.text}>
                <NavItem {...nav} />
            </NavItems>
        );
    });

    const renderButtons = authNavButtons.map((button, index) => <NavButton {...button} key={index} />);

    return (
        <AppBar position="static" elevation={0} color="transparent">
            <AppToolbar disableGutters>
                <Stack direction="row" alignItems="center" spacing={{ lg: 8, sm: 2 }} component="nav">
                    <Logo />
                    {renderNavigation}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center">
                    {renderButtons}
                </Stack>
            </AppToolbar>
        </AppBar>
    );
};

export default AuthHeader;
