// MUI
import { Grid } from "@mui/material";
// Components
import StatItem from "components/atoms/StatItem/StatItem";

const Statistics = () => {
    return (
        <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
                <StatItem />
            </Grid>
            <Grid item md={6} xs={12}>
                <StatItem />
            </Grid>
            <Grid item md={6} xs={12}>
                <StatItem />
            </Grid>
            <Grid item md={6} xs={12}>
                <StatItem />
            </Grid>
        </Grid>
    );
};

export default Statistics;
