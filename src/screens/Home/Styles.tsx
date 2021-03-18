import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../utils/colors";
const dimen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewProduct: {
    width: "48%",
    marginTop: 10,
  },
  imgPrduct: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: "100%",
    height: 100,
  },
  viewContentProduct: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    backgroundColor: Colors.green_1,
  },

  titleProduct: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textDescription: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.gray,
  },
  headerContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  titleHello: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textUsername: {
    fontSize: 15,
    color: Colors.gray,
    fontWeight: "500",
  },
  viewNoti: {
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dotView: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -5,
    right: -5,
    backgroundColor: Colors.RED,
  },
  viewBannar: {
    height: dimen.height * 0.2,
  },
  imgBannar: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  viewHeaderFeature: {
    marginBottom: 15,
  },
  titleFeature: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewItemFeature: {
    marginBottom: 20,
    width: 60,
    alignItems: "center",
  },
  viewImgFeature: {
    height: 50,
    width: 50,
    borderRadius: 20,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginBottom: 5,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textFeature: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 13,
    color: Colors.gray,
  },
  imgFeature: {
    height: 20,
    width: 20,
    // tintColor: items.color,
  },
  titleHeaderBannar: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textViewAll: {
    fontSize: 12,
    color: Colors.gray,
    fontWeight: "400",
  },
});

export default styles;
