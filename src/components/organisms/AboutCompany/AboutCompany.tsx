// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import EditableListItem from "components/atoms/EditableListItem/EditableListItem";
import ErrorNotification from "components/atoms/ErrorNotification/ErrorNotification";
// Assets
import info from "assets/images/publicProfile/info.svg";
import empty from "assets/images/errors/emptyBox.svg";
// MUI
import { Box, Button, List, SpeedDial, SpeedDialAction, styled, useTheme } from "@mui/material";
// Hook Form
import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Models
import { TEditableListProps, TListItems } from "./AboutCompany.model";
// Hooks
import { useToggle } from "hooks/useToggle";
// MUI Icons
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PanToolIcon from "@mui/icons-material/PanTool";
// React
import { DragEvent, useLayoutEffect, useRef } from "react";

const DEFAULT_TEXT = "";

const EditableList = styled(List, { shouldForwardProp: (prop) => prop !== "isDraggable" })<TEditableListProps>(
    ({ isDraggable }) => ({
        listStylePosition: "outside",
        listStyleType: isDraggable ? "none" : "disc",
        marginLeft: isDraggable ? 0 : "2rem",
        padding: 0,
    })
);

const StyledSpeedDial = styled(SpeedDial)({
    position: "absolute",
    right: 0,
    bottom: 0,
});

const companyInfoSchema = z.object({
    info: z.array(z.object({ text: z.string().trim().min(24).max(124) })),
});

type TCompanyInfoSchemaType = z.infer<typeof companyInfoSchema>;

const ListItems = ({ fields, onDelete, isEditing, isDragging, onSwap }: TListItems) => {
    const { control } = useFormContext();
    const theme = useTheme();
    const activeListItemID = useRef<number | null>(null);

    const onDragStart = (event: DragEvent<HTMLLIElement>, index: number) => {
        activeListItemID.current = index;
    };

    const onDragOver = (event: DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        const hoveredListItemID = +event.currentTarget.getAttribute("datatype-index")!;
        if (activeListItemID.current === hoveredListItemID) return;
        event.currentTarget.style.borderColor = theme.palette.divider;
    };

    const onDragLeave = (event: DragEvent<HTMLLIElement>) => {
        event.currentTarget.style.borderColor = "transparent";
    };

    const onDrop = (event: DragEvent<HTMLLIElement>) => {
        const hoveredListItemID = +event.currentTarget.getAttribute("datatype-index")!;
        event.currentTarget.style.borderColor = "transparent";
        onSwap(activeListItemID.current!, hoveredListItemID);
    };

    const renderEditableFields = fields.map((field, index) => (
        <EditableListItem
            key={field.id}
            control={control}
            name={`info[${index}].text`}
            onDelete={onDelete}
            index={index}
            baseInputProps={{ disabled: !isEditing }}
            listItemProps={{
                draggable: isDragging,
                onDragStart: (e) => onDragStart(e, index),
                onDragOver,
                onDragLeave,
                onDrop,
            }}
        />
    ));

    return !!fields.length ? (
        <EditableList isDraggable={isDragging}>{renderEditableFields}</EditableList>
    ) : (
        <ErrorNotification errorMessage="There is no information about your company 😒." image={empty} width={180} />
    );
};

const AboutCompany = () => {
    const { active, onSetToPositive, onSetToNegative } = useToggle(false);
    const { active: dragging, onToggle: onToggleDragging, onSetToNegative: onDisableDragging } = useToggle(false);
    const methods = useForm<TCompanyInfoSchemaType>({ resolver: zodResolver(companyInfoSchema), mode: "onChange" });
    const { fields, append, remove, prepend, swap } = useFieldArray({ name: "info", control: methods.control });

    const onSwapListItems = (from: number, to: number) => {
        swap(from, to);
    };

    const onStartDragging = () => {
        if (fields.length <= 1) return;
        onToggleDragging();
    };

    const onStopEditing = () => {
        onSetToNegative();
        onDisableDragging();
    };

    const onSubmitCompanyInfo: SubmitHandler<TCompanyInfoSchemaType> = (data) => {
        console.log(data);
        onStopEditing();
    };

    const speedDialControls = [
        { tooltipTitle: "Unshift", icon: <FirstPageIcon />, onClick: () => prepend({ text: DEFAULT_TEXT }) },
        { tooltipTitle: "Push", icon: <LastPageIcon />, onClick: () => append({ text: DEFAULT_TEXT }) },
        {
            tooltipTitle: "Replace",
            icon: <PanToolIcon color={dragging ? "primary" : "inherit"} />,
            onClick: onStartDragging,
        },
        { tooltipTitle: "Save", icon: <SaveAsIcon />, onClick: methods.handleSubmit(onSubmitCompanyInfo) },
    ];

    const renderSpeedDialControls = speedDialControls.map((control) => (
        <SpeedDialAction {...control} key={control.tooltipTitle} />
    ));

    useLayoutEffect(() => {
        if (fields.length <= 1) onDisableDragging();
    }, [fields]);

    return (
        <EditableStatSection
            title="About company"
            subtitle="Add some list items to describe your company."
            sectionAdornment={info}
            actionButtonText="Edit"
            onEdit={onSetToPositive}
            isActionButtonHidden={active}
        >
            <FormProvider {...methods}>
                <ListItems
                    fields={fields}
                    onDelete={remove}
                    isEditing={active}
                    isDragging={dragging}
                    onSwap={onSwapListItems}
                />
            </FormProvider>
            {active && (
                <Box display="flex" alignItems="center" justifyContent="space-between" position="relative" marginTop={4}>
                    <Button onClick={onStopEditing} variant="outlined">
                        Close
                    </Button>
                    <StyledSpeedDial icon={<SpeedDialIcon />} ariaLabel="Edit controls" direction="left">
                        {renderSpeedDialControls}
                    </StyledSpeedDial>
                </Box>
            )}
        </EditableStatSection>
    );
};

export default AboutCompany;
