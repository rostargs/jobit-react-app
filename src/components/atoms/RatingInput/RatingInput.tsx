// MUI
import { Box, FormControl, FormHelperText, Rating, Typography } from "@mui/material";
// Model
import { TRatingInput } from "./RatingInput.model";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";

function RatingInput<T extends FieldValues>({
    control,
    name,
    labels,
    helperText,
    precision = 1,
    ...props
}: TRatingInput<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState: { error }, field: { value, onChange } }) => {
                return (
                    <FormControl fullWidth error={!!error?.message}>
                        <Box display="flex" gap={2} alignItems="center">
                            <Rating
                                value={value}
                                onChange={(_, value) => onChange(value)}
                                precision={precision}
                                {...props}
                            />
                            {value && labels && (
                                <>
                                    <pre> - </pre>
                                    <Typography variant="body1" component="p">
                                        {labels[value]}
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <FormHelperText>{error?.message || helperText}</FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

export default RatingInput;
