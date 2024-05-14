// MUI
import { Box, Card, CardContent, Typography, styled } from "@mui/material";
// MUI Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// Router
import { Link } from "react-router-dom";
// Model
import { TJobCard, TStyledCardProps } from "./JobCard.model";
// Assets
import logo from "assets/images/companies/Company-7.svg";
// Components
import Image from "../../atoms/Image/Image";

const StyledCard = styled(Card, { shouldForwardProp: (prop) => prop !== "isOutlined" })<TStyledCardProps>(
    ({ theme, isOutlined }) => ({
        boxShadow: "unset",
        display: "flex",
        alignItems: "center",
        border: isOutlined ? `0.1px solid ${theme.palette.grey[300]}` : "none",
    })
);

const Content = styled(CardContent)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    padding: "0.5rem",
    ":last-child": {
        paddingBottom: "0.5rem",
    },
});

const Position = styled(Typography<"h5">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
}));

const CompanyTitle = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightRegular,
}));

const CompanyPlacement = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
}));

const ViewJob = styled(Link)(({ theme }) => ({
    ...theme.typography.body1,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
}));

const ApplyDate = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightRegular,
}));

const DefaultVariant = () => {
    return <ViewJob to="#">View Job</ViewJob>;
};

const AppliedVariant = () => {
    return (
        <Box display="flex" alignItems="center" gap={1} paddingTop={1}>
            <CheckCircleIcon color="success" />
            <ApplyDate component="span">Applied on 23 May 20</ApplyDate>
        </Box>
    );
};

const ViewVariant = () => {
    return (
        <Box position="absolute" right={16}>
            <ViewJob to="#">View Page</ViewJob>
        </Box>
    );
};

const JobCard = ({ variant = "default", outlined = false }: TJobCard) => {
    const jobCardVariants = {
        default: <DefaultVariant />,
        applied: <AppliedVariant />,
        view: <ViewVariant />,
    };
    const currentVariant = jobCardVariants[variant];

    return (
        <StyledCard isOutlined={outlined}>
            <Content>
                <Link to="#" style={{ display: "flex", alignItems: "center" }}>
                    <Image src={logo} alt="Company" height={80} width={80} />
                </Link>
            </Content>
            <Content sx={{ width: "100%" }}>
                <Position component="h5">Product Designer</Position>
                <Box display="flex" alignItems="center" gap={{ xxl: 1, xs: 0 }} flexWrap="wrap">
                    <CompanyTitle component="h6">Grameenphone</CompanyTitle>
                    <CompanyPlacement component="p">Dhaka, Bangladesh</CompanyPlacement>
                </Box>
                {currentVariant}
            </Content>
        </StyledCard>
    );
};

export default JobCard;
