// Model
import { TAutocompleteInput, TAutocompleteInputOpition } from "./AutocompleteInput.model";
// MUI
import { Autocomplete, FormControl, FormHelperText, TextField, styled, autocompleteClasses } from "@mui/material";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";

const Content = styled(FormControl)(({ theme, error }) => ({
    position: "relative",

    [`& > .${autocompleteClasses.root} fieldset`]: error && {
        borderColor: theme.palette.error.main,
    },
    [`& > .${autocompleteClasses.focused} .MuiOutlinedInput-notchedOutline`]: error && {
        borderColor: `${theme.palette.error.main} !important`,
    },
    [`& > .${autocompleteClasses.focused} .MuiInputLabel-root`]: error && {
        color: theme.palette.error.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": error && {
        borderColor: theme.palette.error.main,
    },
}));

function AutocompleteInput<T extends FieldValues, Y extends Record<string, string>>({
    name,
    label,
    options,
    control,
    helperText,
    optionLabel,
    ...rest
}: TAutocompleteInput<T, Y>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => {
                const currentValue = options.find((option) => option[optionLabel] === value);
                return (
                    <Content error={!!error?.message} fullWidth>
                        <Autocomplete
                            disablePortal
                            defaultValue={currentValue}
                            onChange={(_, newValue) => {
                                const field = newValue as TAutocompleteInputOpition<Y>;
                                if (!field) return;
                                onChange(field[optionLabel]);
                            }}
                            onInputChange={(_, value) => onChange(value)}
                            id={name}
                            options={options}
                            {...rest}
                            renderInput={(params) => (
                                <TextField {...params} label={label} inputRef={ref} error={!!error?.message} />
                            )}
                            //@ts-ignore
                            getOptionLabel={(option) => option[optionLabel]}
                            onBlur={onBlur}
                        />
                        <FormHelperText sx={{ position: "absolute", top: "100%" }}>
                            {error?.message || helperText}
                        </FormHelperText>
                    </Content>
                );
            }}
        />
    );
}

export default AutocompleteInput;
