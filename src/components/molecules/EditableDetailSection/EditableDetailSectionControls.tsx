// MUI
import { Box, ClickAwayListener, Fade, Paper, styled } from "@mui/material";
// Hooks
import { useToggle } from "hooks/useToggle";
// MUI Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import NavIcon from "components/atoms/NavIcon/NavIcon";
// Context
import { NestedListContext } from "./NestedListProvider";
// React
import { useContext } from "react";
// Models
import { TEditableDetailSectionControls } from "./EditableDetailSection.model";

const Control = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "110%",
    minWidth: "15vw",
    zIndex: theme.zIndex.tooltip,
    borderRadius: "0.5rem",
    padding: "0.25rem",
}));

const EditableDetailSectionControls = ({ onRemoveSection }: TEditableDetailSectionControls) => {
    const { active, onToggle, onSetToNegative } = useToggle(false);
    const values = useContext(NestedListContext);

    if (!values) throw new Error("No context provided!");

    const { append } = values;

    const onAddEditableItem = () => {
        append({ text: "" });
        onSetToNegative();
    };

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <Box display="flex" position="relative" justifyContent="flex-end">
                <NavBadge name="More" invisible onClick={onToggle}>
                    <MoreVertIcon />
                </NavBadge>
                <Fade in={active}>
                    <Control elevation={3}>
                        <NavIcon startAdornment={<AddTaskIcon />} label="Add list item" onClickIcon={onAddEditableItem} />
                        <NavIcon
                            startAdornment={<DeleteForeverIcon />}
                            label="Remove section"
                            onClickIcon={onRemoveSection}
                        />
                    </Control>
                </Fade>
            </Box>
        </ClickAwayListener>
    );
};

export default EditableDetailSectionControls;
