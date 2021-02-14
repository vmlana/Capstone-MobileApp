import React from "react";
// Redux
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";

import { View, Button, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Tab } from "native-base";

// Screens ============================================
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import BlogScreen from "./src/screens/BlogScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PlayListScreen from "./src/screens/PlayListScreen";
// =====================================================

// The most top will be initially renddered
const HomeStack = createStackNavigator(
  {
    Search: SearchScreen,
    PlayList: PlayListScreen,

    // loginFlow: createStackNavigator({
    //   Signin: SigninScreen,
    //   Signup: SignupScreen,
    // }),
  },
  {
    // initialRouteName: "Home",
    // headerMode: "none",
    // navigationOptions: {
    //   headerVisible: false,
    // },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: createSwitchNavigator({
      screen: HomeScreen,
    }),
    Blog: createSwitchNavigator({
      screen: BlogScreen,
    }),
    Profile: createSwitchNavigator({
      screen: ProfileScreen,
    }),
  },
  {
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

        // You can return any component that you like here
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "gray",
    },
  }
);

const AppNavigator = createSwitchNavigator({
  Auth: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),
  mainFlow: TabNavigator,
  Others: HomeStack,
});

const AppContainer = createAppContainer(AppNavigator);

export default () => {
  return (
    // <AuthProvider>
    <AppContainer ref={(navigation) => setNavigator(navigator)} />
    // </AuthProvider>
  );
};
