// MUI
import { Grid } from "@mui/material";
// Redux
import { useAppSelector } from "app/hooks";
import { useGetSavedJobsQuery } from "app/slices/userSlice";
import { RootState } from "app/store";
// Models
import { TEmployeeUser } from "models/user.model";
// Components
import JobCard from "components/molecules/JobCard/JobCard";
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// Assets
import empty from "assets/images/errors/emptyBox.svg";

const SavedJobs = () => {
    const { savedVacancies } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const { data: saved } = useGetSavedJobsQuery(savedVacancies);

    const renderSavedVacancies = saved ? (
        saved.map((vacancy) => (
            <Grid item xs={6} key={vacancy.id}>
                <JobCard {...vacancy} variant='saved' />
            </Grid>
        ))
    ) : (
        <Grid xs={12}>
            <ErrorNotification image={empty} errorMessage="We're sorry, you don't have any jobs saved 😒." />
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            {renderSavedVacancies}
        </Grid>
    );
};

export default SavedJobs;
