import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { IBaseProps } from "../utils/interface";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { initAppAction } from "../redux/action/app-action";

const Splash: React.FC<IBaseProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
    dispatch(initAppAction({ navigation: props.navigation }));
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppPharmacist</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: "black",
    fontWeight: "bold",
  },
});

export default Splash;
