// Components
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// Assets
import image from "assets/images/errors/sadMail.svg";

const SelectVacancy = () => {
    return <ErrorNotification image={image} errorMessage="Please, choose a vacancy from the list." />;
};

export default SelectVacancy;
