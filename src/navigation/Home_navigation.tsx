import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Overview from "../screens/Home/Overview";
import ScanPharmacy from "../screens/ScanPharmacy";
import { Screens } from "../NavigationConfig";
const StackHome = createStackNavigator();
const StackScan = createStackNavigator();

const ScanStack = () => {
  return (
    <StackScan.Navigator
      headerMode='none'
      initialRouteName={Screens.ScanPharmacy}
    >
      <StackScan.Screen
        name={Screens.ScanPharmacy}
        component={ScanPharmacy}
      />
    </StackScan.Navigator>
  );
};

const HomeStack = () => {
  return (
    <StackHome.Navigator headerMode='none' initialRouteName={Screens.Overview}>
      <StackHome.Screen
        name={Screens.Overview}
        component={Overview}
        key={Screens.Overview}
      />
      <StackHome.Screen
        name={"StackScan"}
        component={ScanStack}
        key={"StackScan"}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;
