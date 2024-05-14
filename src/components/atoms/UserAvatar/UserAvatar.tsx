// MUI
import { Avatar, Badge, Stack, Typography, styled } from "@mui/material";
// Router
import { Link } from "react-router-dom";
// Model
import { TEditableUserAvatar, TUserAvatar } from "./UserAvatar.model";
// Assets
import edit from "assets/images/edit.svg";
import maleUser from "assets/images/maleUser.svg";
// Utils
import { cutString } from "utils/cutString";
// Constatns
const MAX_USER_NAME_WIDTH = 9;

const Photo = styled(Avatar, { shouldForwardProp: (prop) => prop !== "isEditable" })<TEditableUserAvatar>(
    ({ theme, isEditable }) => ({
        position: "relative",
        width: 88,
        height: 88,
        "&:before": {
            content: "''",
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "33%",
            backgroundColor: theme.palette.mode === "light" ? theme.palette.action.active : theme.palette.action.disabled,
            opacity: 0,
            transition: `all ${theme.transitions.duration.short}ms ease-in`,
        },
        "&:after": {
            content: "''",
            position: "absolute",
            backgroundImage: `url(${edit})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "calc(100% / 5)",
            height: "calc(100% / 5)",
            bottom: "calc(100% / 20)",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            transition: `all ${theme.transitions.duration.short}ms ease-in`,
        },
        "&:hover": isEditable && {
            "&:after": {
                opacity: 1,
            },
            "&:before": {
                opacity: 1,
            },
        },
    })
);

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: theme.palette.success.main,
        width: "1rem",
        height: "1rem",
        borderRadius: "50%",
    },
}));

const UserAvatar = ({
    withActiveDot = false,
    withGreeting = false,
    userName,
    avatar = maleUser,
    to = "#",
    onClickAvatar,
    isEditable = false,
    ...props
}: TUserAvatar) => {
    const modifiedUserName = cutString(userName, MAX_USER_NAME_WIDTH);
    return (
        <Stack alignItems="center">
            <Link to={to} style={{ color: "unset" }} onClick={onClickAvatar}>
                <StyledBadge
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    invisible={!withActiveDot}
                >
                    <Photo src={avatar} {...props} isEditable={isEditable}>
                        {userName}
                    </Photo>
                </StyledBadge>
            </Link>
            {withGreeting && (
                <Typography component="h5" variant="h6" fontWeight="medium" marginBlock={1}>
                    Hello, {modifiedUserName}
                </Typography>
            )}
        </Stack>
    );
};

export default UserAvatar;
