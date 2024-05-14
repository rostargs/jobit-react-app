export enum SearchTypes {
    RECENT = "recent",
    OPTIONS = "options",
}

export type TAdvancedSearch = {
    headerHeight: number;
};

export type TRecentSearch = {
    toggleMode: () => void;
};

export type TSearchMenuProps = TAdvancedSearch;
