// MUI
import { Box, Button, ClickAwayListener, Fade, Paper, styled } from "@mui/material";
// Router
import { NavLink } from "react-router-dom";
// Model
import { TNavButton, TNavNestedButtons } from "./NavButton.model";
// Hooks
import { useToggle } from "hooks/useToggle";
// React
import { MouseEvent, memo } from "react";
// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const NestedList = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "110%",
    zIndex: theme.zIndex.appBar,
    padding: "0.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
}));

const NestedButtonsList = ({ isOpened, nestedButtons }: TNavNestedButtons) => {
    const renderNestedButtons = nestedButtons.map((item, index) => (
        <NavButton {...item} key={index} sx={{ textWrap: "nowrap" }} variant="outlined" />
    ));
    return (
        <Fade in={isOpened}>
            <NestedList elevation={5}>{renderNestedButtons}</NestedList>
        </Fade>
    );
};

const NavButton = ({ text, path, nestedButtons, variant = "outlined", ...rest }: TNavButton) => {
    const { active, onSetToNegative, onToggle } = useToggle(false);

    const isButtonLink = !!path?.length;
    const endAdornment = nestedButtons ? active ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null;

    const onClickNavButton = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!isButtonLink || nestedButtons) event.preventDefault();
        nestedButtons && onToggle();
    };

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <Box position="relative" display="flex" justifyContent="flex-end">
                <NavLink to={path ?? "#"} onClick={onClickNavButton} style={{ width: "100%" }}>
                    {({ isActive }) => (
                        <Button
                            variant={isButtonLink && isActive ? "contained" : variant}
                            endIcon={endAdornment}
                            fullWidth
                            {...rest}
                        >
                            {text}
                        </Button>
                    )}
                </NavLink>
                {nestedButtons && <NestedButtonsList isOpened={active} nestedButtons={nestedButtons} />}
            </Box>
        </ClickAwayListener>
    );
};

export default memo(NavButton);
