// MUI
import { Grid, useMediaQuery } from "@mui/material";
// Components
import ProfileBanner from "components/molecules/ProfileBanner/ProfileBanner";
import PublicProfileNav from "components/molecules/PublicProfileNav/PublicProfileNav";
import BasicUserInfo from "components/organisms/BasicUserInfo/BasicUserInfo";
import UserEducation from "components/organisms/UserEducation/UserEducation";
import UserExperiences from "components/organisms/UserExperiences/UserExperiences";
import UserLanguages from "components/organisms/UserLanguages/UserLanguages";
import UserSkills from "components/organisms/UserSkills/UserSkills";
import { RefObject, createRef, useLayoutEffect, useRef, useState } from "react";

const publicProfileSections = [
    {
        id: "information",
        element: <BasicUserInfo />,
    },
    {
        id: "experiences",
        element: <UserExperiences />,
    },
    {
        id: "education",
        element: <UserEducation />,
    },
    {
        id: "skills",
        element: <UserSkills />,
    },
    {
        id: "languages",
        element: <UserLanguages />,
    },
];

const PublicProfile = () => {
    const [sections, setSections] = useState<RefObject<HTMLElement>[] | null>(null);
    const sectionRefs = useRef(publicProfileSections.map(() => createRef<HTMLElement>())).current;
    const matches = useMediaQuery("(min-width: 1024px)");

    const renderProfileSections = publicProfileSections.map(({ id, element }, index) => (
        <section id={id} key={id} ref={sectionRefs[index]}>
            {element}
        </section>
    ));

    useLayoutEffect(() => {
        setSections(sectionRefs);
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ProfileBanner title="Rostik Savelko" subtitle="Frontend developer" />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {matches && (
                        <Grid item lg={3}>
                            <PublicProfileNav sections={sections} />
                        </Grid>
                    )}
                    <Grid item lg={9} gap={1} display="flex" flexDirection="column">
                        {renderProfileSections}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PublicProfile;
