// MUI
import { ButtonBase, Typography, styled } from "@mui/material";
// Model
import { TSkillTag } from "./SkillTag.model";

const Tag = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
}));

const SkillButton = styled(ButtonBase)({
    padding: "0.25rem 0.5rem",
});

const SkillTag = ({ name, ...props }: TSkillTag) => {
    return (
        <SkillButton centerRipple {...props}>
            <Tag component="span">{name}</Tag>
        </SkillButton>
    );
};

export default SkillTag;
