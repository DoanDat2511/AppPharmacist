import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { IBaseProps } from "../../utils/interface";
const NewsList: React.FC<IBaseProps> = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>NewsList </Text>
    </View>
  );
};

export default NewsList;
