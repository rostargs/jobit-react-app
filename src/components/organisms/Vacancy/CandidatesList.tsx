// MUI
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
// Models
import { TCandidatesList } from "./Vacancy.model";
// Redux
import { useGetVacancyCandidatesInfoQuery } from "app/slices/userSlice";
// Components
import Viewer from "components/molecules/Viewer/Viewer";

const CandidatesList = ({ candidates, vacancyID }: TCandidatesList) => {
    const { data: candidatesData = [] } = useGetVacancyCandidatesInfoQuery(candidates);

    const renderCandidates = candidatesData.map((candidate, index) => {
        const { uid } = candidate;
        return (
            <>
                <ListItem key={uid} disablePadding>
                    <Viewer {...candidate} variant="vacancy" vacancyID={vacancyID} candidateID={uid} />
                </ListItem>
                {++index !== candidatesData.length && <Divider />}
            </>
        );
    });

    return (
        <Box>
            <Typography component="h6" variant="h6">
                Vacancy candidates:
            </Typography>
            <List>{renderCandidates}</List>
        </Box>
    );
};

export default CandidatesList;
