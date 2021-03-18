import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Overview from "../screens/Home/Overview";
import {Screens} from "../NavigationConfig"
const StackHome = createStackNavigator();

const HomeStack = () => {
  return (
    <StackHome.Navigator headerMode='none' initialRouteName={Screens.Overview}>
      <StackHome.Screen name={Screens.Overview} component={Overview}  key={Screens.Overview}/>
    </StackHome.Navigator>
  );
};


export default HomeStack