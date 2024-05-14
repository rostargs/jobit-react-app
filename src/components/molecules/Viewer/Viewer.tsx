// Model
import { TViewer, TViewerCardProps, TViewerVariantProps } from "./Viewer.model";
// MUI
import { Box, Card, CardContent, List, ListItem, Typography, styled } from "@mui/material";
// Router
import { Link } from "react-router-dom";
// Components
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";

const ViewerCard = styled(Card, { shouldForwardProp: (prop) => prop !== "isOutlined" })<TViewerCardProps>(
    ({ theme, isOutlined }) => ({
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        border: isOutlined ? `0.1px solid ${theme.palette.grey[300]}` : "none",
    })
);

const ViewerInfo = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    padding: "0.5rem",
    ":last-child": {
        paddingBottom: "0.5rem",
    },
});

const HardSkillsList = styled(List)({
    display: "flex",
    gap: "0.5rem",
});

const Skill = styled(ListItem)(({ theme }) => ({
    color: theme.palette.grey[600],
    width: "auto",
}));

const VisitViewer = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
}));

const textSkills = ["HR Manager", "Grameenphone"];

const ViewVariant = ({ buttonText = "View Profile" }: TViewerVariantProps) => {
    return <VisitViewer to="#">{buttonText}</VisitViewer>;
};

const MessageVariant = ({ buttonText = "Send message" }: TViewerVariantProps) => {
    return (
        <Box position="absolute" right={16}>
            <VisitViewer to="#">{buttonText}</VisitViewer>
        </Box>
    );
};

const Viewer = ({ outlined = false, variant = "short", buttonText }: TViewer) => {
    const viewerVariants = {
        short: <ViewVariant buttonText={buttonText} />,
        full: <MessageVariant buttonText={buttonText} />,
    };
    const currentVariant = viewerVariants[variant];

    const renderSkills = textSkills.map((skill) => (
        <Skill disableGutters disablePadding key={skill}>
            {skill}
        </Skill>
    ));

    return (
        <ViewerCard isOutlined={outlined}>
            <ViewerInfo>
                <UserAvatar userName="BOB" sx={{ width: 72, height: 72 }} />
            </ViewerInfo>
            <ViewerInfo sx={{ width: "100%" }}>
                <Typography component="h4" variant="subtitle1" fontWeight="medium">
                    Hamish Marsh
                </Typography>
                <HardSkillsList disablePadding>{renderSkills}</HardSkillsList>
                {currentVariant}
            </ViewerInfo>
        </ViewerCard>
    );
};

export default Viewer;
