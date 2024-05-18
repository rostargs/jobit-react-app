// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import ProfileSmallCard from "components/molecules/ProfileSmallCard/ProfileSmallCard";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
import LanguageForm, { TLanguageFormSchemaType, languageLevels } from "components/molecules/LanguageForm/LanguageForm";
// Assets
import languagesImage from "assets/images/publicProfile/language.svg";
import planet from "assets/images/errors/planet.svg";
// MUI
import { Grid, keyframes, styled } from "@mui/material";
// Model
import { TEmployeeUser } from "models/user.model";
import { TLanguagesList } from "./UserLanguages.model";
// Data
import { languages as allLang } from "data/languages";
// React
import { Fragment, useCallback, useRef } from "react";
// Redux
import { useToggle } from "hooks/useToggle";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { useRemoveStatItemMutation } from "app/slices/userSlice";

const opacity = keyframes`
    from{
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

const LanguagesList = ({ onHandleError, onEdit }: TLanguagesList) => {
    const { languages, uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const [removeStatItem] = useRemoveStatItemMutation();

    const isUserHasLanguages = !!languages.length;

    const renderLanguagesList = useCallback(
        () =>
            languages.map(({ id, language, rating }) => {
                const currentLang = allLang.find((lang) => lang.name === language);
                return (
                    <Grid item md={6} key={id}>
                        <AnimationWrapper>
                            <ProfileSmallCard
                                title={language}
                                subtitle={rating}
                                onDelete={async () => await removeStatItem({ userID: uid, key: "languages", itemID: id })}
                                onEdit={() => onEdit(id)}
                                image={currentLang?.image}
                            />
                        </AnimationWrapper>
                    </Grid>
                );
            }),
        [languages]
    );

    return isUserHasLanguages ? (
        <Grid container spacing={1}>
            {renderLanguagesList()}
        </Grid>
    ) : (
        <ErrorNotificationt
            image={planet}
            errorMessage="Please fill in the list of languages you speak 🌏."
            buttonText="Add language"
            onHandleError={onHandleError}
            width={180}
        />
    );
};
const UserLanguages = () => {
    const { active: addFormOpend, onSetToNegative: closeAddForm, onSetToPositive: openAddForm } = useToggle(false);
    const { active: editForm, onSetToNegative: closeEditForm, onSetToPositive: openEditForm } = useToggle(false);
    const { languages } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const currentLanguageDataRef = useRef<(TLanguageFormSchemaType & { id: string }) | null>(null);

    const onEdit = (id: string) => {
        const currentLanguageData = languages.find((lang) => lang.id === id);
        if (!currentLanguageData) return;
        let rating: number | null = null;

        Object.keys(languageLevels).forEach((key) => {
            if (languageLevels[+key as keyof typeof languageLevels] === currentLanguageData.rating) rating = +key;
        });

        if (!rating) return;

        const formatedData = {
            ...currentLanguageData,
            rating,
        };

        currentLanguageDataRef.current = formatedData;
        openEditForm();
    };

    return (
        <Fragment>
            <EditableStatSection
                sectionAdornment={languagesImage}
                title="Languages"
                actionButtonText="Add language"
                subtitle="Add languages to increase the chance of hiring"
                onEdit={openAddForm}
            >
                <LanguagesList onHandleError={openAddForm} onEdit={onEdit} />
            </EditableStatSection>
            <LanguageForm isOpened={addFormOpend} onClose={closeAddForm} />
            <LanguageForm isOpened={editForm} onClose={closeEditForm} defaultValues={currentLanguageDataRef.current} />
        </Fragment>
    );
};

export default UserLanguages;
