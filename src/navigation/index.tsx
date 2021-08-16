import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNavigator } from "./BottomTabNavigator";
import { Routes } from "./routes";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Root} component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);
