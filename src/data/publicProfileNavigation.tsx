// Model
import { TNavIcon } from "components/atoms/NavIcon/NavIcon.model";
// MUI Icons
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GTranslateIcon from "@mui/icons-material/GTranslate";

export const publicProfileNavigation: TNavIcon[] = [
    {
        to: "information",
        label: "Information",
        startAdornment: <PersonIcon />,
    },
    {
        to: "experiences",
        label: "Experiences",
        startAdornment: <BusinessCenterIcon />,
    },
    {
        to: "education",
        label: "Education",
        startAdornment: <EmojiEventsIcon />,
    },
    {
        to: "skills",
        label: "Skills",
        startAdornment: <CardGiftcardIcon />,
    },
    {
        to: "languages",
        label: "Languages",
        startAdornment: <GTranslateIcon />,
    },
];
