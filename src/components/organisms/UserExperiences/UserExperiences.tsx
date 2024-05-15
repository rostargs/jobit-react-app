// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import ProfileBaseCard from "components/molecules/ProfileBaseCard/ProfileBaseCard";
import StepperContainer from "components/atoms/StepperContainer/StepperContainer";
// Assets
import experiences from "assets/images/publicProfile/experience.svg";
// Hooks
import { useToggle } from "hooks/useToggle";
// Data
import { experienceStepperContent } from "data/experienceStepperContent";
// MUI
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material";
// Models
import { TEmployeeUser } from "models/user.model";
import { TFormDataResumeExperience } from "models/resume.model";
// Redux
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
    addStaticlyStatItem,
    useAddStatItemMutation,
    useEditStatItemMutation,
    useRemoveStatItemMutation,
} from "app/slices/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { TExperienceList } from "./UserExperiences.model";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
// Assets
import emptyBox from "assets/images/errors/emptyBox.svg";
import { storage } from "../../../firebaseConfig";
import { getImageFileByUrlFromStorage } from "utils/uploadImageMethods";
import { useRef } from "react";

const slideLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }
    to{
        opacity: 1;
        transform: translateX(0px);
    }
`;

const AnimationWrapper = styled("div")({
    animation: `${slideLeft} linear forwards`,
    animationTimeline: "view(y)",
    animationRange: "entry",
});

const ExperienceList = ({ onHandleError, onEdit }: TExperienceList) => {
    const { experience, uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const [removeStatItem] = useRemoveStatItemMutation();

    const isUserHasExperience = !!experience.length;

    const renderExperienceList = experience.map((exp) => (
        <AnimationWrapper key={exp.id}>
            <ProfileBaseCard
                {...exp}
                title={exp.position}
                subtitle={exp.companyName}
                description={exp.role}
                place={exp.country}
                onDelete={async () => await removeStatItem({ userID: uid, itemID: exp.id, key: "experience" })}
                onEdit={() => onEdit(exp.id)}
            />
        </AnimationWrapper>
    ));

    return isUserHasExperience ? (
        renderExperienceList
    ) : (
        <ErrorNotificationt
            image={emptyBox}
            errorMessage="You've never worked at all, but it doesn't matter 😊."
            buttonText="Add experience item"
            onHandleError={onHandleError}
            width={180}
        />
    );
};

const UserExperiences = () => {
    const { uid, experience } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const [addStatItem] = useAddStatItemMutation();
    const [editStatItem] = useEditStatItemMutation();
    const dispath = useAppDispatch();
    const { active: addFormOpened, onSetToPositive: openAddForm, onSetToNegative: closeAddForm } = useToggle(false);
    const { active: editFormOpened, onSetToPositive: openEditForm, onSetToNegative: closeEditForm } = useToggle(false);
    const defaultFormDataRef = useRef<(TFormDataResumeExperience & { id: string }) | null>(null);

    const onAddExperienceItem = async (data: TFormDataResumeExperience) => {
        const formatedData = {
            ...data,
            leaveYear: String(data.leaveYear),
            enterYear: String(data.enterYear),
            id: nanoid(),
        };

        dispath(addStaticlyStatItem({ key: "experience", value: formatedData }));
        await addStatItem({ value: formatedData, userID: uid, key: "experience" });
    };

    const onSaveChanges = async (data: TFormDataResumeExperience) => {
        if (!defaultFormDataRef.current) return;

        const formatedData = {
            ...data,
            enterYear: String(data.enterYear),
            leaveYear: String(data.leaveYear),
            id: defaultFormDataRef.current.id,
        };

        await editStatItem({ userID: uid, value: formatedData, key: "experience" });
    };

    const onEdit = async (id: string) => {
        const currentExp = experience.find((exp) => exp.id === id);
        if (!currentExp) return;
        const logoFile = await getImageFileByUrlFromStorage(storage, String(currentExp.logo));

        const formatedCurrentExp = {
            ...currentExp,
            enterYear: new Date(currentExp.enterYear),
            leaveYear: new Date(currentExp.leaveYear),
            logo: logoFile,
        };

        defaultFormDataRef.current = formatedCurrentExp;
        openEditForm();
    };

    return (
        <>
            <EditableStatSection
                sectionAdornment={experiences}
                title="Experiences"
                subtitle="Add experience to increase the chance of hiring"
                actionButtonText="Add Experience"
                onEdit={openAddForm}
            >
                <ExperienceList onHandleError={openAddForm} onEdit={onEdit} />
            </EditableStatSection>
            <StepperContainer
                isOpened={addFormOpened}
                onClose={closeAddForm}
                steps={experienceStepperContent}
                onSubmit={onAddExperienceItem}
            />
            <StepperContainer
                isOpened={editFormOpened}
                onClose={closeEditForm}
                steps={experienceStepperContent}
                onSaveChanges={onSaveChanges}
                defaultValues={defaultFormDataRef.current}
            />
        </>
    );
};

export default UserExperiences;
