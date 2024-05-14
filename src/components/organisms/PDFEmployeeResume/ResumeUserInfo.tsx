// React PDF
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
// Assets
import test from "assets/images/loginHero.png";
import emailImage from "assets/images/resumePDF/email.png";
import phoneImage from "assets/images/resumePDF/phone.png";
import locationImage from "assets/images/resumePDF/location.png";
// Components
import DetailItem from "./DetailItem";
import LanguageItem from "./LanguageItem";
// Models
import { TLanguagesList, TResumeUserInfo } from "./PDFEmployeeResume.model";
// Data
import { languages as langList } from "data/languages";

const LanguagesList = ({ languages }: TLanguagesList) => {
    const isEmployeeHasLanguages = !!languages.length;
    const renderLanguagesList = languages.map((lang) => {
        const currentLang = langList.find((item) => item.name === lang.language);
        return <LanguageItem {...lang} image={currentLang?.image} level={lang.rating} key={lang.id}/>;
    });
    return (
        <View style={resumeInfo.languageList}>
            {isEmployeeHasLanguages ? renderLanguagesList : <Text>No languages</Text>}
        </View>
    );
};

const ResumeUserInfo = ({ languages, data }: TResumeUserInfo) => {
    const { email, name, phoneNumber, position, location } = data;
    return (
        <View style={resumeInfo.container}>
            <View style={resumeInfo.userBaseInfo}>
                <Image src={test} style={resumeInfo.avatar} />
                <View>
                    <Text style={resumeInfo.userName}>{name || "-"}</Text>
                    <Text style={resumeInfo.userPosition}>{position || "-"}</Text>
                </View>
            </View>
            <View style={resumeInfo.userDetails}>
                <DetailItem image={emailImage} label="Email" value={email || "-"} />
                <DetailItem image={phoneImage} label="Phone" value={phoneNumber || "-"} />
                <DetailItem image={locationImage} label="Country" value={location || "-"} />
            </View>
            <View style={resumeInfo.languagesWrapper}>
                <Text style={resumeInfo.sectionTitle}>Languages</Text>
                <LanguagesList languages={languages} />
            </View>
        </View>
    );
};

export default ResumeUserInfo;

const resumeInfo = StyleSheet.create({
    container: { width: "100%", padding: 20 },
    userBaseInfo: { paddingBottom: 16, borderBottom: "0.5px solid #E2E6EE" },
    avatar: { width: 78, height: 78, borderRadius: "50%" },
    userName: { fontFamily: "Outfit", fontSize: 12, color: "#2E2E48", fontWeight: "bold", marginTop: 8 },
    userPosition: { fontFamily: "Outfit", fontSize: 14, fontWeight: "bold", color: "#7D72EF" },
    userDetails: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "16px 0px",
        borderBottom: "0.5px solid #E2E6EE",
    },
    languagesWrapper: { padding: "16px 0" },
    sectionTitle: { fontSize: 10, fontWeight: 300, fontFamily: "Outfit", color: "#79819A" },
    languageList: { padding: "12px 0", display: "flex", flexDirection: "column", gap: 12 },
});
