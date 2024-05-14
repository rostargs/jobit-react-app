// MUI
import { Box, Grid, Pagination } from "@mui/material";
// Components
import Viewer from "components/molecules/Viewer/Viewer";

const CompanyStaff = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
                <Grid item xs={6}>
                    <Viewer variant="short" />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
                <Pagination count={99} variant="outlined" shape="rounded" color="primary" />
            </Box>
        </Box>
    );
};

export default CompanyStaff;
