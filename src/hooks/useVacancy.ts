// Redux
import { useAppSelector } from "app/hooks";
import { useApplyForVacancyMutation, useSaveVacancyMutation } from "app/slices/userSlice";
import { RootState } from "app/store";
// Models
import { USER_TYPE } from "models/user.model";
// React
import { useCallback } from "react";

type TUseVacancy = {
    vacancyID: string;
};

export const useVacancy = ({ vacancyID }: TUseVacancy) => {
    const user = useAppSelector((state: RootState) => state.user.currentUser);
    const [saveVacancy] = useSaveVacancyMutation();
    const [applyForVacancy] = useApplyForVacancyMutation();

    const onSaveVacancy = useCallback(async () => {
        if (!user || user?.accountType === USER_TYPE.EMPLOYER) return;
        await saveVacancy({ vacancyID, userID: user.uid });
    }, [vacancyID]);

    const onApplyForVacancy = useCallback(async () => {
        if (!user || user?.accountType === USER_TYPE.EMPLOYER) return;
        await applyForVacancy({ vacancyID, userID: user.uid });
    }, [vacancyID]);

    return { user, onSaveVacancy, onApplyForVacancy };
};
