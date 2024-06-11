// MUI
import { Grid, styled } from "@mui/material";
// Components
import JobsList from "components/organisms/JobsList/JobsList";
// Router
import { Outlet } from "react-router-dom";

const ScrollSection = styled(Grid)({
    height: "100vh",
    maxHeight: "calc(100vh - 90px - 32px)",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: 0,
    },
});

const Jobs = () => {
    return (
        <Grid container component="section" paddingBottom={2}>
            <ScrollSection item xs={4}>
                <JobsList />
            </ScrollSection>
            <ScrollSection item xs>
                <Outlet />
            </ScrollSection>
        </Grid>
    );
};

export default Jobs;
