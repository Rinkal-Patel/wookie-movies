import React, { ReactNode } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/HomeScreen";
import { MovieDetailsScreen } from "../screens/MovieDetailsScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { HomeStackParamList, Routes } from "./routes";

const messages = defineMessages({
  home: {
    id: "BottomTabNavigation.home",
    defaultMessage: "Home",
  },
  search: {
    id: "BottomTabNavigation.search",
    defaultMessage: "Search",
  },
});

const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator<HomeStackParamList>();

const noHeaderOptions = { headerShown: false };

const HomeNavigator = () => (
  <HomeStack.Navigator mode="modal">
    <HomeStack.Screen
      name={Routes.Home}
      component={HomeScreen}
      options={noHeaderOptions}
    />
    <HomeStack.Screen
      name={Routes.MovieDetails}
      component={MovieDetailsScreen}
    />
  </HomeStack.Navigator>
);

const TabBarLabel = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => <Text style={{ color, fontSize: 12, marginBottom: 6 }}>{children}</Text>;

export const BottomTabNavigator = () => (
  <BottomTab.Navigator initialRouteName={Routes.Home}>
    <BottomTab.Screen
      name={Routes.Home}
      component={HomeNavigator}
      options={{
        tabBarLabel: ({ color }) => (
          <TabBarLabel color={color}>
            <FormattedMessage {...messages.home} />
          </TabBarLabel>
        ),
        tabBarIcon: ({ color }) => (
          <FontAwesome
            size={20}
            style={{ marginBottom: -3 }}
            name="home"
            color={color}
          />
        ),
      }}
    />
    <BottomTab.Screen
      name={Routes.Search}
      component={SearchScreen}
      options={{
        tabBarLabel: ({ color }) => (
          <TabBarLabel color={color}>
            <FormattedMessage {...messages.search} />
          </TabBarLabel>
        ),
        tabBarIcon: ({ color }) => (
          <FontAwesome
            size={20}
            style={{ marginBottom: -3 }}
            name="search"
            color={color}
          />
        ),
      }}
    />
  </BottomTab.Navigator>
);
