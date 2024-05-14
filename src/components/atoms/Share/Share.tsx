// MUI
import { Box, Button, Stack, Typography, styled } from "@mui/material";
// Assets
import man from "assets/images/signupHero.png";

const ShareContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    minHeight: "20rem",
    backgroundImage: `url(${man})`,
    backgroundPosition: "right -4rem bottom 0",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    borderRadius: "0.5rem",
    padding: "1.5rem",
    backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.action.focus,
}));

const ShareTitle = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.h6,
    fontWeight: theme.typography.fontWeightBold,
}));

const Paragraph = styled("p")(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightRegular,
}));

const Share = () => {
    return (
        <ShareContainer spacing={2}>
            <Stack spacing={0.5}>
                <ShareTitle component="h6">Invite Friends</ShareTitle>
                <Paragraph>
                    Invite your friends and <br /> earn referal bonus from us.
                </Paragraph>
            </Stack>
            <Box>
                <Button variant="contained">Invite Now</Button>
            </Box>
        </ShareContainer>
    );
};

export default Share;
