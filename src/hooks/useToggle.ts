// React
import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean) => {
    const [active, setActive] = useState(initialValue);

    const onToggle = useCallback(() => {
        setActive((prev) => !prev);
    }, [active]);

    const onSetToPositive = useCallback(() => {
        setActive(true);
    }, [active]);

    const onSetToNegative = useCallback(() => {
        setActive(false);
    }, [active]);

    return { active, onToggle, onSetToNegative, onSetToPositive };
};
