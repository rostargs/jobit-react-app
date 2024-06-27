// Model
import { TViewer, TViewerCardProps, TViewerVariantProps, TViewerVariants } from "./Viewer.model";
import { CandidateStatus } from "models/company.model";
// MUI
import { Box, Button, ButtonGroup, Card, CardContent, Typography, styled } from "@mui/material";
// MUI Icons
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GppBadIcon from "@mui/icons-material/GppBad";
// Router
import { Link } from "react-router-dom";
// Components
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
import NavBadge from "components/atoms/NavBadge/NavBadge";
// Redux
import { useReplyToVacancyMutation } from "app/slices/userSlice";

const ViewerCard = styled(Card, { shouldForwardProp: (prop) => prop !== "isOutlined" })<TViewerCardProps>(
    ({ theme, isOutlined }) => ({
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        border: isOutlined ? `0.1px solid ${theme.palette.grey[300]}` : "none",
        width: "100%",
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

const Info = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.grey[600],
    width: "auto",
}));

const VisitViewer = styled(Link)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
}));

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

const VacancyVariant = ({ candidateID, vacancyID, status }: TViewerVariants["vacancy"]) => {
    const [replyToVacancy] = useReplyToVacancyMutation();

    const statusVariants = {
        [CandidateStatus.APPLIED]: (
            <NavBadge name="Applied" invisible>
                <AssignmentTurnedInIcon color="success" />
            </NavBadge>
        ),
        [CandidateStatus.REJECTED]: (
            <NavBadge name="Rejected" invisible>
                <GppBadIcon color="error" />
            </NavBadge>
        ),
    };

    return (
        <Box display="flex" position="absolute" right={16}>
            {status ? (
                statusVariants[status]
            ) : (
                <ButtonGroup>
                    <Button
                        color="success"
                        onClick={async () =>
                            await replyToVacancy({ candidateID, vacancyID, status: CandidateStatus.APPLIED })
                        }
                    >
                        Apply
                    </Button>
                    <Button
                        color="warning"
                        onClick={async () =>
                            await replyToVacancy({ candidateID, vacancyID, status: CandidateStatus.REJECTED })
                        }
                    >
                        Deny
                    </Button>
                </ButtonGroup>
            )}
        </Box>
    );
};

const Viewer = ({
    outlined = false,
    variant,
    buttonText,
    uid,
    companyName,
    position,
    domen,
    logo,
    avatar,
    name,
    ownerName,
    ...rest
}: TViewer) => {
    const getViewerVariant = (props: any) => {
        const viewerVariants = {
            short: <ViewVariant buttonText={buttonText} />,
            full: <MessageVariant buttonText={buttonText} />,
            vacancy: <VacancyVariant {...props} />,
        };
        return viewerVariants[variant];
    };

    const currentVariant = getViewerVariant(rest);

    return (
        <ViewerCard isOutlined={outlined}>
            <ViewerInfo>
                <UserAvatar userName={(companyName || name)!} sx={{ width: 72, height: 72 }} />
            </ViewerInfo>
            <ViewerInfo sx={{ width: "100%" }}>
                <Typography component="h4" variant="subtitle1" fontWeight="medium">
                    {ownerName || name}
                </Typography>
                <Box display="flex" gap={1}>
                    <Info component="p">{companyName || "Unemployed"}</Info>
                    <Info component="p">{domen || position}</Info>
                </Box>
                {currentVariant}
            </ViewerInfo>
        </ViewerCard>
    );
};

export default Viewer;
