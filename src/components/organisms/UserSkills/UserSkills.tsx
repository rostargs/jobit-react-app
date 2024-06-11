// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import SkillForm, { TSkillFormSchemaType } from "components/molecules/SkillForm/SkillForm";
import ProfileSmallCard from "components/molecules/ProfileSmallCard/ProfileSmallCard";
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// Assets
import skills from "assets/images/publicProfile/skills.svg";
// MUI
import { Grid, keyframes, styled } from "@mui/material";
// Hooks
import { useToggle } from "hooks/useToggle";
// Data
import { technologies } from "data/technologies";
// Model
import { TEmployeeUser } from "models/user.model";
import { TSkillList } from "./UserSkills.model";
// Assets
import sadMail from "assets/images/errors/sadMail.svg";
// React
import { useRef, Fragment } from "react";
// Redux
import { useRemoveStatItemMutation } from "app/slices/userSlice";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { technologyExperienceLevels } from "data/technologyExperienceLevels";

const opacity = keyframes`
    from {
        opacity: 0;
        scale: 0.2;
    }
    to{
        opacity: 1;
        scale: 1;
    }
`;

const AnimationWrapper = styled("div")({
    animation: `${opacity} both`,
    animationTimeline: "view()",
    animationRange: "entry",
});

const SkillList = ({ onHandleError, onEdit }: TSkillList) => {
    const { skill, uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const [removeStatItem] = useRemoveStatItemMutation();

    const isUserHasSkills = !!skill.length;

    const renderUserSkills = skill.map(({ id, rating, skillName }) => {
        const currentLogo = technologies.find((tech) => tech.name === skillName)?.logo;
        return (
            <Grid item md={6} key={id}>
                <AnimationWrapper>
                    <ProfileSmallCard
                        title={skillName}
                        subtitle={rating}
                        image={currentLogo}
                        onDelete={async () => await removeStatItem({ userID: uid, itemID: id, key: "skill" })}
                        onEdit={() => onEdit(id)}
                    />
                </AnimationWrapper>
            </Grid>
        );
    });

    return isUserHasSkills ? (
        <Grid container spacing={1}>
            {renderUserSkills}
        </Grid>
    ) : (
        <ErrorNotification
            errorMessage="Unfortunately, you do not currently have any specialised skills to display 😑."
            image={sadMail}
            buttonText="Add skill item"
            onHandleError={onHandleError}
            width={180}
        />
    );
};

const UserSkills = () => {
    const { active: addFormOpend, onSetToNegative: closeAddForm, onSetToPositive: openAddForm } = useToggle(false);
    const { active: editForm, onSetToNegative: closeEditForm, onSetToPositive: openEditForm } = useToggle(false);
    const { skill } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const currentSkillDataRef = useRef<(TSkillFormSchemaType & { id: string }) | null>(null);

    const onEdit = (id: string) => {
        const currentSkillData = skill.find((item) => item.id === id);
        if (!currentSkillData) return;
        let rating: number | null = null;

        Object.keys(technologyExperienceLevels).forEach((key) => {
            if (technologyExperienceLevels[+key as keyof typeof technologyExperienceLevels] === currentSkillData.rating)
                rating = +key;
        });

        if (!rating) return;

        const formatedData = {
            ...currentSkillData,
            rating,
        };

        currentSkillDataRef.current = formatedData;
        openEditForm();
    };

    return (
        <Fragment>
            <EditableStatSection
                sectionAdornment={skills}
                title="Skills"
                subtitle="Add skills to increase the chance of hiring"
                actionButtonText="Add Skill"
                onEdit={openAddForm}
            >
                <SkillList onHandleError={openAddForm} onEdit={onEdit} />
            </EditableStatSection>
            <SkillForm isOpened={addFormOpend} onClose={closeAddForm} />
            <SkillForm isOpened={editForm} onClose={closeEditForm} defaultValues={currentSkillDataRef.current} />
        </Fragment>
    );
};

export default UserSkills;
