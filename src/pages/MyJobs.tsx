// MUI
import { Box } from "@mui/material";
// Components
import MyJobsNav from "components/organisms/MyJobsNav/MyJobsNav";
// Router
import { Outlet } from "react-router-dom";

const MyJobs = () => {
    return (
        <section>
            <MyJobsNav />
            <Box component="article" marginTop={3}>
                <Outlet />
            </Box>
        </section>
    );
};

export default MyJobs;
