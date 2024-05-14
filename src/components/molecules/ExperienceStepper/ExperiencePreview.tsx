// MUI
import { Paper, styled } from "@mui/material";
// Hook Form
import { useFormContext } from "react-hook-form";
// Types
import { TCompanyInfoFormType } from "./CompanyInfo";
import { TWorkPeriodFormType } from "./WorkPeriod";
import { TPositionFormType } from "./Position";
// Components
import ProfileBaseCard from "../ProfileBaseCard/ProfileBaseCard";

const Wrapper = styled(Paper)(({ theme }) => ({
    padding: "0.5rem",
    boxShadow: theme.shadows[2],
}));

type TExperienceStepsUnion = TCompanyInfoFormType & TWorkPeriodFormType & TPositionFormType;

const ExperiencePreview = () => {
    const { getValues } = useFormContext();

    const { role, position, companyName, country, logo, leaveYear, enterYear, level } =
        getValues() as TExperienceStepsUnion;

    const formatedData = {
        title: `${level} ${position}`,
        subtitle: companyName,
        place: country,
        logo,
        description: role,
        leaveYear,
        enterYear,
    };

    return (
        <Wrapper>
            <ProfileBaseCard {...formatedData} />
        </Wrapper>
    );
};

export default ExperiencePreview;
