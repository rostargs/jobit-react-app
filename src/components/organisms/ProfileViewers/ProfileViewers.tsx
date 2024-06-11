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
                    <Viewer
                        name="USER"
                        variant="short"
                        position="Business Analysis"
                        companyName="EPAM"
                        uid=""
                        avatar={null}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer
                        name="USER"
                        variant="short"
                        position="Backend Development"
                        companyName="EPAM"
                        uid=""
                        avatar={null}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer name="USER" variant="short" position="Legal Tech" companyName="EPAM" uid="" avatar={null} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Viewer
                        name="USER"
                        variant="short"
                        position="Network Engineering"
                        companyName="EPAM"
                        uid=""
                        avatar={null}
                    />
                </Grid>
            </Grid>
        </ContentWrapper>
    );
};

export default ProfileViewers;
