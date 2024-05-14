export type TRoomReference = {
    roomID: string;
};

export type TMessangerRoom = {
    roomID: string;
    contributors: string[];
    messages: TMessage[];
    lastChange: string | null;
};

export type TMessage = {
    id: string;
    message: string;
    createdAt: string;
    sender: string;
};
