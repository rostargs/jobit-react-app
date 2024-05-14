// Model
import { TProfileBaseCard } from "./ProfileBaseCard.model";
// MUI
import { Box, Button, ButtonBase, Card, CardActions, CardContent, Typography, styled } from "@mui/material";
// Components
import Image from "components/atoms/Image/Image";
// Hooks
import { useToggle } from "hooks/useToggle";
// Utils
import { cutString } from "utils/cutString";
// Constants
const MAX_DESCRIPTION_LENGTH = 260;

const EducationCardContent = styled(CardContent)({
    display: "flex",
    alignItems: "flex-start",
    padding: "0.5rem 0",
    ":last-child": {
        paddingBottom: 0,
    },
});

const EducationCardActions = styled(CardActions)({
    marginLeft: "auto",
});

const Position = styled(Typography<"h5">)(({ theme }) => ({
    ...theme.typography.h6,
}));

const CompanyName = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightRegular,
}));

const Details = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
}));

const ActionButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

const Description = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    textAlign: "justify",
}));

const MoreButton = styled(ButtonBase)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    textTransform: "capitalize",
    paddingInline: "0.5rem",
}));

const ProfileBaseCard = ({
    title,
    subtitle,
    description,
    enterYear,
    leaveYear,
    place,
    gradeLevel,
    logo,
    onDelete,
    onEdit,
}: TProfileBaseCard) => {
    const { active, onToggle } = useToggle(false);

    const isShouldCut = description && description.length > MAX_DESCRIPTION_LENGTH;
    const formatedDescription =
        isShouldCut && active ? description : description && cutString(description, MAX_DESCRIPTION_LENGTH);
    const buttonContent = active ? "See less" : "See more";
    const formatedEnterYear = String((typeof enterYear === "string" ? new Date(enterYear) : enterYear).toLocaleDateString());
    const formatedEndYear = String((typeof leaveYear === "string" ? new Date(leaveYear) : leaveYear).toLocaleDateString());
    const formatedLogo = typeof logo === 'string' ? logo : URL.createObjectURL(logo)

    return (
        <Card sx={{ boxShadow: "none" }}>
            <EducationCardContent>
                <Image src={formatedLogo} alt={subtitle} width={72} height={72} />
                <Box marginLeft={2}>
                    <Position component="h5">{title}</Position>
                    <CompanyName component="h6">{subtitle}</CompanyName>
                    <Details component="p">
                        {place || `Grade: ${gradeLevel}`} &nbsp; | &nbsp; {formatedEnterYear} to {formatedEndYear}
                    </Details>
                </Box>
                <EducationCardActions>
                    <ActionButton onClick={onDelete} color="error">
                        Delete
                    </ActionButton>
                    <ActionButton onClick={onEdit}>Edit</ActionButton>
                </EducationCardActions>
            </EducationCardContent>
            {description && (
                <EducationCardContent>
                    <Description component="p">
                        {formatedDescription}
                        {isShouldCut && (
                            <MoreButton disableRipple onClick={onToggle}>
                                {buttonContent}
                            </MoreButton>
                        )}
                    </Description>
                </EducationCardContent>
            )}
        </Card>
    );
};

export default ProfileBaseCard;
