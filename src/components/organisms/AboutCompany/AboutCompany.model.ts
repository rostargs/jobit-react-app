export type TListItems = {
    fields: Record<"id", string>[];
    onDelete: (id: number) => void;
    isEditing: boolean;
    isDragging: boolean;
    onSwap: (from: number, to: number) => void;
};

export type TEditableListProps = {
    isDraggable: boolean;
};
