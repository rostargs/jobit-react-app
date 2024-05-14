// Model
import { TBenefitItem } from "./BenefitItem.model";
// MUI
import { IconButton, Paper, Typography, styled, iconButtonClasses } from "@mui/material";
// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";

const BenefitCard = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    border: `1px solid ${theme.palette.divider}`,
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "0.5rem",
    position: "relative",

    [`&:hover > .${iconButtonClasses.root}`]: {
        transitionDelay: "0.25s",
        opacity: 1,
        visibility: "visible",
    },
}));

const Name = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
    textOverflow: "ellipsis",
    textWrap: "nowrap",
    overflow: "hidden",
    marginRight: "2.5rem",
}));

const DeleteButton = styled(IconButton)({
    position: "absolute",
    right: "0.5rem",
    opacity: 0,
    visibility: "hidden",
    transition: "all 0.25s ease-in-out",
});

const BenefitItem = ({ image, text, onDelete }: TBenefitItem) => {
    return (
        <BenefitCard>
            {image}
            <Name component="p">{text}</Name>
            <DeleteButton onClick={onDelete}>
                <DeleteIcon />
            </DeleteButton>
        </BenefitCard>
    );
};

export default BenefitItem;
