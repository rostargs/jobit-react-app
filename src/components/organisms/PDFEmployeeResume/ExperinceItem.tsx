// React PDF
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
// Assets
import location from "assets/images/resumePDF/location.png";
// Model
import { TExperienceItem } from "./PDFEmployeeResume.model";

const ExperinceItem = ({ enterYear, leaveYear, level, logo, role, companyName, country, position }: TExperienceItem) => {
    const formatedEnterYear = String(new Date(enterYear).toDateString());
    const formatedLeaveYear = String(new Date(leaveYear).toDateString());
    return (
        <View style={styles.card}>
            <View style={styles.contentWrapper}>
                <View style={styles.bullet} />
                <View style={styles.mainInfo}>
                    <View style={styles.general}>
                        <View style={styles.inlineBlock}>
                            <Text style={styles.date}>
                                {formatedEnterYear}&nbsp;-&nbsp;{formatedLeaveYear}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.companyInfo}>
                        <Image src={logo} style={styles.logo} />
                        <View>
                            <Text style={styles.position}>{position}</Text>
                            <Text style={styles.company}>{companyName}</Text>
                            <View style={styles.inlineBlock}>
                                <Image src={location} style={styles.location} />
                                <Text style={styles.place}>{country}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{role}</Text>
            </View>
        </View>
    );
};

export default ExperinceItem;

const styles = StyleSheet.create({
    card: { display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
    contentWrapper: { display: "flex", flexDirection: "row" },
    bullet: { width: 3, height: 3, backgroundColor: "#000", margin: 4, borderRadius: "50%" },
    mainInfo: { marginLeft: 10 },
    general: { display: "flex", flexDirection: "row", alignItems: "center", gap: 6 },
    companyInfo: { paddingTop: 4, paddingRight: 4, display: "flex", flexDirection: "row", alignItems: "center", gap: 8 },
    logo: { width: 20, height: 20, objectFit: "contain" },
    position: { fontFamily: "Outfit", color: "#79819A", fontSize: 7, fontWeight: 400, maxWidth: 92 },
    company: { fontFamily: "Outfit", color: "#000", fontWeight: 500, fontSize: 8, maxWidth: 92 },
    description: { fontWeight: 300, fontFamily: "Outfit", color: "#79819A", fontSize: 7, textAlign: "justify" },
    location: { width: 6, height: 6 },
    inlineBlock: { display: "flex", flexDirection: "row", alignItems: "center" },
    date: { color: "#47516B", fontFamily: "Outfit", fontWeight: 400, fontSize: 8 },
    place: { fontWeight: 300, fontFamily: "Outfit", color: "#79819A", fontSize: 7, marginLeft: 2 },
    descriptionContainer: { marginLeft: 8, maxWidth: 210, width: "100%" },
});
