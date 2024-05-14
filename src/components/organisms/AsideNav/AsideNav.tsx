// MUI
import { Box, Paper, Stack, styled, List } from "@mui/material";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Components
import Logo from "components/atoms/Logo/Logo";
import NavIcon from "components/atoms/NavIcon/NavIcon";
import Share from "components/atoms/Share/Share";
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
// Data
import { asideNavigation } from "data/asideNavigation";

const NavContainer = styled(Paper<"aside">)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0.5rem",
    borderRadius: 0,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        width: 0,
    },
});

const LinksContainer = styled(List)({
    marginTop: "1.5rem",
});

const AsideNav = () => {
    const { currentUser } = useAppSelector((state: RootState) => state.user);
    const renderAsideLinks = asideNavigation.map((nav, index) => <NavIcon {...nav} key={index} />);
    return (
        <NavContainer component="aside">
            <Stack justifyContent="center">
                <Logo />
            </Stack>
            <Box marginBlock={4}>
                {currentUser && <UserAvatar userName='default' withGreeting withActiveDot />}
            </Box>
            <LinksContainer>{renderAsideLinks}</LinksContainer>
            <Box marginTop="auto">
                <Share />
            </Box>
        </NavContainer>
    );
};

export default AsideNav;
