import { StyleSheet } from "react-native";
import Colors from "../../utils/colors"
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userImageView: {},
  imgUser: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoRight: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    paddingRight: 20,
    paddingLeft: 10,
    borderBottomColor: "#cccccc",
    paddingBottom: 5,
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
  viewOnline: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.transparent,
    position: "absolute",
    right: 0,
    top: 0,
  },
  countMessenger:{
    width:15,
    height:15,
    borderRadius:3,
    backgroundColor:Colors.red,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"flex-end",
    position:"absolute",
    top:10
  },
  textNumberMess:{
    fontSize:12,
    color:Colors.white
  }
});

export default styles;
