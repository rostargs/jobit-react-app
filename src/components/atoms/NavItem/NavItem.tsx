// MUI
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
// Model
import { TNavItem } from "./NavItem.model";
// Router
import { Link } from "react-router-dom";
// Components
import Dropdown from "components/molecules/Dropdown/Dropdown";
// MUI Icons
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Hooks
import { useToggle } from "hooks/useToggle";
// React
import { memo } from "react";

const ListLink = styled(Link)({
    color: "unset",
    flex: "1 1 0",
});

const ListButton = styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.black,
}));

const ItemText = styled(ListItemText)(({ theme }) => ({
    ...theme.typography.body1,
    color: "inherit",
    "& > span": {
        fontWeight: theme.typography.fontWeightMedium,
        whiteSpace: "nowrap",
    },
}));

const EndAdornment = styled(ListItemIcon)({
    justifyContent: "flex-end",
    color: "inherit",
});

const NestedList = styled(List)({
    position: "unset",
});

const NavItem = ({ to, text, children, depthLevel = 0 }: TNavItem) => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);

    const isHasPath = to || "#";
    const isHasChildren = !!children?.length;
    const endAdornment = isHasChildren ? active ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null;

    return (
        <ListItem onMouseEnter={onSetToPositive} onMouseLeave={onSetToNegative} disablePadding>
            <ListLink to={isHasPath}>
                <ListButton>
                    <ItemText primary={text} />
                    <EndAdornment>{endAdornment}</EndAdornment>
                </ListButton>
            </ListLink>
            {isHasChildren && (
                <NestedList>{<Dropdown depthLevel={depthLevel} links={children} isOpen={active} />}</NestedList>
            )}
        </ListItem>
    );
};

export default memo(NavItem);
