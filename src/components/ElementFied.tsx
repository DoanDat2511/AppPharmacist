import React, { ReactNode, useMemo } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  ImageSourcePropType,
  TextInputProps,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from "react-native";

import TouchableComponent from "./Button";
import Colors from "../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";

interface IElementFied {
  title: string;
  icons: ReactNode;
  onPressElement?: (event: GestureResponderEvent) => void;
  statusBorder?: boolean;
  enableSwitch? :boolean
  isEnabled?:boolean,
  textLang?:string,
  toggleSwitch?: (value: boolean) => void


}
const ElementFied: React.FC<IElementFied> = (props) => {
  const {
    title,
    statusBorder,
    isEnabled,
    toggleSwitch,
    enableSwitch,
    icons,
    textLang,
    onPressElement,
  } = props;

  const renderIcons = useMemo(() => {
    return icons;
  }, [icons]);

  const styleBtn = useMemo(() => {
    const styleBorder = [styles.btnElement, { borderBottomWidth: 0.5 ,borderColor:Colors.gray_3 }];
    const style = [styles.btnElement];
    return statusBorder ? styleBorder : style;
  }, [statusBorder]);


  return (
    <TouchableComponent style={styleBtn} onPress={onPressElement}>
      <View style={styles.viewElementLeft}>
        {renderIcons}
        <Text style={styles.titleElement}>{title}</Text>
      </View>

      {enableSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: Colors.green_1 }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ) : (
        <View style={{flexDirection:"row" ,justifyContent:"center" ,alignItems:"center"}}>
            {textLang && <Text style={{marginRight:10 ,fontSize:14 ,color:Colors.gray_2}}>{textLang}</Text>}
          <Icon name='chevron-forward' size={22} color={Colors.gray} />
        </View>
      )}
    </TouchableComponent>
  );
};
const styles = StyleSheet.create({
  btnElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewElementLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleElement: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.gray,
  },
});
export default ElementFied;
