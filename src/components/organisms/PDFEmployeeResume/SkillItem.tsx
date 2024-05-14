// React PDF
import { View, Text, StyleSheet } from "@react-pdf/renderer";
// Model
import { TSkillItem } from "./PDFEmployeeResume.model";

const SkillItem = ({ skillName, rating }: TSkillItem) => {
    return (
        <View style={styles.card}>
            <Text style={styles.skill}>{skillName}</Text>
            <Text style={styles.level}>Level: {rating}</Text>
        </View>
    );
};

export default SkillItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#F7F9FC",
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 8px",
    },
    skill: { color: "#9251F7", fontSize: 10, fontWeight: 600, fontFamily: "Outfit" },
    level: { color: "#79819A", fontFamily: "Outfit", fontWeight: 300, fontSize: 8 },
});
