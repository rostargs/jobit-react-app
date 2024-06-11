// MUI
import { Box, Tab, Tabs } from "@mui/material";
// Router
import { Link, useLocation } from "react-router-dom";

const MyJobsNav = () => {
    const { pathname } = useLocation();

    return (
        <Box component="nav">
            <Tabs value={pathname} aria-label="Job stats">
                <Tab component={Link} label="Saved" to="/jobs/mine" value="/jobs/mine" />
                <Tab component={Link} label="Rejected" to="/jobs/mine/rejected" value="/jobs/mine/rejected" />
                <Tab component={Link} label="Applied" to="/jobs/mine/applied" value="/jobs/mine/applied" />
            </Tabs>
        </Box>
    );
};

export default MyJobsNav;
