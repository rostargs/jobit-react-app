// MUI
import { ListItem, ListItemButton, Typography, Box, styled } from "@mui/material";
// Router
import { NavLink } from "react-router-dom";
// MUI Icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// React
import { MouseEvent, memo } from "react";
// Model
import { TListButtonProps, TNavIcon } from "./NavIcon.model";
// Components
import NavIconList from "components/molecules/NavIconList/NavIconList";
// Hooks
import { useToggle } from "hooks/useToggle";

const ListButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== "isActive" && prop !== "isHasChildren",
})<TListButtonProps>(({ theme, isActive, isHasChildren }) => ({
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    color: isActive
        ? theme.palette.primary.main
        : theme.palette.mode === "light"
        ? theme.palette.grey[800]
        : theme.palette.grey[500],
    backgroundColor: !isHasChildren
        ? isActive
            ? theme.palette.mode === "light"
                ? theme.palette.primary.light
                : theme.palette.action.focus
            : "none"
        : "none",
}));

const Label = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
    textWrap: "nowrap",
}));

const NavIcon = ({ to = "-", root = false, startAdornment, label, children, onClickIcon, manualActive }: TNavIcon) => {
    const { active, onToggle } = useToggle(false);

    const isHasChildren = !!children?.length;
    const textMargin = startAdornment ? 1 : 4;

    const onHandleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (root || onClickIcon) event.preventDefault();
        if (children) onToggle();
        onClickIcon?.();
    };

    return (
        <>
            <ListItem disablePadding disableGutters>
                <NavLink to={to} onClick={onHandleClick} style={{ width: "100%" }}>
                    {({ isActive }) => (
                        <ListButton isActive={manualActive || isActive} isHasChildren={isHasChildren}>
                            {startAdornment}
                            <Label component="h6" marginLeft={textMargin}>
                                {label}
                            </Label>
                            <Box display="flex" alignItems="center" marginLeft="auto">
                                {isHasChildren ? active ? <ExpandLess /> : <ExpandMore /> : null}
                            </Box>
                        </ListButton>
                    )}
                </NavLink>
            </ListItem>
            {isHasChildren && <NavIconList children={children} isOpen={active} />}
        </>
    );
};

export default memo(NavIcon);
