import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageSourcePropType,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";

import Colors from "../utils/colors"

interface IInputFied extends TextInputProps {
  title: string;
  nameImage?: ImageSourcePropType;
  onChangeText: (text: string) => void;
}
const InputFied: React.FC<IInputFied> = (props) => {
  const { title, nameImage, onChangeText, ...other } = props;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {/* <View style={styles.viewInput}> */}
        <TextInput
          style={styles.inputText}
          onChangeText={onChangeText}
          {...other}
        />
      {/* </View> */}
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
    borderWidth: 0.5,
    borderColor: Colors.gray_3,
    marginVertical: 10,
  },
  viewInput: {
    marginVertical: 10,
  },
});
export default InputFied;
