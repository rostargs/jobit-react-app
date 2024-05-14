// Componenets
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import BenefitItem from "components/atoms/BenefitItem/BenefitItem";
import BenefitForm from "components/molecules/BenefitForm/BenefitForm";
import ErrorNotificationt from "components/atoms/ErrorNotification/ErrorNotificationt";
// Assets
import benefit from "assets/images/publicProfile/benefit.svg";
import cantFind from "assets/images/errors/cantFind.svg";
// MUI
import { Grid } from "@mui/material";
// Hooks
import { useToggle } from "hooks/useToggle";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { useRemoveCompanyBenefitMutation } from "app/slices/userSlice";
// Models
import { TEmployerUser } from "models/user.model";
import { TCompanyBenefitsList } from "./CompanyBenefits.model";
// Data
import { benefits as benefitsList } from "data/benefits";

const CompanyBenefitsList = ({ onHandleError }: TCompanyBenefitsList) => {
    const { benefits, uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployerUser);
    const [removeCompanyBenefit] = useRemoveCompanyBenefitMutation();

    const isUserHasBenefits = !!benefits.length;

    const renderBenefitsList = benefits.map(({ benefit, id }) => {
        const current = benefitsList.find((item) => item.benefit === benefit)!;
        return (
            <Grid item xs={6} key={id}>
                <BenefitItem
                    image={current.image}
                    text={benefit}
                    onDelete={async () => await removeCompanyBenefit({ userID: uid, benefitID: id })}
                />
            </Grid>
        );
    });

    return isUserHasBenefits ? (
        <Grid container spacing={1}>
            {renderBenefitsList}
        </Grid>
    ) : (
        <ErrorNotificationt
            errorMessage="There is no benefits added yet 🤔."
            buttonText="Add benefit"
            image={cantFind}
            onHandleError={onHandleError}
            width={180}
        />
    );
};

const CompanyBenefits = () => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);
    return (
        <>
            <EditableStatSection
                title="Benefits"
                subtitle="Add benefits to your company profile."
                sectionAdornment={benefit}
                actionButtonText="Add benefit"
                onEdit={onSetToPositive}
            >
                <CompanyBenefitsList onHandleError={onSetToPositive} />
            </EditableStatSection>
            <BenefitForm isOpened={active} onClose={onSetToNegative} />
        </>
    );
};

export default CompanyBenefits;
