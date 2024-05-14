// MUI
import { Box, Button, ClickAwayListener, Fade, Paper, Typography, styled } from "@mui/material";
// MUI Icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// Render data
import { userConsoleData } from "data/userConsoleData";
// Components
import NavIcon from "components/atoms/NavIcon/NavIcon";
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
// Hooks
import { useToggle } from "hooks/useToggle";
// Utils
import { cutString } from "utils/cutString";
// Model
import { TConsoleButtonProps } from "./UserConsole.model";
// Constants
const MAX_USER_NAME_WIDTH = 12;

const ConsoleButton = styled(Button, { shouldForwardProp: (prop) => prop !== "isActive" })<TConsoleButtonProps>(
    ({ theme, isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        borderRadius: "2.5rem",
        border: `1px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
    })
);

const UserName = styled(Typography<"p">)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "capitalize",
    ...theme.typography.subtitle2,
}));

const ConsoleNav = styled(Paper)({
    minWidth: "17rem",
    padding: "0.5rem",
    position: "absolute",
    right: 0,
    marginTop: "0.5rem",
});

const UserConsole = () => {
    const { active, onToggle, onSetToNegative } = useToggle(false);

    const modifiedUserName = cutString("Rostyslav Savelko", MAX_USER_NAME_WIDTH);

    const userConsoleOptions = userConsoleData.map((item) => <NavIcon {...item} key={item.label} />);

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <Box position="relative">
                <ConsoleButton onClick={onToggle} isActive={active}>
                    <UserAvatar sx={{ width: 40, height: 40 }} userName="B" />
                    <UserName component="p">{modifiedUserName}</UserName>
                    {active ? <ExpandLess /> : <ExpandMore />}
                </ConsoleButton>
                <Fade in={active}>
                    <ConsoleNav elevation={5}>{userConsoleOptions}</ConsoleNav>
                </Fade>
            </Box>
        </ClickAwayListener>
    );
};

export default UserConsole;
