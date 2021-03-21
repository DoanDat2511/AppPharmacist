import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import DateTimePicker, {DateTimePickerProps} from "react-native-modal-datetime-picker";
import Icons from "react-native-vector-icons/Fontisto";
import Colors from "../utils/colors"
import {ic_contact} from "../assets"
import TouchableComponent from "./Button";
interface IInputFied  extends DateTimePickerProps {
  title: string;
  value?:string
  onOpenPicker: (event: GestureResponderEvent) => void;
}

const DatePicker: React.FC<IInputFied> = (props) =>{
    const {title,value,onOpenPicker,...other} = props
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.viewInput}>
          <Text style={styles.inputText}>{value}</Text>
          <TouchableComponent
            onPress={onOpenPicker}
            style={{ position: "absolute", right: 5 }}
          >
            <Icons name='date' size={22} />
          </TouchableComponent>
        </View>
        <DateTimePicker {...other} />
      </View>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F5F8FB",
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: Colors.gray_3
  },
  viewInput: {
    marginVertical: 10,
    justifyContent:"center"
   
  },})

  export default DatePicker