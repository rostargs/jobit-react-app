// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import StepperContainer from "components/atoms/StepperContainer/StepperContainer";
import ExperienceList from "./ExperienceList";
// Assets
import experiences from "assets/images/publicProfile/experience.svg";
// Hooks
import { useToggle } from "hooks/useToggle";
// Data
import { experienceStepperContent } from "data/experienceStepperContent";
// Models
import { TEmployeeUser } from "models/user.model";
import { TFormDataResumeExperience } from "models/resume.model";
// Redux
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { addStaticlyStatItem, useAddStatItemMutation, useEditStatItemMutation } from "app/slices/userSlice";
import { nanoid } from "@reduxjs/toolkit";
// Firebase Config
import { storage } from "../../../firebaseConfig";
// Utils
import { getImageFileByUrlFromStorage } from "utils/uploadImageMethods";
// React
import { Fragment, useRef } from "react";

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
        <Fragment>
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
        </Fragment>
    );
};

export default UserExperiences;
