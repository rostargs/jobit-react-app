export type TViewSlice = { greeting: boolean };
export type TSetViewPropertyAction = { prop: keyof TViewSlice; value: boolean };
