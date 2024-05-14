// React
import { RefObject, useCallback, useLayoutEffect, useState } from "react";

export const useSectionNavigation = (sections: RefObject<Element>[] | null) => {
    const [onView, setOnView] = useState<string | null>(null);
    const CONTAINER = document.getElementById("main-content");

    const onNavigateToSection = useCallback(
        (sectionId: string) => {
            if (!sections || !CONTAINER) return;
            const sectionToScroll = sections.find((section) => section.current?.id === sectionId);
            if (sectionToScroll?.current) sectionToScroll.current.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        [sections]
    );

    const onIntesectSection = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setOnView(entry.target.id);
    };

    const options = {
        root: CONTAINER,
        rootMargin: "0px",
        threshold: 1,
    };

    useLayoutEffect(() => {
        if (!sections) return;

        const observer = new IntersectionObserver(onIntesectSection, options);

        sections.forEach((sections) => {
            const currentSection = sections.current;

            if (!currentSection) return;

            observer.observe(currentSection);
        });

        return () => {
            if (sections) sections.forEach((section) => section.current && observer.unobserve(section.current));
        };
    }, [sections]);

    return { onView, onNavigateToSection };
};
