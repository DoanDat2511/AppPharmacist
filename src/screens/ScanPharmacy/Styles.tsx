import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utils/colors"

const dimen = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    viewHeader: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    viewCloseHeader: {
        alignItems: "center",
        justifyContent: "center",
    },
    iconHeader: {
        height: 20,
        width: 20,
        tintColor: Colors.white,
    },
    viewTitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        color: Colors.white,
        fontWeight: "bold",
    },
    btnInfor: {
        height: 35,
        width: 35,
        backgroundColor: Colors.green,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    iconInfor: {
        height: 25,
        width: 25,
        tintColor: Colors.white,
    },
    viewFocus: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        marginTop: dimen.height * 0.35,
    },
    viewFocusLANDSCAPE: {
        flex: 1,
        alignItems: "center",
        marginTop: 10,
    },
    imgFocus: {
        marginTop: "-55%",
        width: 200,
        height: 300,
    },
    imgFocusLANDSCAPE: {
        width: "50%",
        height: 150,
    },
    btnFlash: {
        position: "absolute",
        top: "62%",
        left: 30,
        zIndex: 10,
    },
    viewModalDetail: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "25%",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.white,
    },
    headerModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imgCloseModal: {
        width: 15,
        height: 15,
    },
    titleModal: {
        fontSize: 15,
        fontWeight: "bold",
    },
    viewContentModal: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    viewPhone: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    imgElementModal: {
        height: 25,
        width: 25,
        tintColor: Colors.primary,
    },
    titleEleModal: { marginLeft: 10, fontWeight: "bold" },
    btnButtonSearch: {
        paddingVertical: 10,
        backgroundColor: Colors.lightpurple,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    titleSearch: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.ORANGE,
    },
    imgBarcode: {
        justifyContent: "center",
        alignSelf: "center"
    },
    content: {
        width: 300,
        height: 300,
    },
    scanline: {
        backgroundColor: 'red',
        height: 1,
        // width:300
        width: "100%"
    }
});

export default styles;
