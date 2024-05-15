// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import ProfileBaseCard from "components/molecules/ProfileBaseCard/ProfileBaseCard";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
import StepperContainer from "components/atoms/StepperContainer/StepperContainer";
// Assets
import cantFind from "assets/images/errors/cantFind.svg";
import educationImage from "assets/images/publicProfile/education.svg";
// Data
import { universityStepperContent } from "data/universityStepperContent";
// Hooks
import { useToggle } from "hooks/useToggle";
// MUI
import { keyframes, styled } from "@mui/material";
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
// Models
import { TEmployeeUser } from "models/user.model";
import { TFormDataResumeEducation } from "models/resume.model";
import { TEducationList } from "./UserEducation.model";
// React
import { Suspense, useRef } from "react";
// Firebase Config
import { storage } from "../../../firebaseConfig";
// Utils
import { getImageFileByUrlFromStorage } from "utils/uploadImageMethods";

const slideLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(70px);
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

const EducationList = ({ onHandleError, onEdit }: TEducationList) => {
    const { education, uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const [removeStatItem] = useRemoveStatItemMutation();
    const isUserHasEducation = !!education.length;

    const renderEducationList = education.map((edu) => (
        <AnimationWrapper key={edu.id}>
            <ProfileBaseCard
                {...edu}
                title={edu.faculty}
                subtitle={edu.universityTitle}
                onDelete={async () => await removeStatItem({ userID: uid, itemID: edu.id, key: "education" })}
                onEdit={() => onEdit(edu.id)}
            />
        </AnimationWrapper>
    ));

    return isUserHasEducation ? (
        renderEducationList
    ) : (
        <ErrorNotificationt
            image={cantFind}
            errorMessage="There is no information on educational institutions. Please add some so that HR can learn more about you 😶‍🌫️."
            buttonText="Add education item"
            onHandleError={onHandleError}
            width={180}
        />
    );
};

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
            enterYear: String(data.enterYear),
            leaveYear: String(data.leaveYear),
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
            enterYear: new Date(currentEducationItem.enterYear),
            leaveYear: new Date(currentEducationItem.leaveYear),
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
