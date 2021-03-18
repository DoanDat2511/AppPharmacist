import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Screens } from "../NavigationConfig";
import PharmacyList from "../screens/ManagePharmacy/PharmacyList";

const StackPharmacy = createStackNavigator();

const PharmacyStack = () => {
  return (
    <StackPharmacy.Navigator
      headerMode='none'
      initialRouteName={Screens.PharmacyList}
    >
      <StackPharmacy.Screen
        name={Screens.PharmacyList}
        component={PharmacyList}
        key={Screens.PharmacyList}
      />
    </StackPharmacy.Navigator>
  );
};

export default PharmacyStack;
