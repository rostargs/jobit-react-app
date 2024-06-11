// MUI
import { Box, Grid, Paper, Typography, styled, useMediaQuery } from "@mui/material";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import ContentWrapper from "components/molecules/ContentWrapper/ContentWrapper";
import JobCard from "components/molecules/JobCard/JobCard";
import AddVacancyForm from "components/organisms/AddVacancyForm/AddVacancyForm";
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// MUI Icons
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// Router
import { useNavigate } from "react-router-dom";
// Redux
import { useGetCompanyVacanciesQuery } from "app/slices/userSlice";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Models
import { TEmployerUser } from "models/user.model";
// Assets
import empty from "assets/images/errors/emptyBox.svg";

const MainContent = styled(Paper)({
    padding: "1rem",
});

const RecentVacancies = () => {
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployerUser);
    const { data: vacancies = [] } = useGetCompanyVacanciesQuery({ userID: uid, vacanciesLimit: 5 });

    const renderRecentVacancies = vacancies.map((vacancy, index) => <JobCard key={index} {...vacancy} variant="default" />);

    return (
        <Box position="sticky" top={0}>
            <ContentWrapper title="Recent  vacancies" to="#" linkName="All vacancies">
                {!!vacancies.length ? (
                    renderRecentVacancies
                ) : (
                    <ErrorNotification image={empty} errorMessage="No vacancies found 😒." width={150} />
                )}
            </ContentWrapper>
        </Box>
    );
};

const AddVacancy = () => {
    const navigate = useNavigate();
    const matches = useMediaQuery("(min-width: 1024px)");

    return (
        <Box component="section">
            <Grid container spacing={1}>
                <Grid item xs>
                    <MainContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h5" component="h5">
                                Add vacancy
                            </Typography>
                            <NavBadge name="Go back" invisible onClick={() => navigate(-1)}>
                                <KeyboardBackspaceIcon />
                            </NavBadge>
                        </Box>
                        <Grid container spacing={3.5} marginBlock={0.5}>
                            <Grid item xs={12}>
                                <AddVacancyForm />
                            </Grid>
                        </Grid>
                    </MainContent>
                </Grid>
                {matches && (
                    <Grid item xs={4}>
                        <RecentVacancies />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default AddVacancy;
