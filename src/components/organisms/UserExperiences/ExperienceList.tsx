// MUI
import { keyframes, styled } from "@mui/material";
// Models
import { TExperienceList } from "./UserExperiences.model";
import { TEmployeeUser } from "models/user.model";
// Redux
import { useAppSelector } from "app/hooks";
import { useRemoveStatItemMutation } from "app/slices/userSlice";
import { RootState } from "app/store";
// Components
import ProfileBaseCard from "components/molecules/ProfileBaseCard/ProfileBaseCard";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
// Assets
import emptyBox from "assets/images/errors/emptyBox.svg";

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

export default ExperienceList;
