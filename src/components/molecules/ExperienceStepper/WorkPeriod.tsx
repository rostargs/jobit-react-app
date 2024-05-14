// MUI
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Components
import DatePicker from "components/atoms/DatePicker/DatePicker";
// Dayjs
import dayjs, { Dayjs } from "dayjs";
// React
import { useLayoutEffect, useState } from "react";
// Hook form
import { useFormContext } from "react-hook-form";
// Zod
import z from "zod";

export const workPeriodSchema = z
    .object({
        enterYear: z.date(),
        leaveYear: z.date(),
    })
    .refine(({ enterYear, leaveYear }) => new Date(enterYear).getTime() !== new Date(leaveYear).getTime(), {
        message: "The dates cannot be equal",
        path: ["leaveYear"],
    });

export type TWorkPeriodFormType = z.infer<typeof workPeriodSchema>;

const WorkPeriod = () => {
    const { control, watch } = useFormContext<TWorkPeriodFormType>();
    const [fromDate, setFromDate] = useState<Dayjs | undefined>(undefined);
    const [toDate, setToDate] = useState<Dayjs | undefined>(undefined);

    const subscribeEnterYearDayPicker = watch("enterYear");
    const subscribeLeaveYearToDayPicker = watch("leaveYear");

    useLayoutEffect(() => {
        if (subscribeEnterYearDayPicker instanceof Date) setFromDate(dayjs(subscribeEnterYearDayPicker));
        if (subscribeLeaveYearToDayPicker instanceof Date) setToDate(dayjs(subscribeLeaveYearToDayPicker));
    }, [subscribeEnterYearDayPicker, subscribeLeaveYearToDayPicker]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <DatePicker control={control} label="from" name="enterYear" disableFuture maxDate={toDate} />
                </Grid>
                <Grid item xs={6}>
                    <DatePicker control={control} label="to" name="leaveYear" minDate={fromDate} disableFuture />
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default WorkPeriod;
