// MUI
import { Box, Grid, Paper, Typography, styled, useMediaQuery } from "@mui/material";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import ContentWrapper from "components/molecules/ContentWrapper/ContentWrapper";
import JobCard from "components/molecules/JobCard/JobCard";
import AddVacancyForm from "components/organisms/AddVacancyForm/AddVacancyForm";
// MUI Icons
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// Router
import { useNavigate } from "react-router-dom";

const MainContent = styled(Paper)({
    padding: "1rem",
});

const AddVacancy = () => {
    const navigate = useNavigate();
    const matches = useMediaQuery("(min-width: 1024px)");

    const renderRecentVacancies = Array.from({ length: 5 }).map((vacancy, index) => <JobCard key={index} />);

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
                        <Box position="sticky" top={0}>
                            <ContentWrapper title="Recent vacancies" to="#" linkName="All vacancies">
                                {renderRecentVacancies}
                            </ContentWrapper>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default AddVacancy;
