// MUI
import { Box } from "@mui/material";
// Components
import EditableLabel from "components/atoms/EditableLabel/EditableLabel";
import EditableDetailSectionControls from "./EditableDetailSectionControls";
import NestedListProvider from "./NestedListProvider";
import NestedList from "./NestedList";
// Hook Form
import { useFormContext } from "react-hook-form";
// React
import { Fragment } from "react";
// Models
import { TEditableDetailSection } from "./EditableDetailSection.model";

function EditableDetailSection({ fields, remove }: TEditableDetailSection) {
    const { control } = useFormContext();

    return (
        <Box component="article">
            {fields.map((field, index) => (
                <Fragment key={field.id}>
                    <NestedListProvider currentIndex={index}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <EditableLabel control={control} name={`details[${index}].label`} />
                            <EditableDetailSectionControls onRemoveSection={() => remove(index)} />
                        </Box>
                        <NestedList />
                    </NestedListProvider>
                </Fragment>
            ))}
        </Box>
    );
}

export default EditableDetailSection;
