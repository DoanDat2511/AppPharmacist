import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import { IBaseProps } from "../../utils/interface";
const NewsList: React.FC<IBaseProps> = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>NewsList </Text>
      {/* <Animatable.Text
        animation='bounce'
        iterationCount={5}
        direction='alternate'
      >
        Up and down you go
      </Animatable.Text> */}
    </View>
  );
};

export default NewsList;
