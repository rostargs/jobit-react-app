// React PDF
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
// Model
import { TEducationItem } from "./PDFEmployeeResume.model";

const EducationItem = ({ universityTitle, faculty, enterYear, leaveYear, logo, gradeLevel }: TEducationItem) => {
    const formatedEnterYear = String(new Date(enterYear).toDateString());
    const formatedLeaveYear = String(new Date(leaveYear).toDateString());
    return (
        <View style={styles.card}>
            <View style={styles.general}>
                <Image src={logo} style={styles.logo} />
                <Text style={styles.title}>{universityTitle}</Text>
            </View>
            <Text style={styles.courseName}>{faculty}</Text>
            <Text style={styles.grade}>Grade: {gradeLevel}</Text>
            <Text style={styles.date}>
                {formatedEnterYear}&nbsp;-&nbsp;{formatedLeaveYear}
            </Text>
        </View>
    );
};

export default EducationItem;

const styles = StyleSheet.create({
    card: { padding: "8px 12px", backgroundColor: "#F7F9FC", borderRadius: 8 },
    general: { display: "flex", flexDirection: "row", gap: 8, alignItems: "center" },
    title: { fontFamily: "Outfit", fontSize: 8, fontWeight: 600, color: "#2E2E48" },
    courseName: { fontFamily: "Outfit", fontSize: 8, fontWeight: 500, color: "#2E2E48", lineHeight: 1.2, marginTop: 4 },
    date: { fontFamily: "Outfit", fontSize: 6, fontWeight: 300, color: "#79819A" },
    grade: { fontFamily: "Outfit", fontSize: 6, fontWeight: 400, color: "#2E2E48" },
    logo: { width: 24, height: 24, objectFit: "contain" },
});
