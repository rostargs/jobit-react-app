// MUI
import { Grid } from "@mui/material";
// Components
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import FormInput from "components/atoms/FormInput/FormInput";
// Hook Form
import { useFormContext } from "react-hook-form";
// Zod
import z from "zod";
// Data
import { hierarchyLevels, positions } from "data/hierarchy";

export const positionSchema = z.object({
    position: z
        .string({ invalid_type_error: "Choose correct option" })
        .refine((str) => positions.some((pos) => pos.position === str)),
    level: z
        .string({ invalid_type_error: "Choose correct option" })
        .refine((str) => hierarchyLevels.some((hr) => hr.level === str)),
    role: z.string().trim().min(128).max(424),
});

export type TPositionFormType = z.infer<typeof positionSchema>;

const Position = () => {
    const methods = useFormContext<TPositionFormType>();
    const { control } = methods;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <AutocompleteInput
                            control={control}
                            label="choose your level"
                            name="level"
                            options={hierarchyLevels}
                            optionLabel="level"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AutocompleteInput
                            control={control}
                            label="choose your position"
                            name="position"
                            options={positions}
                            optionLabel="position"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormInput
                    name="role"
                    label="role description"
                    control={control}
                    type="text"
                    multiline
                    sx={{ paddingInline: "1rem" }}
                />
            </Grid>
        </Grid>
    );
};

export default Position;
