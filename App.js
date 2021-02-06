import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// Screens ============================================
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import BlogScreen from "./src/screens/BlogScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Blog: BlogScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = focused ? "ios-home" : "ios-home-outline";
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          //   IconComponent = HomeIconWithBadge;
        } else if (routeName === "Blog") {
          iconName = focused ? "ios-book" : "ios-book-outline";
        } else if (routeName === "Profile") {
          iconName = focused ? "ios-person" : "ios-person-outline";
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "gray",
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default () => {
  return <AppContainer />;
};
