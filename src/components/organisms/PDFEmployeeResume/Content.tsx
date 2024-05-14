import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { TContent } from "./PDFEmployeeResume.model";

const Content = ({ children, title, lastChild = false }: TContent) => {
    return (
        <View style={styles.content}>
            {!lastChild && <View style={styles.connector} />}
            <View style={styles.header}>
                <View style={styles.roundWrapper}>
                    <View style={styles.round} />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.children}>{children}</View>
        </View>
    );
};

export default Content;

const styles = StyleSheet.create({
    content: {
        position: "relative",
        width: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    roundWrapper: {
        width: 16,
        height: 16,
        border: "1px solid #E2E6EE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: "white",
    },
    round: {
        width: 4,
        height: 4,
        backgroundColor: "#5531A7",
        borderRadius: "50%",
    },
    title: {
        fontFamily: "Outfit",
        fontSize: 14,
        fontWeight: 600,
    },
    connector: {
        position: "absolute",
        left: 7.5,
        top: 1,
        width: 1,
        backgroundColor: "#E2E6EE",
        height: "100%",
    },
    children: {
        marginLeft: 32,
        marginVertical: 16,
    },
});
