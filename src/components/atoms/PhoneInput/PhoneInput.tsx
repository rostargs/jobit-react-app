import { Controller, FieldValues } from "react-hook-form";
import { TPhoneInput } from "./PhoneInput.model";
import { FormControl, FormHelperText } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";

function PhoneInput<T extends FieldValues>({ control, name, helperText, label }: TPhoneInput<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                const isError = !!error?.message;
                return (
                    <FormControl error={isError} fullWidth sx={{ position: "relative" }}>
                        <MuiPhoneNumber
                            defaultCountry="ua"
                            onChange={onChange}
                            fullWidth
                            error={isError}
                            variant="outlined"
                            label={label}
                            enableLongNumbers={false}
                        />
                        <FormHelperText sx={{ position: "absolute", top: "100%" }}>
                            {error?.message || helperText}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

export default PhoneInput;
