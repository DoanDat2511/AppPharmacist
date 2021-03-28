import React, { useMemo, useState } from "react";
import { Text, View, StyleSheet, TextInput,TextInputProps} from "react-native";
import CountryPicker, {
  Country,
  CountryCode
} from "react-native-country-picker-modal";

import Colors from "../utils/colors";
interface TCountry{
  cca:CountryCode,
  callingCode:string
}
interface IPhonePicker extends TextInputProps{
  title?: string;
  onSelect?(country: Country): void;
  valueCountry?:TCountry
}
const PhonePicker: React.FC<IPhonePicker> = (props) => {
  const { title, onSelect, valueCountry, ...other } = props;
  const [visible, setVisible] = useState(false);

  const caCountry = useMemo(()=> {
    return valueCountry?.cca;
  }, [valueCountry]);

  const codePhone = useMemo(()=> {
    return valueCountry?.callingCode;
  }, [valueCountry]);

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewContainerInput}>
        <CountryPicker
          countryCode={caCountry}
          withEmoji
          withFilter
          //   withAlphaFilter
          visible={visible}
          onClose={() => setVisible(false)}
          onSelect={onSelect}
        />
        <Text style={styles.inputCode}>+{codePhone}</Text>
        <View style={styles.line} />
        <TextInput style={styles.inputPhone} {...other} />
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
