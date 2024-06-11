// MUI
import { Box, Button, Paper, Typography, styled } from "@mui/material";
// MUI Icons
import SaveIcon from "@mui/icons-material/Save";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// Components
import List from "components/molecules/List/List";
import JobCard from "components/molecules/JobCard/JobCard";
import VacancyHeader from "./VacancyHeader";
import Viewer from "components/molecules/Viewer/Viewer";
import CandidatesList from "./CandidatesList";
// Redux
import { useApplyForVacancyMutation, useGetVacancyInfoQuery, useSaveVacancyMutation } from "app/slices/userSlice";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Router
import { useParams } from "react-router-dom";
// Models
import { USER_TYPE } from "models/user.model";

const VacancyContent = styled(Paper)({
    boxShadow: "none",
    padding: "3rem",
    minHeight: "100%",
    borderRadius: "0 4px 4px 0",
});

const Article = styled(Box)({
    marginTop: "1.5rem",
});

const StyledButton = styled(Button)(({ theme, variant }) => ({
    "&:disabled": {
        color: variant === "contained" ? theme.palette.success.main : theme.palette.info.main,
        backgroundColor: "unset",
        border: `1px solid ${variant === "contained" ? theme.palette.success.main : theme.palette.info.main}`,
    },
}));

const Vacancy = () => {
    const { id } = useParams<{ id: string }>();
    const { data: info, isError, error } = useGetVacancyInfoQuery({ vacancyID: id! });
    const user = useAppSelector((state: RootState) => state.user.currentUser);
    const [saveVacancy] = useSaveVacancyMutation();
    const [applyForVacancy] = useApplyForVacancyMutation();

    if (isError) throw new Error(String(error));

    if (info) {
        const { supervisor, companyInfo, vacancyInfo } = info;

        const isEmployee = user
            ? user.uid !== vacancyInfo.userID &&
              user.uid !== vacancyInfo.supervisor &&
              user.accountType === USER_TYPE.EMPLOYEE
            : true;

        const isEmployeeSavedVacancy = user?.accountType === USER_TYPE.EMPLOYEE && user.savedVacancies.includes(id!);
        const isAlreadyApplied = !!user && vacancyInfo.candidates.includes(user.uid);

        const onSaveVacancy = async () => {
            if (!user || user?.accountType === USER_TYPE.EMPLOYER) return;
            await saveVacancy({ vacancyID: id!, userID: user.uid });
        };

        const onApplyForVacancy = async () => {
            if (!user || user?.accountType === USER_TYPE.EMPLOYER) return;
            await applyForVacancy({ vacancyID: id!, userID: user.uid });
        };

        const renderVacancyDetails = vacancyInfo.details.map(({ label, content }) => {
            const detailsContent = content.map((item) => item.text);
            return (
                <Box marginTop={4}>
                    <List label={label} items={detailsContent} />
                </Box>
            );
        });

        return (
            <VacancyContent>
                <VacancyHeader {...info} />
                {isEmployee && (
                    <Article display="flex" gap={2}>
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
                    </Article>
                )}
                <Article>
                    <Viewer outlined variant="full" {...supervisor} companyName={companyInfo.companyName!} />
                </Article>
                <Article>
                    <Typography variant="body1" component="p" textAlign="justify">
                        {vacancyInfo.description}
                    </Typography>
                </Article>
                <Article>{renderVacancyDetails}</Article>
                <Article>
                    <JobCard variant="view" outlined {...vacancyInfo} {...companyInfo} />
                </Article>
                {!isEmployee && (
                    <Article>
                        <CandidatesList candidates={vacancyInfo.candidates} />
                    </Article>
                )}
            </VacancyContent>
        );
    }
};

export default Vacancy;
