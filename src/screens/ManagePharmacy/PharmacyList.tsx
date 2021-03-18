import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { IBaseProps } from "../../utils/interface";
const PharmacyList: React.FC<IBaseProps> = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>PharmacyList </Text>
    </View>
  );
};

export default PharmacyList;
