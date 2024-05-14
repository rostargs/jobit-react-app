// MUI
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
// Model
import { TDatePicker } from "./DatePicker.model";
// Hook form
import { Controller, FieldValues } from "react-hook-form";
// Dayjs
import dayjs from "dayjs";

function DatePicker<T extends FieldValues>({ control, name, ...props }: TDatePicker<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                const dateInDayjsFormat = value ? dayjs(value) : null;
                const isError = !!error?.message;
                return (
                    <MuiDatePicker
                        name={name}
                        value={dateInDayjsFormat}
                        onChange={(newValue) => {
                            if (!newValue) return;
                            const formatedData = dayjs(newValue);
                            onChange(new Date(String(formatedData)));
                        }}
                        {...props}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: isError,
                                helperText: error?.message,
                            },
                        }}
                    />
                );
            }}
        />
    );
}

export default DatePicker;
