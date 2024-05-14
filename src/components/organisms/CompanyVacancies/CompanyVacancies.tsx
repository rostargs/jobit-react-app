// MUI
import { Box, Grid, Pagination } from "@mui/material";
// Components
import JobCard from "components/molecules/JobCard/JobCard";

const CompanyVacancies = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <JobCard variant="view" />
                </Grid>
                <Grid item xs={12}>
                    <JobCard variant="view" />
                </Grid>
                <Grid item xs={12}>
                    <JobCard variant="view" />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
                <Pagination variant="outlined" count={99} shape="rounded" color="primary" />
            </Box>
        </Box>
    );
};

export default CompanyVacancies;
