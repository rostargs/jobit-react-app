// MUI
import { keyframes, styled } from "@mui/material";
// Models
import { TEducationList } from "./UserEducation.model";
import { TEmployeeUser } from "models/user.model";
// Redux
import { RootState } from "app/store";
import { useRemoveStatItemMutation } from "app/slices/userSlice";
import { useAppSelector } from "app/hooks";
// Components
import ProfileBaseCard from "components/molecules/ProfileBaseCard/ProfileBaseCard";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
// Assets
import cantFind from "assets/images/errors/cantFind.svg";

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

export default EducationList;
