// Model
import { TProfileSmallCard } from "./ProfileSmallCard.model";
// MUI
import { Card, CardHeader, IconButton, Tooltip, styled } from "@mui/material";
// Assets
import deleteIcon from "assets/images/publicProfile/delete.svg";
import editIcon from "assets/images/publicProfile/edit.svg";

const SkillCardHeader = styled(CardHeader)(({ theme }) => ({
    ".MuiCardHeader-title": {
        ...theme.typography.h6,
        fontWeight: theme.typography.fontWeightSemiBold,
    },
}));

const ActionButton = styled(IconButton)({
    padding: 0,
});

const ProfileSmallCard = ({ title, subtitle, image, onDelete, onEdit }: TProfileSmallCard) => {
    return (
        <Card elevation={2} style={{ overflow: "clip" }}>
            <SkillCardHeader
                title={title}
                subheader={subtitle}
                avatar={image ? <img src={image} alt="Skill logo" width={30} /> : null}
                action={
                    <>
                        <ActionButton aria-label="Delete" onClick={onDelete}>
                            <Tooltip title="Delete">
                                <img src={deleteIcon} alt="Delete icon" style={{ filter: "brightness(3)" }} />
                            </Tooltip>
                        </ActionButton>
                        <ActionButton aria-label="Edit" onClick={onEdit}>
                            <Tooltip title="Edit">
                                <img src={editIcon} alt="Edit icon" />
                            </Tooltip>
                        </ActionButton>
                    </>
                }
            />
        </Card>
    );
};

export default ProfileSmallCard;
