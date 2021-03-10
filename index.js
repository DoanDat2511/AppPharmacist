import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import App from "./src/AppContainer";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Application);
