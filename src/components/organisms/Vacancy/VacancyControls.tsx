// MUI
import { styled, Button, Box } from "@mui/material";
// Hooks
import { useVacancy } from "hooks/useVacancy";
// Models
import { TVacancyControls } from "./Vacancy.model";
import { USER_TYPE } from "models/user.model";
// MUI Icons
import SaveIcon from "@mui/icons-material/Save";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const StyledButton = styled(Button)(({ theme, variant }) => ({
    "&:disabled": {
        color: variant === "contained" ? theme.palette.success.main : theme.palette.info.main,
        backgroundColor: "unset",
        border: `1px solid ${variant === "contained" ? theme.palette.success.main : theme.palette.info.main}`,
    },
}));

const VacancyControls = ({ vacancyInfo, vacancyID }: TVacancyControls) => {
    const { user, onApplyForVacancy, onSaveVacancy } = useVacancy({ vacancyID });

    const isEmployeeSavedVacancy = user?.accountType === USER_TYPE.EMPLOYEE && user.savedVacancies.includes(vacancyID!);
    const isAlreadyApplied = !!user && vacancyInfo.candidates.some((item) => item.id === user.uid);

    return (
        <Box display="flex" gap={2}>
            <StyledButton
                variant="contained"
                startIcon={isAlreadyApplied ? <ThumbUpIcon /> : <AttachEmailIcon />}
                onClick={onApplyForVacancy}
                disabled={isAlreadyApplied}
            >
                {isAlreadyApplied ? "You've already applied " : "Apply"}
            </StyledButton>
            <StyledButton
                variant="outlined"
                onClick={onSaveVacancy}
                disabled={isEmployeeSavedVacancy}
                startIcon={<SaveIcon />}
            >
                {isEmployeeSavedVacancy ? "Saved" : "Save Job"}
            </StyledButton>
        </Box>
    );
};

export default VacancyControls;
