// React PDF
import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
// Model
import { TDetailItem } from "./PDFEmployeeResume.model";

const DetailItem = ({ label, value, image }: TDetailItem) => {
    return (
        <View style={styles.detailCard}>
            <View style={styles.detailImageContainer}>
                <Image src={image} style={styles.detailImage} />
            </View>
            <View style={styles.detailInfo}>
                <Text style={styles.detailTitle}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        </View>
    );
};

export default DetailItem;

const styles = StyleSheet.create({
    detailCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    detailImageContainer: {
        width: 24,
        height: 24,
        backgroundColor: "#E2E6EE",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    detailImage: {
        width: 10,
        height: 10,
    },
    detailInfo: {
        marginLeft: 8,
    },
    detailTitle: {
        fontFamily: "Outfit",
        fontSize: 10,
        fontWeight: 300,
        color: "#79819A",
    },
    detailValue: {
        fontFamily: "Outfit",
        fontSize: 8,
        fontWeight: 600,
        color: "#47516B",
    },
});
