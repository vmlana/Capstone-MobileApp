import React, { useState } from "react";
// Redux
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { SearchProvider } from "./src/context/searchContext";
import { setNavigator } from "./src/navigationRef";

import { View, Button, StyleSheet, Text, LogBox } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Tab } from "native-base";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
// import { AppLoading } from "expo";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
import BlogListScreen from "./src/screens/BlogListScreen";
import SurveyScreen from "./src/screens/SurveyScreen";

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
        // fontWeight: "normal",
        textAlign: "center",
        color: "#7561A4",
        fontSize: 28,
        fontFamily: "GothamRoundedLight_21020",
      },
    },
  }
);

const BlogStack = createStackNavigator(
  {
    BlogList: {
      screen: BlogListScreen,
      navigationOptions: {
        title: "Blog",
      },
    },
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

const fetchFonts = async () => {
  return await Font.loadAsync({
    GothamRoundedBold_21016: require("./assets/fonts/GothamRoundedBold_21016.ttf"),
    GothamRoundedBook_21018: require("./assets/fonts/GothamRoundedBook_21018.ttf"),
    GothamRoundedLight_21020: require("./assets/fonts/GothamRoundedLight_21020.ttf"),
    GothamRoundedMedium_21022: require("./assets/fonts/GothamRoundedMedium_21022.ttf"),
    GothamBold: require("./assets/fonts/GothamBold.ttf"),
    GothamBook: require("./assets/fonts/GothamBook.ttf"),
    GothamLight: require("./assets/fonts/GothamLight.ttf"),
    GothamMedium: require("./assets/fonts/GothamMedium.ttf"),
  });
};

export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <AuthProvider>
      <SearchProvider>
        <AppContainer ref={(navigation) => setNavigator(navigator)} />
      </SearchProvider>
    </AuthProvider>
  );
};
