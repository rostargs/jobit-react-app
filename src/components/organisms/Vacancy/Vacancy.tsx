// MUI
import { Paper, Typography, styled } from "@mui/material";
// Components
import List from "components/molecules/List/List";
import JobCard from "components/molecules/JobCard/JobCard";
import VacancyHeader from "./VacancyHeader";
import Viewer from "components/molecules/Viewer/Viewer";
import CandidatesList from "./CandidatesList";
import VacancyControls from "./VacancyControls";
import VacancySkeleton from "components/skeletons/VacancySkeleton/VacancySkeleton";
// Redux
import { useGetVacancyInfoQuery } from "app/slices/userSlice";
// Router
import { useParams } from "react-router-dom";
// Models
import { USER_TYPE } from "models/user.model";
// Hooks
import { useVacancy } from "hooks/useVacancy";

const VacancyContent = styled(Paper)({
    boxShadow: "none",
    padding: "3rem",
    minHeight: "100%",
    borderRadius: "0 4px 4px 0",
});

const VacancyDetails = styled("article")({
    marginBlock: "1.5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
});

const VacancyDescription = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: "justify",
}));

const Vacancy = () => {
    const { id } = useParams<{ id: string }>();
    const { data: info, isError, error, isLoading } = useGetVacancyInfoQuery({ vacancyID: id! });
    const { user } = useVacancy({ vacancyID: id! });

    if (isLoading) return <VacancySkeleton />;

    if (isError || !info) throw new Error(String(error));

    const { supervisor, companyInfo, vacancyInfo } = info;

    const isEmployee = user
        ? user.uid !== vacancyInfo.userID && user.uid !== vacancyInfo.supervisor && user.accountType === USER_TYPE.EMPLOYEE
        : true;

    const renderVacancyDetails = vacancyInfo.details.map(({ label, content }, index) => {
        const detailsContent = content.map((item) => item.text);
        return <List label={label} items={detailsContent} key={index} />;
    });

    return (
        <VacancyContent>
            <VacancyHeader {...info} />
            <VacancyDetails>
                {isEmployee && <VacancyControls vacancyID={id!} vacancyInfo={vacancyInfo} />}
                <Viewer outlined variant="full" {...supervisor} companyName={companyInfo.companyName!} />
                <VacancyDescription>{vacancyInfo.description}</VacancyDescription>
                {renderVacancyDetails}
                <JobCard variant="view" outlined {...vacancyInfo} {...companyInfo} />
                {!isEmployee && <CandidatesList candidates={vacancyInfo.candidates} vacancyID={id!} />}
            </VacancyDetails>
        </VacancyContent>
    );
};

export default Vacancy;
