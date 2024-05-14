// React
import { useLayoutEffect, useState } from "react";
// MUI
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Components
import DatePicker from "components/atoms/DatePicker/DatePicker";
// Hook Form
import { useFormContext } from "react-hook-form";
// Zod
import z from "zod";
// Dayjs
import dayjs, { Dayjs } from "dayjs";

export const studyPeriodSchema = z
    .object({
        enterYear: z.date(),
        leaveYear: z.date(),
    })
    .refine(({ leaveYear, enterYear }) => leaveYear.getFullYear() - enterYear.getFullYear() >= 4, {
        message: "The difference between the dates must be at least 4 years",
        path: ["enterYear"],
    })
    .refine(({ leaveYear, enterYear }) => leaveYear.getFullYear() - enterYear.getFullYear() <= 6, {
        message: "The difference between the dates should not exceed 6 years",
        path: ["enterYear"],
    });

export type TStudyPeriodFormType = z.infer<typeof studyPeriodSchema>;

const StudyPeriod = () => {
    const { control, watch } = useFormContext<TStudyPeriodFormType>();
    const [enterYear, setEnterYear] = useState<Dayjs | undefined>(undefined);
    const [leaveYear, setLeaveYear] = useState<Dayjs | undefined>(undefined);

    const subscribeEnterYearDayPicker = watch("enterYear");
    const subscribeLeaveYearToDayPicker = watch("leaveYear");

    useLayoutEffect(() => {
        if (subscribeEnterYearDayPicker instanceof Date) setEnterYear(dayjs(subscribeEnterYearDayPicker));
        if (subscribeLeaveYearToDayPicker instanceof Date) setLeaveYear(dayjs(subscribeLeaveYearToDayPicker));
    }, [subscribeEnterYearDayPicker, subscribeLeaveYearToDayPicker]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <DatePicker
                        control={control}
                        name="enterYear"
                        label="enter year"
                        disableFuture
                        maxDate={leaveYear}
                        views={["year"]}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DatePicker
                        control={control}
                        name="leaveYear"
                        label="leave year"
                        minDate={enterYear}
                        views={["year"]}
                    />
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default StudyPeriod;
