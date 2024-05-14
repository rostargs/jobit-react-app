// MUI
import { Grid } from "@mui/material";
// Components
import Viewer from "components/molecules/Viewer/Viewer";
import ContentWrapper from "components/molecules/ContentWrapper/ContentWrapper";

const ProfileViewers = () => {
    return (
        <ContentWrapper title="Profile Viewers" to="#" linkName="All Profile Views">
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Viewer />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer />
                </Grid>
            </Grid>
        </ContentWrapper>
    );
};

export default ProfileViewers;
