// MUI
import { Grid } from "@mui/material";
// Components
import JobCard from "components/molecules/JobCard/JobCard";
import ContentWrapper from "components/molecules/ContentWrapper/ContentWrapper";

const JobsForYou = () => {
    return (
        <ContentWrapper title="Jobs for you" to="#" linkName="All jobs">
            <Grid container>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
                <Grid item xs md={6} xl>
                    <JobCard />
                </Grid>
            </Grid>
        </ContentWrapper>
    );
};

export default JobsForYou;
