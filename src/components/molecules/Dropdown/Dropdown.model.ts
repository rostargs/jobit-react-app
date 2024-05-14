import { TNavItem } from "components/atoms/NavItem/NavItem.model";

export type TDropdown = {
    isOpen: boolean;
    links: TNavItem[];
    depthLevel: number;
};
