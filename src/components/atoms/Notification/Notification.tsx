// MUI
import { Box, Button, ButtonGroup, Card, CardContent, Typography, styled } from "@mui/material";
// MUI Icons
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
// Components
import NavBadge from "../NavBadge/NavBadge";
import Image from "../Image/Image";
// Assets
import test from "assets/images/companies/Company-7.svg";
// Router
import { Link } from "react-router-dom";
// Models
import { TNotification, TNotificationVariantsKeys } from "./Notification.model";

const NotificationCard = styled(Card)(({ theme }) => ({
    position: "relative",
    width: "100%",
    transition: "background-color 0.25s ease",

    "&:hover > #controls": {
        visibility: "visible",
        opacity: 1,
    },

    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledCardContent = styled(CardContent)({
    display: "flex",
    gap: "1rem",

    "&:last-child": {
        paddingBottom: "1rem",
    },
});

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
}));

const Dot = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
}));

const NotificationControls = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    position: "absolute",
    right: "0.5rem",
    bottom: "0.5rem",
    visibility: "hidden",
    opacity: 0,
    transition: "all 0.25s ease-in-out",
});

const Message = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
}));

const ViewVariant = () => {
    return (
        <>
            <Message>
                <b>Hamish Marsh</b> viewed your profile
            </Message>
            <StyledLink to="#">View Profile</StyledLink>
        </>
    );
};

const AppliedVariant = () => {
    return (
        <>
            <Message>
                <b>Congratulations!</b> You're applied on the position of Frontend Developer.
            </Message>
            <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2" component="span">
                    Applied on 10.06.2024
                </Typography>
            </Box>
        </>
    );
};

const RejectedVariant = () => {
    return (
        <>
            <Message>
                <b>Sorry 😒.</b> Your application was rejected.
            </Message>
            <Box display="flex" alignItems="center" gap={1}>
                <SmsFailedIcon color="warning" />
                <Typography variant="body2" component="span">
                    Rejected on 10.06.2024
                </Typography>
            </Box>
        </>
    );
};

const VacancyVariant = () => {
    return (
        <>
            <Message>
                <b>Rostislav Savelko</b> applied for the vacancy
            </Message>
            <ButtonGroup sx={{ marginTop: "0.25rem", maxWidth: "300px" }} fullWidth size="small">
                <Button color="success">Apply</Button>
                <Button color="warning">Reject</Button>
            </ButtonGroup>
        </>
    );
};

const MessageVariant = () => {
    return (
        <>
            <Message>
                <b>Rostik Savelko</b> sent you a message
            </Message>
            <Typography variant="body2" component="p" color="text.secondary">
                <b>Message:</b> "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus provident est ullam
                labore officiis, commodi quo, quas nihil quia corrupti, culpa earum voluptas recusandae corporis! Eaque id
                expedita quis sint, culpa pariatur."
            </Typography>
            <StyledLink to="#">Reply</StyledLink>
        </>
    );
};

const Notification = ({ variant }: TNotification) => {
    const notificationVariants: Record<TNotificationVariantsKeys, JSX.Element> = {
        view: <ViewVariant />,
        applied: <AppliedVariant />,
        rejected: <RejectedVariant />,
        vacancy: <VacancyVariant />,
        message: <MessageVariant />,
    };

    const currentVariant = notificationVariants[variant];

    return (
        <NotificationCard elevation={2}>
            <StyledCardContent>
                <Box display="flex" alignItems="flex-start">
                    <Image src={test} width={48} height={48} />
                </Box>
                <Box>{currentVariant} </Box>
            </StyledCardContent>
            <Dot />
            <NotificationControls id="controls">
                <NavBadge name="Mark as read" invisible>
                    <MarkChatReadIcon color="action" />
                </NavBadge>
                <NavBadge name="Delete notification" invisible>
                    <DeleteIcon color="error" />
                </NavBadge>
            </NotificationControls>
        </NotificationCard>
    );
};

export default Notification;
