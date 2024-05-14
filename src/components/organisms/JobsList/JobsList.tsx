// MUI
import {
    Box,
    FormControlLabel,
    Paper,
    Switch,
    Typography,
    styled,
    formControlLabelClasses,
    Pagination,
} from "@mui/material";
// Components
import JobCard from "components/molecules/JobCard/JobCard";

const ListContainer = styled(Paper)(({ theme }) => ({
    position: "sticky",
    top: "-1rem",
    boxShadow: "none",
    borderRight: `2px solid ${theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.background.paper}`,
    borderRadius: "4px 0 0 4px",
    padding: "1rem",
}));

const Area = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
}));

const JobsAmount = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
}));

const SwithControl = styled(FormControlLabel)(({ theme }) => ({
    [`.${formControlLabelClasses.label}`]: {
        ...theme.typography.body2,
        color: theme.palette.grey[600],
    },
}));

const JobsList = () => {
    const renderJobsVacancies = Array.from({ length: 5 }).map((_, index) => <JobCard key={index} />);
    return (
        <ListContainer>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Area component="h6">Jobs in Dhaka</Area>
                    <JobsAmount component="p">600 results</JobsAmount>
                </Box>
                <SwithControl control={<Switch />} label="Set Alert" labelPlacement="start" />
            </Box>
            <Box marginBlock={4} display="flex" flexDirection="column" gap={1}>
                {renderJobsVacancies}
            </Box>
            <Box display="flex" justifyContent="center">
                <Pagination count={99} variant="outlined" shape="rounded" color="primary" />
            </Box>
        </ListContainer>
    );
};

export default JobsList;
