import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Screens } from "../NavigationConfig";
import ChatScreen from "../screens/Chat/ChatScreen";
import ChatDetail from "../screens/Chat/ChatDetail";

const StackChat = createStackNavigator();

const ChatStack = () => {
  return (
    <StackChat.Navigator
      headerMode='none'
      initialRouteName={Screens.ChatScreen}
      
    >
      <StackChat.Screen
        name={Screens.ChatScreen}
        component={ChatScreen}
        key={Screens.ChatScreen}
      />
      <StackChat.Screen
        name={Screens.ChatDetail}
        component={ChatDetail}
        key={Screens.ChatDetail}
        // options={{ gestureEnabled: false }}
      />
    </StackChat.Navigator>
  );
};

export default ChatStack;
