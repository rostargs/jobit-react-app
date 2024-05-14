// Components
import ModalContainer from "components/atoms/ModalContainer/ModalContainer";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
// Model
import { TBenefitForm } from "./BenefitForm.model";
import { TEmployerUser } from "models/user.model";
// Hook Form
import { useForm, SubmitHandler } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Data
import { benefits } from "data/benefits";
// MUI
import { Box, Button, Typography } from "@mui/material";
// Redux
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { useAddCompanyBenefitMutation } from "app/slices/userSlice";

const benefitFormSchema = z.object({
    benefit: z
        .string()
        .refine((str) => benefits.some((benefit) => benefit.benefit === str), { message: "Choose correct option." }),
});

export type TBenefitFormSchemaType = z.infer<typeof benefitFormSchema>;

const BenefitForm = ({ isOpened, onClose }: TBenefitForm) => {
    const { control, handleSubmit, reset } = useForm<TBenefitFormSchemaType>({ resolver: zodResolver(benefitFormSchema) });
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployerUser);
    const [addCompanyBenefit] = useAddCompanyBenefitMutation();

    const onSubmitForm: SubmitHandler<TBenefitFormSchemaType> = async (data) => {
        const formatedData = {
            ...data,
            id: nanoid(),
        };

        reset();
        await addCompanyBenefit({ userID: uid, data: formatedData });
        onClose();
    };

    return (
        <ModalContainer title="Add benefit" isOpened={isOpened} onClose={onClose}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitForm)}>
                <AutocompleteInput
                    control={control}
                    name="benefit"
                    label="Choose benefit"
                    optionLabel="benefit"
                    options={benefits}
                    renderOption={(params, { benefit, image }) => (
                        <Box component="li" {...params} display="flex" gap={1} alignItems="center">
                            {image}
                            <Typography variant="subtitle2">{benefit}</Typography>
                        </Box>
                    )}
                />
                <Box display="flex" alignItems="center" justifyContent="flex-end" marginTop={2} gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" type="submit">
                        Add benefit
                    </Button>
                </Box>
            </form>
        </ModalContainer>
    );
};

export default BenefitForm;
