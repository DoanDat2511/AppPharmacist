import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Setting from "../screens/Setting";
import { Screens } from "../NavigationConfig";
const StackHome = createStackNavigator();

const SettingStack = () => {
  return (
    <StackHome.Navigator
      headerMode='none'
      initialRouteName={Screens.Setting}
    >
      <StackHome.Screen
        name={Screens.Overview}
        component={Setting}
        key={Screens.Setting}
      />
    </StackHome.Navigator>
  );
};

export default SettingStack;
