// Components
import ModalContainer from "components/atoms/ModalContainer/ModalContainer";
import RatingInput from "components/atoms/RatingInput/RatingInput";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
// Models
import { TSkillForm } from "./SkillForm.model";
import { TEmployeeUser } from "models/user.model";
// Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// MUI
import { Box, Button, Grid } from "@mui/material";
// Data
import { technologies } from "data/technologies";
import { technologyExperienceLevels } from "data/technologyExperienceLevels";
// Redux
import { nanoid } from "@reduxjs/toolkit";
import { addStaticlyStatItem, useAddStatItemMutation, useEditStatItemMutation } from "app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// React
import { useLayoutEffect } from "react";

const skillFormSchema = z.object({
    skillName: z
        .string()
        .refine((str) => technologies.some((tech) => tech.name === str), { message: "Choose a valid skill name" }),
    rating: z.number({ invalid_type_error: "Rate your skill level" }),
});

export type TSkillFormSchemaType = z.infer<typeof skillFormSchema>;

const SkillForm = ({ isOpened, onClose, defaultValues }: TSkillForm) => {
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const { control, handleSubmit, reset } = useForm<TSkillFormSchemaType>({ resolver: zodResolver(skillFormSchema) });
    const [addStatItem] = useAddStatItemMutation();
    const [editStatItem] = useEditStatItemMutation();
    const dispatch = useAppDispatch();

    const onSubmitForm: SubmitHandler<TSkillFormSchemaType> = async (data) => {
        const formatedData = {
            ...data,
            id: defaultValues ? defaultValues.id : nanoid(),
            rating: technologyExperienceLevels[data.rating as keyof typeof technologyExperienceLevels],
        };

        if (defaultValues) {
            await editStatItem({ userID: uid, value: formatedData, key: "skill" });
        } else {
            dispatch(addStaticlyStatItem({ value: formatedData, key: "skill" }));
            await addStatItem({ userID: uid, value: formatedData, key: "skill" });
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
                            control={control}
                            label="choose technolohy"
                            name="skillName"
                            optionLabel="name"
                            options={technologies}
                            helperText="Select a skill you want to add"
                            renderOption={(params, { name, logo }) => (
                                <Box component="li" {...params} display="flex" gap={1}>
                                    <img src={logo} alt={name} width={20} />
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
                            labels={technologyExperienceLevels}
                            helperText="Rate your skill level"
                        />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" type="submit">
                        {defaultValues ? "Change" : "Create"}
                    </Button>
                </Box>
            </form>
        </ModalContainer>
    );
};

export default SkillForm;
