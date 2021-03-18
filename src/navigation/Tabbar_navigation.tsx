import React, { useState, useMemo, useCallback } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native"

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconChat from "react-native-vector-icons/Entypo";
import IconNews from "react-native-vector-icons/Ionicons";
import IconPharmacy from "react-native-vector-icons/MaterialIcons";

import { Screens } from "../NavigationConfig";
import HomeStack from "./Home_navigation";
import ChatStack from "./Chat_navigation";
import News from "../screens/News/NewsList";
import PharmacyStack from "./Pharamacy_navigation";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

const TabBottomMain = () => {
    const getTabBarVisibility = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route)

      if (routeName === "ChatDetail") {
        return false;
      }
      return true;
    };
  return (
    <Tab.Navigator
      initialRouteName={Screens.Home}
      tabBarOptions={{
        activeTintColor: colors.primary_3,
        inactiveTintColor: "#828282",
        style: { borderTopColor: "transparent", elevation: 0 },
        labelStyle: { fontSize: 12 },
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name={Screens.Home}
        component={HomeStack}
        options={{
          tabBarLabel: Screens.Home,
          tabBarIcon: ({ color }) => (
            <Icon name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Chat}
        component={ChatStack}
        options={({route}) => ({
          tabBarLabel: Screens.Chat,
          tabBarIcon: ({ color ,}) => (
            <IconChat name='chat' color={color} size={26} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name={Screens.News}
        component={News}
        options={{
          tabBarLabel: Screens.News,
          tabBarIcon: ({ color }) => (
            <IconNews name='newspaper' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.ManagePharmacy}
        component={PharmacyStack}
        options={{
          tabBarLabel: "Pharmacy",
          tabBarIcon: ({ color }) => (
            <IconPharmacy name='date-range' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomMain;
