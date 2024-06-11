// React
import { useContext } from "react";
// Context
import { NestedListContext } from "./NestedListProvider";
// Hook Form
import { useFormContext } from "react-hook-form";
// Components
import EditableListItem from "components/atoms/EditableListItem/EditableListItem";
// MUI
import { List, styled } from "@mui/material";

const StyledList = styled(List)({
    listStyleType: "disc",
    marginLeft: "2rem",
    padding: 0,
});

const NestedList = () => {
    const { control } = useFormContext();
    const values = useContext(NestedListContext);

    if (!values) throw new Error("No context provided!");

    const { fields, name, remove } = values;

    return (
        <StyledList>
            {fields.map((item, index) => (
                <EditableListItem
                    key={item.id}
                    control={control}
                    index={index}
                    name={`${name}[${index}].text`}
                    onDelete={() => remove(index)}
                />
            ))}
        </StyledList>
    );
};

export default NestedList;
