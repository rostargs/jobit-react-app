// Model
import { TEmployeeUser } from "models/user.model";
import { TLanguageFrom } from "./LanguageForm.model";
// Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// MUI
import { Box, Button, Grid } from "@mui/material";
// Data
import { languageLevels, languages } from "data/languages";
// Components
import ModalContainer from "components/atoms/ModalContainer/ModalContainer";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import RatingInput from "components/atoms/RatingInput/RatingInput";
// Redux
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addStaticlyStatItem, useAddStatItemMutation, useEditStatItemMutation } from "app/slices/userSlice";
import { RootState } from "app/store";
// React
import { useLayoutEffect } from "react";
// Utils
import { formRequiredMessages } from "utils/formSettings";

const languageFormSchema = z.object({
    language: z
        .string({ required_error: formRequiredMessages.select_option })
        .refine((str) => languages.some((ln) => ln.name === str), { message: formRequiredMessages.select_option }),
    rating: z.number({ required_error: formRequiredMessages.incorrect_level }),
});

export type TLanguageFormSchemaType = z.infer<typeof languageFormSchema>;

const LanguageForm = ({ isOpened, onClose, defaultValues }: TLanguageFrom) => {
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const { control, handleSubmit, reset } = useForm<TLanguageFormSchemaType>({
        resolver: zodResolver(languageFormSchema),
    });
    const [addStatItem] = useAddStatItemMutation();
    const [editStatItem] = useEditStatItemMutation();
    const dispatch = useAppDispatch();

    const onSubmitForm: SubmitHandler<TLanguageFormSchemaType> = async (data) => {
        const formatedData = {
            ...data,
            rating: languageLevels[data.rating as keyof typeof languageLevels],
            id: defaultValues ? defaultValues.id : nanoid(),
        };

        if (defaultValues) {
            await editStatItem({ userID: uid, value: formatedData, key: "languages" });
        } else {
            dispatch(addStaticlyStatItem({ value: formatedData, key: "languages" }));
            await addStatItem({ userID: uid, value: formatedData, key: "languages" });
        }

        reset();
        onClose();
    };

    useLayoutEffect(() => {
        if (defaultValues) reset(defaultValues);
    }, [defaultValues]);

    return (
        <ModalContainer isOpened={isOpened} onClose={onClose} title="Add skill">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitForm)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AutocompleteInput
                            label="choose language"
                            control={control}
                            name="language"
                            optionLabel="name"
                            options={languages}
                            helperText="Select a language you want to add"
                            renderOption={(params, { name, image }) => (
                                <Box component="li" {...params} display="flex" gap={1}>
                                    <img src={image} alt={name} width={20} />
                                    {name}
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RatingInput
                            control={control}
                            name="rating"
                            size="large"
                            precision={0.5}
                            labels={languageLevels}
                            helperText="Assess your language level"
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" type="submit">
                        Create
                    </Button>
                </Box>
            </form>
        </ModalContainer>
    );
};

export default LanguageForm;
