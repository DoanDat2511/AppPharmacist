import { Dimensions, StyleSheet } from "react-native";

import Colors from "../../../utils/colors"
const dimen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewImageProfile: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginRight: 20,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
  chooseCamera: {
    width: 80,
    height: 100,
  },
  viewNoteAvatar: {
    marginTop: 10,
    backgroundColor: Colors.LIGHT_RED,
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  titleNote: {
    fontSize: 10,
    color: "red",
    fontWeight: "300",
    paddingTop: 5,
  },
  viewContentAvatar: {
    marginHorizontal: 15,
  },
  titleAvatar: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewBody: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  viewButton: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: Colors.BLUE_OPACITY,
    borderRadius: 5,
  },
  titleButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  errorMsg: {
    color: Colors.RED,
    fontSize: 12,
    paddingBottom:5,
  },
});

export default styles;
