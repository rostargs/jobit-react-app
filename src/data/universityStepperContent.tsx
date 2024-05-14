// Model
import { TStep } from "components/atoms/StepperContainer/StepperContainer.model";
import EducationPreview from "components/molecules/EducationStepper/EducationPreview";
// Components & Schema
import StudyPeriod, { studyPeriodSchema } from "components/molecules/EducationStepper/StudyPeriod";
import UniversityInfo, { universityInfoSchema } from "components/molecules/EducationStepper/UniversityInfo";

export const universityStepperContent: TStep[] = [
    {
        label: "University info",
        component: <UniversityInfo />,
        validationRules: universityInfoSchema,
    },
    {
        label: "Period of studying",
        component: <StudyPeriod />,
        validationRules: studyPeriodSchema,
    },
    {
        label: "Preview",
        component: <EducationPreview />,
    },
];
