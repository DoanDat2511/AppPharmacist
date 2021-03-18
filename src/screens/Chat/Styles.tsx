import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userImageView: {

  },
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoRight: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor: "#cccccc",
    paddingBottom:5,
  },
  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userMessengerEnd: {
    fontSize: 14,
    color: "#333333",
  },
  textUsername: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textTimeMess: {
    fontSize: 12,
    color: "#666",
  },
});

export default styles;
