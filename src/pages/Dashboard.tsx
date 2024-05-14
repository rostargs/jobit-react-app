// MUI
import { Grid, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setViewProperty } from "app/slices/viewSlice";
import { RootState } from "app/store";
// Components
import Greeting from "components/molecules/Greeting/Greeting";
import Statistics from "components/molecules/Statistics/Statistics";
import JobsForYou from "components/organisms/JobsForYou/JobsForYou";
import ProfileViewers from "components/organisms/ProfileViewers/ProfileViewers";

const Dashboard = () => {
    const { currentUser } = useAppSelector((state: RootState) => state.user);
    const { greeting } = useAppSelector((state: RootState) => state.view);
    const dispatch = useAppDispatch();

    const onCloseGreetingModal = () => {
        dispatch(setViewProperty({ prop: "greeting", value: false }));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xl={8} xs={12}>
                <Stack gap={1}>
                    <Statistics />
                    <ProfileViewers />
                </Stack>
            </Grid>
            <Grid item xl={4} xs={12}>
                <JobsForYou />
            </Grid>
            {currentUser && (
                <Greeting isOpened={greeting} onClose={onCloseGreetingModal} accountType={currentUser.accountType} />
            )}
        </Grid>
    );
};

export default Dashboard;
