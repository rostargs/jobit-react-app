export type TProfileBaseCard =
    | (TBaseProfileCardProps & { place?: never; gradeLevel: string; description?: never })
    | (TBaseProfileCardProps & { place: string; gradeLevel?: never; description: string });

type TBaseProfileCardProps = {
    title: string;
    subtitle: string;
    enterYear: Date | string;
    leaveYear: Date | string;
    logo: File | string;
    onEdit?: () => void;
    onDelete?: () => void;
};
