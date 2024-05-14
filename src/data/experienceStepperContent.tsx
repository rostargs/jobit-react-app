// Model
import { TStep } from "components/atoms/StepperContainer/StepperContainer.model";
// Components | Schema
import CompanyInfo, { companyInfoSchema } from "components/molecules/ExperienceStepper/CompanyInfo";
import ExperiencePreview from "components/molecules/ExperienceStepper/ExperiencePreview";
import WorkPeriod, { workPeriodSchema } from "components/molecules/ExperienceStepper/WorkPeriod";
import Position, { positionSchema } from "components/molecules/ExperienceStepper/Position";

export const experienceStepperContent: TStep[] = [
    {
        label: "General information",
        validationRules: companyInfoSchema,
        component: <CompanyInfo />,
    },
    {
        label: "Work period",
        validationRules: workPeriodSchema,
        component: <WorkPeriod />,
    },
    {
        label: "Position and role",
        validationRules: positionSchema,
        component: <Position />,
    },
    {
        label: "Preview",
        component: <ExperiencePreview />,
    },
];
