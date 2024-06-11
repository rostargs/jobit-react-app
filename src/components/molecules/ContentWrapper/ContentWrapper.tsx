// MUI
import { Box, Paper, Stack, Typography, styled } from "@mui/material";
// Router
import { Link } from "react-router-dom";
// Models
import { TContentWrapper } from "./ContentWrapper.model";

const Wrapper = styled(Paper)({
    padding: "1rem",
});

const BaseLink = styled(Link)(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    padding: "0.5rem",
    transition: `background-color ${theme.transitions.duration.short}ms`,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const ContentWrapper = ({ children, linkName, to, title }: TContentWrapper) => {
    return (
        <Wrapper>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography component="h5" variant="h5">
                    {title}
                </Typography>
                <BaseLink to={to}>{linkName}</BaseLink>
            </Stack>
            <Box marginTop={2}>{children}</Box>
        </Wrapper>
    );
};

export default ContentWrapper;
