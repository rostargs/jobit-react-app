// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import EducationList from "./EducationList";
import StepperContainer from "components/atoms/StepperContainer/StepperContainer";
// Assets
import educationImage from "assets/images/publicProfile/education.svg";
// Data
import { universityStepperContent } from "data/universityStepperContent";
// Hooks
import { useToggle } from "hooks/useToggle";
// Redux
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { addStaticlyStatItem, useAddStatItemMutation, useEditStatItemMutation } from "app/slices/userSlice";
import { nanoid } from "@reduxjs/toolkit";
// Models
import { TEmployeeUser } from "models/user.model";
import { TFormDataResumeEducation } from "models/resume.model";
// React
import { Suspense, useRef } from "react";
// Firebase Config
import { storage } from "../../../firebaseConfig";
// Utils
import { getImageFileByUrlFromStorage } from "utils/uploadImageMethods";
import { getYearFromDate, setDefaultDateByYear } from "utils/dateOperations";

const UserEducation = () => {
    const [addStatItem] = useAddStatItemMutation();
    const [editStatItem] = useEditStatItemMutation();
    const { uid, education } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const dispatch = useAppDispatch();
    const { active: addFormOpened, onSetToNegative: closeAddFrom, onSetToPositive: openAddForm } = useToggle(false);
    const { active: editFormOpened, onSetToPositive: openEditForm, onSetToNegative: closeEditForm } = useToggle(false);
    const currentEducationInfoRef = useRef<(TFormDataResumeEducation & { id: string }) | null>(null);

    const onAddEducationItem = async (data: TFormDataResumeEducation) => {
        const formatedData = {
            ...data,
            id: nanoid(),
            enterYear: getYearFromDate(data.enterYear),
            leaveYear: getYearFromDate(data.leaveYear),
        };
        dispatch(addStaticlyStatItem({ value: formatedData, key: "education" }));
        await addStatItem({ userID: uid, value: formatedData, key: "education" });
    };

    const onEdit = async (id: string) => {
        const currentEducationItem = education.find((edu) => edu.id === id);
        if (!currentEducationItem) return;
        const logoFile = await getImageFileByUrlFromStorage(storage, String(currentEducationItem.logo));

        const formatedData = {
            ...currentEducationItem,
            enterYear: setDefaultDateByYear(+currentEducationItem.enterYear),
            leaveYear: setDefaultDateByYear(+currentEducationItem.leaveYear),
            logo: logoFile,
        };

        currentEducationInfoRef.current = formatedData;
        openEditForm();
    };

    const onSaveChanges = async (data: TFormDataResumeEducation) => {
        if (!currentEducationInfoRef.current) return;

        const formatedData = {
            ...data,
            enterYear: String(data.enterYear),
            leaveYear: String(data.leaveYear),
            id: currentEducationInfoRef.current.id,
        };

        await editStatItem({ userID: uid, value: formatedData, key: "education" });
    };

    return (
        <>
            <EditableStatSection
                sectionAdornment={educationImage}
                title="Education & Certifications"
                subtitle="Add education to increase the chance of hiring"
                actionButtonText="Add Education"
                onEdit={openAddForm}
            >
                <Suspense fallback={<>Loading...</>}>
                    <EducationList onHandleError={openAddForm} onEdit={onEdit} />
                </Suspense>
            </EditableStatSection>
            <StepperContainer
                steps={universityStepperContent}
                isOpened={addFormOpened}
                onClose={closeAddFrom}
                onSubmit={onAddEducationItem}
            />
            <StepperContainer
                steps={universityStepperContent}
                isOpened={editFormOpened}
                onClose={closeEditForm}
                defaultValues={currentEducationInfoRef.current}
                onSaveChanges={onSaveChanges}
            />
        </>
    );
};

export default UserEducation;
