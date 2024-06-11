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
// Redux
import { useGetVacanciesQuery } from "app/slices/userSlice";
// Components
import JobCard from "components/molecules/JobCard/JobCard";
// React
import { ChangeEvent, useState } from "react";
// Constants
const VACANCIES_PER_PAGE = 4;

const ListContainer = styled(Paper)(({ theme }) => ({
    position: "sticky",
    top: "-1rem",
    boxShadow: "none",
    borderRight: `2px solid ${theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.background.paper}`,
    borderRadius: "4px 0 0 4px",
    padding: "1rem",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
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
    const [page, setPage] = useState(1);
    const { data: vacancies = [] } = useGetVacanciesQuery();

    const totalVacancies = vacancies.length;
    const pageCount = Math.ceil(totalVacancies / VACANCIES_PER_PAGE);

    const onChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const renderJobsVacancies = vacancies.map((requiredInfo, index) => (
        <JobCard key={index} {...requiredInfo} variant="default" outlined />
    ));

    return (
        <ListContainer>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Area component="h6">Jobs in Dhaka</Area>
                    <JobsAmount component="p">{totalVacancies} results</JobsAmount>
                </Box>
                <SwithControl control={<Switch />} label="Set Alert" labelPlacement="start" />
            </Box>
            <Box marginBlock={4} display="flex" flexDirection="column" gap={1}>
                {renderJobsVacancies}
            </Box>
            <Box display="flex" justifyContent="center" marginTop="auto">
                <Pagination
                    count={pageCount}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    page={page}
                    onChange={onChangePage}
                />
            </Box>
        </ListContainer>
    );
};

export default JobsList;
