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
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function StepperContainer<T extends Record<string, any>>({
    steps,
    isOpened,
    onClose,
    onSubmit,
    defaultValues,
    onSaveChanges,
}: TStepperContainer<T>) {
    const [activeStep, setActiveStep] = useState(0);
    const validateSteps = useRef<Record<number, boolean> | null>(null);
    const [invalidStepIndex, setInvalidStepIndex] = useState<number | null>(null);

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

    const onTriggerCurrentStep = async () => {
        validateSteps.current![activeStep] = await trigger();
        setInvalidStepIndex(validateSteps.current![activeStep] === false ? activeStep : null);
    };

    const checkCompletedSteps = async (longStep: number) => {
        if (!validateSteps.current) return false;
        const stepsBefore = Object.keys(validateSteps.current).filter((key) => +key < longStep);
        await onTriggerCurrentStep();
        const isAllStepsBeforeValid = stepsBefore.every((step) => validateSteps.current![+step]);
        isAllStepsBeforeValid || setActiveStep(stepsBefore.findIndex((step) => !validateSteps.current![+step]));
        return isAllStepsBeforeValid;
    };

    const onMoveToSpecificStep = async (step: number) => {
        if (activeStep === step) return;
        await onTriggerCurrentStep();
        const isStepValid = step < activeStep || (await checkCompletedSteps(step));
        if (isStepValid) setActiveStep(step);
    };

    const onNextStep = async () => {
        await onTriggerCurrentStep();
        if (validateSteps.current![activeStep]) setActiveStep((prev) => prev + 1);
    };

    const onPreviousStep = async () => {
        await onTriggerCurrentStep();
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

    useLayoutEffect(() => {
        let validateState: Record<number, boolean> = {};
        steps.forEach((_, index) => (validateState[index] = false));
        validateSteps.current = validateState;
    }, []);

    return (
        <ModalContainer isOpened={isOpened} title="Add Experience" onClose={onClose}>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map(({ label }, index) => (
                    <Step key={label}>
                        <StepLabel
                            onClick={async () => await onMoveToSpecificStep(index)}
                            error={invalidStepIndex === index}
                        >
                            {label}
                        </StepLabel>
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
