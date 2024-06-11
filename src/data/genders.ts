export const genders = [
    {
        gender: "Male",
    },
    {
        gender: "Female",
    },
];

export type TGendersValues = (typeof genders)[number]["gender"];
