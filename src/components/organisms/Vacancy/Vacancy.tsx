// MUI
import { Box, Button, Paper, Typography, styled } from "@mui/material";
// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// Components
import Image from "components/atoms/Image/Image";
import List from "components/molecules/List/List";
import NavBadge from "components/atoms/NavBadge/NavBadge";
import Viewer from "components/molecules/Viewer/Viewer";
import JobCard from "components/molecules/JobCard/JobCard";
// Assets
import test from "assets/images/companies/Company-7.svg";

const VacancyContent = styled(Paper)({
    boxShadow: "none",
    padding: "3rem",
    height: "100%",
    borderRadius: "0 4px 4px 0",
});

const VacancyPosition = styled(Typography<"h3">)(({ theme }) => ({
    ...theme.typography.h4,
    fontWeight: theme.typography.fontWeightMedium,
}));

const VacancyDetails = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.grey[600],
}));

const VacancyHeader = () => {
    return (
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box>
                <VacancyPosition component="h3">Product Designer</VacancyPosition>
                <Box display="flex" alignItems="center" gap={1}>
                    <Box display="flex" gap={1} alignItems="center">
                        <Image src={test} width={24} height={24} />
                        <Typography variant="subtitle1">Grameenphone</Typography>
                    </Box>
                    <VacancyDetails component="p">Dhaka, Bangladesh</VacancyDetails>
                </Box>
                <VacancyDetails component="p">Posted on 15 May 20</VacancyDetails>
            </Box>
            <Box display="flex" gap={1} marginTop={1}>
                <NavBadge name="Message" invisible>
                    <EmailIcon />
                </NavBadge>
                <NavBadge name="Share" invisible>
                    <ShareIcon />
                </NavBadge>
                <NavBadge name="More" invisible>
                    <MoreHorizIcon />
                </NavBadge>
            </Box>
        </Box>
    );
};

const Vacancy = () => {
    return (
        <VacancyContent>
            <VacancyHeader />
            <Box display="flex" gap={2} marginBlock={4}>
                <Button variant="contained">Apply</Button>
                <Button variant="outlined">Save Job</Button>
            </Box>
            <Box>
                <Viewer outlined variant="full" />
            </Box>
            <Box marginTop={4}>
                <List label="Responsibilities" items={testInfo} />
            </Box>
            <Box marginTop={4}>
                <List label="Preferred Qualifications and Skills" items={testInfo} type="numeric" />
            </Box>
            <Box marginBlock={4}>
                <JobCard variant="view" outlined />
            </Box>
        </VacancyContent>
    );
};

const testInfo = [
    "Work on and execute design projects from start to finish while meeting creative and technical requirements.",
    "Collaborate closely with engineers, researchers, clinicians and product managers to iterate rapidly.",
    "Work on the entire project lifecycle, from wireframes to detailed specs across multiple UX platforms.",
    "Participate in regular design reviews and other team-wide design efforts; create and contribute to a great design team culture.",
    "Participate in user-experience research and usability studies.",
];

export default Vacancy;
