import React from "react";
// Redux
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { SearchProvider } from './src/context/searchContext';
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
import TrainerScreen from './src/screens/TrainerScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProgramScreen from './src/screens/ProgramScreen';
// =====================================================

// The most top will be initially renddered
const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
		PlayList: {
			screen: PlayListScreen,
			navigationOptions: ({ navigation }) => ({
				title: `${navigation.state.params.playListData.playlistName}`,
			}),
		},
		SingleVideo: {
			screen: SingleVideoScreen,
			navigationOptions: { title: "Single Video" },
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
				title: `${navigation.state.params.program.programName}`
			}),
		},
	},
	{
		defaultNavigationOptions: {
			headerRight: () => <SearchIcon />,
			headerBackTitle: " ",
		},
	}
);
const BlogStack = createStackNavigator(
	{
		Blog: BlogScreen,
		Search: SearchScreen,
	},
	{
		defaultNavigationOptions: {
			headerRight: () => <SearchIcon />,
			headerBackTitle: " ",
		},
	}
);
const ProfileStack = createStackNavigator(
	{
		Profile: ProfileScreen,
		Search: SearchScreen,
	},

	{
		defaultNavigationOptions: {
			headerRight: () => <SearchIcon />,
			headerBackTitle: " ",
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
	Home: TabNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

export default () => {
	return (
		// <AuthProvider>
			<SearchProvider>
				<AppContainer ref={(navigation) => setNavigator(navigator)} />
			</SearchProvider>
		// </AuthProvider>
	);
};
