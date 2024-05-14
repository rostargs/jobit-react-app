// MUI
import { Grid } from "@mui/material";
// Components
import JobsList from "components/organisms/JobsList/JobsList";
import Vacancy from "components/organisms/Vacancy/Vacancy";

const Jobs = () => {
    return (
        <Grid container component="section" paddingBottom={2}>
            <Grid item xs={4}>
                <JobsList />
            </Grid>
            <Grid item xs>
                <Vacancy />
            </Grid>
        </Grid>
    );
};

export default Jobs;
