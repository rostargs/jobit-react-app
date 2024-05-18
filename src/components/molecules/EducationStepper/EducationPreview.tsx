// MUI
import { Paper, styled } from "@mui/material";
// Hook Form
import { useFormContext } from "react-hook-form";
// Components
import ProfileBaseCard from "../ProfileBaseCard/ProfileBaseCard";
// Model
import { TFormDataResumeEducation } from "models/resume.model";
import { getYearFromDate } from "utils/dateOperations";

const Wrapper = styled(Paper)(({ theme }) => ({
    padding: "0.5rem",
    boxShadow: theme.shadows[2],
}));

const EducationPreview = () => {
    const { getValues } = useFormContext();

    const { universityTitle, enterYear, leaveYear, faculty, logo, gradeLevel } = getValues() as TFormDataResumeEducation;

    const formData = {
        title: faculty,
        subtitle: universityTitle,
        logo: URL.createObjectURL(logo),
        enterYear: getYearFromDate(enterYear),
        leaveYear: getYearFromDate(leaveYear),
        gradeLevel,
    };

    console.log(formData);

    return (
        <Wrapper>
            <ProfileBaseCard {...formData} />
        </Wrapper>
    );
};

export default EducationPreview;
