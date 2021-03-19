import { StyleSheet } from "react-native";
import Colors from "../../utils/colors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleComom:{
    fontSize:18,
    fontWeight:"700",
    color:Colors.gray_2,
    marginLeft:20,
    marginVertical:12
    
  },
  viewContainerEle:{
      backgroundColor:Colors.white,
      borderBottomColor:Colors.gray_3,
      borderBottomWidth:0.5,
      borderTopColor:Colors.gray_3,
      borderTopWidth:0.5
    
  },
  btnElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical:8
  },
  viewElementLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleElement:{
      marginLeft:10,
      fontSize:15,
      fontWeight:"700",
      color: Colors.gray
  }
});

export default styles