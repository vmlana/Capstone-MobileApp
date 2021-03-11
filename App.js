import React from "react";
// Redux
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { SearchProvider } from "./src/context/searchContext";
import { setNavigator } from "./src/navigationRef";

import { View, Button, StyleSheet, Text } from "react-native";
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
import SingleVideoScreen from "./src/screens/SingleVideoScreen";
import SetScheduleScreen from "./src/screens/SetScheduleScreen";
import SearchIcon from "./src/components/Search/SearchIcon";
import CloseIcon from "./src/components/Search/CloseIcon";
import TrainerScreen from "./src/screens/TrainerScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ProgramScreen from "./src/screens/ProgramScreen";
import SurveyScreen from "./src/screens/SurveyScreen";
// =====================================================

// The most top will be initially renddered
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Pivot Care",
      },
    },
    PlayList: {
      screen: PlayListScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.playListData.playlistName}`,
      }),
    },
    SingleVideo: {
      screen: SingleVideoScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.lessonName}`,
      }),
    },
    SetSchedule: {
      screen: SetScheduleScreen,
      navigationOptions: { title: "Schedule a Session" },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: "Search",
        headerRight: () => <CloseIcon />,
      },
    },
    TrainerDetails: {
      screen: TrainerScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.instructorName}`,
      }),
    },
    Category: {
      screen: CategoryScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.category.name}`,
      }),
    },
    Program: {
      screen: ProgramScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.program.programName}`,
      }),
    },
    Survey: {
      screen: SurveyScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Pivot Care",
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerRight: () => <SearchIcon />,
      headerBackTitle: " ",
      headerTitleStyle: {
        fontWeight: "normal",
        textAlign: "center",
        color: "#7561A4",
        fontSize: 28,
      },
    },
  }
);
const BlogStack = createStackNavigator(
  {
    Blog: BlogScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: "Search",
        headerRight: () => <CloseIcon />,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerRight: () => <SearchIcon />,
      headerBackTitle: " ",
      headerTitleStyle: {
        fontWeight: "normal",
        textAlign: "center",
        color: "#7561A4",
        fontSize: 28,
      },
    },
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: "Search",
        headerRight: () => <CloseIcon />,
      },
    },
  },

  {
    defaultNavigationOptions: {
      headerRight: () => <SearchIcon />,
      headerBackTitle: " ",
      headerTitleStyle: {
        fontWeight: "normal",
        textAlign: "center",
        color: "#7561A4",
        fontSize: 28,
      },
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Blog: BlogStack,
    Profile: ProfileStack,
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
        return (
          <IconComponent
            name={iconName}
            size={24}
            color={tintColor}
            style={{ paddingTop: 5 }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#FFFFFF",
      activeBackgroundColor: "#A296BE",
      inactiveBackgroundColor: "#7561A4",
      tabStyle: {
        borderRightColor: "#A296BE",
        borderRightWidth: 0.2,
        borderLeftColor: "#A296BE",
        borderLeftWidth: 0.2,
      },
      style: {
        height: 55,
      },
      labelStyle: {
        fontSize: 12,
        paddingBottom: 2,
      },
      labelPosition: "below-icon",
    },
  }
);

const AppNavigator = createSwitchNavigator({
  Auth: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
  }),
  Home: TabNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <AppContainer ref={(navigation) => setNavigator(navigator)} />
      </SearchProvider>
    </AuthProvider>
  );
};
