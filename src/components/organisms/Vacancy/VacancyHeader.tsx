// MUI
import { Box, Typography, styled } from "@mui/material";
// Model
import { TVacancyHeader } from "./Vacancy.model";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import Image from "components/atoms/Image/Image";
// Data
import { technologies } from "data/technologies";
// Assets
import test from "assets/images/companies/Company-7.svg";
// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const VacancyPosition = styled(Typography<"h3">)(({ theme }) => ({
    ...theme.typography.h4,
    fontWeight: theme.typography.fontWeightMedium,
}));

const VacancyDetails = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.grey[600],
}));

const VacancyHeader = ({ companyInfo, vacancyInfo }: TVacancyHeader) => {
    const { companyName, logo } = companyInfo;
    const { position, postDate, location, salary, skills } = vacancyInfo;

    const formatedDate = new Date(postDate).toLocaleDateString();

    const renderRequiredSkills = skills.map((skill) => {
        const { logo, name } = technologies.find((tech) => tech.name === skill)!;
        return <Image src={logo} alt={name} width={35} height={35} />;
    });

    return (
        <Box>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                <Box>
                    <VacancyPosition component="h3">{position}</VacancyPosition>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box display="flex" gap={1} alignItems="center">
                            <Image src={logo || test} alt={companyName!} width={24} height={24} />
                            <Typography variant="subtitle1">{companyName}</Typography>
                        </Box>
                        <VacancyDetails component="p">{location}</VacancyDetails>
                        <Typography variant="h6" color="green" fontWeight="bold">
                            ${salary}
                        </Typography>
                    </Box>
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
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="p">
                        Required skills:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {renderRequiredSkills}
                    </Box>
                </Box>
                <VacancyDetails component="p">Posted at {formatedDate}</VacancyDetails>
            </Box>
        </Box>
    );
};

export default VacancyHeader;
