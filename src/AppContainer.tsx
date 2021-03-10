import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import Snackbar, { SnackBarOptions } from "react-native-snackbar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { REDUX_TYPE, LOADING_TYPE } from "./redux/redux-type-saga";
import { Record, Collection } from "immutable";
import { IStore } from "./redux/redux-state";
import { sGetIndicatorState } from "./redux/selectors";
import { Screens } from "./NavigationConfig";
import navigationService from "./navigation/navigation-service";

import Login from "./screens/Authen/Login";

import Splash from "./screens/Splash";

import Colors from "./utils/colors";

const Stack = createStackNavigator();

const isLoadingSelector = (store: Record<IStore> & Readonly<IStore>) => {
  const count: Collection<string, any> = store.getIn([
    REDUX_TYPE,
    LOADING_TYPE,
  ]);
  return !!count || sGetIndicatorState(store);
};

const AppContainer: React.FC = (props) => {
  const [visible, setVisible] = useState(false);
  const isLoading = useSelector(isLoadingSelector);
  // callbacks

  const showAlert = useCallback((options: SnackBarOptions) => {
    Snackbar.show(options);
  }, []);
  const _updateNavigator = useCallback((navigatorRef) => {
    navigationService.setTopLevelNavigator(navigatorRef);
  }, []);
  // memos
  const screenProps = useMemo(() => {
    return {
      setHudVisible: setVisible,
      showAlert,
    };
  }, []);
  const IndicatorView = useMemo(() => {
    if (visible || isLoading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center" },
          ]}
        >
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator
            size="large"
            color={Platform.select({ ios: "padding", android: "white" })}
          />
        </View>
      );
    }
    return null;
  }, [visible, isLoading]);


  const NavigationView = useMemo(() => {
    return (
      <NavigationContainer ref={_updateNavigator}>
        <Stack.Navigator initialRouteName={Screens.Splash} headerMode="none">
          <Stack.Screen
            name={Screens.Splash}
            component={Splash}
            key={Screens.Splash}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name={Screens.Login}
            component={Login}
            key={Screens.Login}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }, [screenProps, _updateNavigator]);
  return (
    <React.Fragment>
      {NavigationView}
      {IndicatorView}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: Colors.SUPER_DARK_BLUE,
    // alignItems: "center",
  },
  profileDrawer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imgProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 0.4,
  },
  viewInfor: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textUsername: {
    fontSize: 15,
    color: "white",
    fontWeight: "600",
  },
  textEmailProfile: {
    fontSize: 14,
    color: "lavender",
    marginTop: 10,
  },
});

export default AppContainer;
