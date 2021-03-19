import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

import Colors from "../utils/colors";

interface IPhonePicker {
  title?: string;
}
const PhonePicker: React.FC<IPhonePicker> = (props) => {
  const { title } = props;
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewContainerInput}>
        <CountryPicker
          countryCode='VN'
          withEmoji
          withFilter
          //   withAlphaFilter
          visible={visible}
          onClose={() => setVisible(false)}
          //   onSelect={}
        />
        <Text style={styles.inputCode}>+84</Text>
        <View style={styles.line} />
        <TextInput style={styles.inputPhone} placeholder='00000000' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewContainerInput: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray_3,
    backgroundColor: "#F5F8FB",
    marginVertical: 10,
    alignItems: "center",
  },
  inputCode: {
    paddingRight: 5,
    paddingVertical: 8,
  },
  line: {
    height: "70%",
    width: 1,
    backgroundColor: Colors.gray_3,
  },
  inputPhone: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
export default PhonePicker;
