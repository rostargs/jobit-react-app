// MUI
import { AppBar, Container, Toolbar, Stack, styled } from "@mui/material";
// Components
import AdvancedSearch from "components/molecules/AdvancedSearch/AdvancedSearch";
// React
import { useLayoutEffect, useRef, useState } from "react";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import UserConsole from "components/molecules/UserConsole/UserConsole";
// Data
import { appHeaderNavBadges } from "data/appHeaderNavBadges";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import NavButton from "components/atoms/NavButton/NavButton";

const HeaderToolbar = styled(Toolbar)({
    minHeight: "none",
    paddingBlock: "1rem",
});

const AppHeader = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLHeadElement>(null);
    const { currentUser } = useAppSelector((state: RootState) => state.user);

    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.clientHeight);
        }
    }, []);

    const renderNavBadges = appHeaderNavBadges.map((badge, index) => (
        <NavBadge {...badge} key={index}>
            {badge.children}
        </NavBadge>
    ));

    return (
        <AppBar position="sticky" elevation={1} color="inherit" component="header" ref={headerRef}>
            <HeaderToolbar disableGutters>
                <Container maxWidth="xxl">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <AdvancedSearch headerHeight={headerHeight} />
                        <Stack direction="row" gap={2} alignItems="center">
                            {renderNavBadges}
                            {currentUser ? (
                                <UserConsole />
                            ) : (
                                <NavButton path="/auth/login" text="Login / Signup" variant="contained" />
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </HeaderToolbar>
        </AppBar>
    );
};

export default AppHeader;
