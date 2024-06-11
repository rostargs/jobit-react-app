// MUI
import { styled, Paper, Grid, Divider, Box, Typography, IconButton } from "@mui/material";
// MUI Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import Viewer from "components/molecules/Viewer/Viewer";
import FormInput from "components/atoms/FormInput/FormInput";
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Redux
import { extendedMessangerFirebaseApi } from "app/slices/messangerSlice";
import { useAppDispatch } from "app/hooks";
// React
import { useEffect } from "react";
// Assets
import emptyMail from "assets/images/errors/sadMail.svg";

const ChatCard = styled(Paper)({
    boxShadow: "none",
    borderRadius: "0px 0.5rem 0.5rem 0px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
});

const MessagesContainer = styled(Box)({
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: 0,
    },
});

const Control = styled(Paper)(({ theme }) => ({
    zIndex: theme.zIndex.appBar,
    boxShadow: "none",
    position: "sticky",
    bottom: 0,
    marginTop: "auto",
}));

const Hint = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.grey[400],
    textAlign: "end",
    marginTop: "0.5rem",
}));

const sendMessageSchema = z.object({
    message: z.string().trim().min(1).max(256),
});

type TSendMessageSchemaType = z.infer<typeof sendMessageSchema>;

const Contributor = () => {
    return (
        <Grid paddingInline={2} paddingBlock={1} container alignItems="center">
            <Grid item xs={11}>
                <Viewer variant="full" buttonText="View profile" />
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="center">
                <NavBadge name="More" invisible>
                    <MoreHorizIcon />
                </NavBadge>
            </Grid>
        </Grid>
    );
};

const ChatControls = () => {
    const { control, handleSubmit } = useForm<TSendMessageSchemaType>({
        resolver: zodResolver(sendMessageSchema),
        mode: "onChange",
    });

    const onSendMessage: SubmitHandler<TSendMessageSchemaType> = async (data) => {
        console.log(data);
    };

    return (
        <Box paddingInline={2} paddingBlock={1}>
            <Box>
                <form autoComplete="off" onSubmit={handleSubmit(onSendMessage)}>
                    <FormInput
                        control={control}
                        placeholder="Write a message"
                        name="message"
                        type="text"
                        endAdornment={
                            <IconButton disableRipple type="submit">
                                <SendIcon />
                            </IconButton>
                        }
                        sx={{ borderRadius: "8px" }}
                        multiline
                        maxRows={3}
                    />
                </form>
            </Box>
            <Hint component="p">Press Enter or 📩 to Send Message</Hint>
        </Box>
    );
};

const MessagesList = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(extendedMessangerFirebaseApi.endpoints.getRoomInfo.initiate({ roomId: "" }));
    }, []);

    return (
        <>
            {/* <Message variant="incoming" />
                <Message variant="outgoing" />
                <Message variant="incoming" />
                <Message variant="outgoing" />
                <Message variant="outgoing" />
                <Message variant="outgoing" />
                <Message variant="outgoing" />
                <Message variant="outgoing" /> */}
            <ErrorNotification image={emptyMail} errorMessage="There are no messages yet 😒." width={220} />
        </>
    );
};

const Chat = () => {
    return (
        <ChatCard>
            <Contributor />
            <Divider />
            <MessagesContainer>
                <MessagesList />
            </MessagesContainer>
            <Control>
                <Divider />
                <ChatControls />
            </Control>
        </ChatCard>
    );
};

export default Chat;
