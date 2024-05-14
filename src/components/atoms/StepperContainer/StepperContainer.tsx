// Components
import ModalContainer from "components/atoms/ModalContainer/ModalContainer";
// Model
import { TStepperContainer } from "./StepperContainer.model";
// MUI
import { Step, StepLabel, Stepper, Box, Button } from "@mui/material";
// Hook Form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// React
import { useEffect, useState } from "react";

function StepperContainer<T extends Record<string, any>>({
    steps,
    isOpened,
    onClose,
    onSubmit,
    defaultValues,
    onSaveChanges,
}: TStepperContainer<T>) {
    const [activeStep, setActiveStep] = useState(0);

    const schemas = steps.map((item) => item.validationRules);
    // @ts-ignore
    const validationSchema = z.union(schemas);
    type TExperienceStepperType = z.infer<typeof validationSchema>;

    const currentOptionSchema = validationSchema.options[activeStep];
    const isHasPreviousSteps = activeStep > 0;
    const isLastStep = activeStep === steps.length - 1;

    const methods = useForm<TExperienceStepperType>({
        resolver: currentOptionSchema && zodResolver(currentOptionSchema),
        mode: "onChange",
        shouldFocusError: true,
        defaultValues,
    });

    const { handleSubmit, trigger, reset, getValues } = methods;

    const onMoveToSpecificStep = async (step: number) => {
        const isTheSameStep = activeStep === step;
        const isPossibleStep = step - activeStep <= 1;
        const isStepBack = step < activeStep;
        const isStepValid = isStepBack ? true : !isTheSameStep && (await trigger());
        if (isPossibleStep && isStepValid) setActiveStep(step);
    };

    const onNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) setActiveStep((prev) => prev + 1);
    };

    const onPreviousStep = () => {
        setActiveStep((prev) => prev - 1);
    };

    const onSubmitFormStep: SubmitHandler<TExperienceStepperType> = () => {
        const formData = getValues();
        onSubmit?.(formData);
        onSaveChanges?.(formData);
        reset();
        onClose();
        setActiveStep(0);
    };

    useEffect(() => {
        if (defaultValues) reset(defaultValues);
    }, [defaultValues]);

    return (
        <ModalContainer isOpened={isOpened} title="Add Experience" onClose={onClose}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map(({ label }, index) => (
                    <Step key={label}>
                        <StepLabel onClick={() => onMoveToSpecificStep(index)}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box marginBlock={3}>
                <FormProvider {...methods}>
                    <form autoComplete="off">{steps[activeStep].component}</form>
                </FormProvider>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                {isHasPreviousSteps ? (
                    <Button variant="outlined" onClick={onPreviousStep}>
                        Previous
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                )}
                {isLastStep ? (
                    <Button variant="contained" onClick={handleSubmit(onSubmitFormStep)}>
                        {defaultValues ? "Save" : "Create"}
                    </Button>
                ) : (
                    <Button variant="contained" onClick={onNextStep}>
                        Next
                    </Button>
                )}
            </Box>
        </ModalContainer>
    );
}

export default StepperContainer;
