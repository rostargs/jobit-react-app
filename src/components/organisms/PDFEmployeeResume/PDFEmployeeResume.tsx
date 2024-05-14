// React PDF
import { Page, View, Document, StyleSheet, Font, Text } from "@react-pdf/renderer";
// Components
import ResumeUserInfo from "./ResumeUserInfo";
import Content from "./Content";
import ExperinceItem from "./ExperinceItem";
import EducationItem from "./EducationItem";
import SkillItem from "./SkillItem";
// Assets
import thin from "assets/fonts/Outfit-Thin.ttf";
import extraLight from "assets/fonts/Outfit-ExtraLight.ttf";
import light from "assets/fonts/Outfit-Light.ttf";
import regular from "assets/fonts/Outfit-Regular.ttf";
import medium from "assets/fonts/Outfit-Medium.ttf";
import semiBold from "assets/fonts/Outfit-SemiBold.ttf";
import bold from "assets/fonts/Outfit-Bold.ttf";
// Models
import { TEducationList, TExperienceList, TPDFEmployeeResume, TSkillList } from "./PDFEmployeeResume.model";

const ExperienceList = ({ experience }: TExperienceList) => {
    const isEmployeeHasExp = !!experience.length;
    const renderExpList = experience.map((exp) => <ExperinceItem {...exp} key={exp.id} />);
    return <View style={experienceList.wrapper}>{isEmployeeHasExp ? renderExpList : <Text>No exp</Text>}</View>;
};

const EducationList = ({ education }: TEducationList) => {
    const isEmployeeHasEducation = !!education.length;
    const renderEduList = education.map((edu) => (
        <View style={educationList.item} key={edu.id}>
            <EducationItem {...edu} />
        </View>
    ));
    return <View style={educationList.wrapper}>{isEmployeeHasEducation ? renderEduList : <Text>No edu</Text>}</View>;
};

const SkillList = ({ skills }: TSkillList) => {
    const isEmployeeHasSkills = !!skills.length;
    const renderSkillList = skills.map((skill) => (
        <View style={skillList.item} key={skill.id}>
            <SkillItem {...skill} />
        </View>
    ));
    return <View style={skillList.wrapper}>{isEmployeeHasSkills ? renderSkillList : <Text>No skills</Text>}</View>;
};

const PDFEmployeeResume = ({ userData }: TPDFEmployeeResume) => {
    const { education, experience, skill, languages, data } = userData;
    return (
        <Document>
            <Page size="A4" wrap={false}>
                <View style={styles.content}>
                    <View style={styles.aside}>
                        <ResumeUserInfo languages={languages} data={data} />
                    </View>
                    <View style={styles.mainInfo}>
                        <Content title="Experience">
                            <ExperienceList experience={experience} />
                        </Content>
                        <Content title="Education">
                            <EducationList education={education} />
                        </Content>
                        <Content title="Skills" lastChild>
                            <SkillList skills={skill} />
                        </Content>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFEmployeeResume;

Font.register({
    family: "Outfit",
    fonts: [
        { src: thin, fontWeight: 100 },
        { src: extraLight, fontWeight: 200 },
        { src: light, fontWeight: 300 },
        { src: regular, fontWeight: 400 },
        { src: medium, fontWeight: 500 },
        { src: semiBold, fontWeight: 600 },
        { src: bold, fontWeight: 700 },
    ],
});

const styles = StyleSheet.create({
    viewer: { width: "100vw", height: "100dvh" },
    content: { display: "flex", flexDirection: "row" },
    aside: { width: 236 },
    mainInfo: { padding: "32px 16px", width: "100%" },
});

const experienceList = StyleSheet.create({
    wrapper: { display: "flex", flexDirection: "column", gap: 12 },
});
const educationList = StyleSheet.create({
    wrapper: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 6 },
    item: { flexBasis: "49%", flexGrow: 0, minWidth: "49%", height: "100%" },
});
const skillList = StyleSheet.create({
    wrapper: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 6 },
    item: { flexBasis: "49%", flexGrow: 0, minWidth: "49%" },
});
