// MUI
import { Box, Typography, styled } from "@mui/material";
// Components
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
// Models
import { TMessage, TMessageVariants } from "./Message.model";

const MessageCard = styled(Box, { shouldForwardProp: (prop) => prop !== "variant" })<{ variant: TMessageVariants }>(
    ({ theme, variant }) => ({
        padding: "1rem",
        display: "flex",
        gap: "1rem",
        borderRadius: variant === "outgoing" ? "1rem 1rem 1rem 0px" : "1rem 1rem 0px 1rem",
        backgroundColor: variant === "outgoing" ? theme.palette.primary.light : theme.palette.grey[100],
        width: "90%",
    })
);

const Date = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.body2,
    fontSize: 10,
    color: theme.palette.grey[500],
}));

const Message = ({ variant }: TMessage) => {
    const messagePosition = variant === "incoming" ? "flex-end" : "flex-start";
    return (
        <Box display="flex" justifyContent={messagePosition}>
            <MessageCard variant={variant}>
                <UserAvatar userName="John" sx={{ width: 48, height: 48 }} />
                <Box>
                    <Typography variant="body2" component="p" color="black">
                        Keeping this in mind, Grameenphone always brings future-proof technology in order to facilitate your
                        progress.
                    </Typography>
                    <Date component="span">May 21, 2020, 7:51 PM</Date>
                </Box>
            </MessageCard>
        </Box>
    );
};

export default Message;
