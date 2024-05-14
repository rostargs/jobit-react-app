// Model
import { TEditableStatSection } from "./EditableStatSection.model";
// MUI
import { Card, CardHeader, Button, CardContent, styled } from "@mui/material";

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    ".MuiCardHeader-action": {
        margin: 0,
        "& > button": {
            fontWeight: theme.typography.fontWeightSemiBold,
        },
    },
    ".MuiCardHeader-title": {
        ...theme.typography.h6,
    },
}));

const EditableStatSection = ({
    sectionAdornment,
    subtitle,
    title,
    actionButtonText,
    children,
    onEdit,
    isActionButtonHidden = false,
    controls,
    overflow = "clip",
}: TEditableStatSection) => {
    return (
        <Card sx={{ boxShadow: "none", overflow }}>
            <StyledCardHeader
                avatar={sectionAdornment && <img src={sectionAdornment} alt={title} style={{ width: 56 }} />}
                title={title}
                subheader={subtitle}
                action={
                    controls ||
                    (!isActionButtonHidden && (
                        <Button variant="outlined" aria-label={actionButtonText} onClick={onEdit}>
                            {actionButtonText}
                        </Button>
                    ))
                }
            />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default EditableStatSection;
