// React PDF
import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
// Model
import { TLanguageItem } from "./PDFEmployeeResume.model";

const LanguageItem = ({ language, level, image }: TLanguageItem) => {
    return (
        <View style={styles.languageCard}>
            <View>
                <Image src={image} style={styles.languageImage} />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{language}</Text>
                <Text style={styles.level}>{level}</Text>
            </View>
        </View>
    );
};

export default LanguageItem;

const styles = StyleSheet.create({
    languageCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    languageImage: {
        width: 25,
        height: 15,
    },
    info: {
        marginLeft: 8,
    },
    name: {
        color: "#47516B",
        fontFamily: "Outfit",
        fontSize: 10,
        fontWeight: 500,
    },
    level: {
        color: "#79819A",
        fontWeight: 300,
        fontFamily: "Outfit",
        fontSize: 8,
    },
});
