import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const SearchIcon = ({ navigation }) => {
  const navToSearch = () => {
    navigation.navigate("Search");
  };
  return <Feather name="search" onPress={navToSearch} />;
};

export default withNavigation(SearchIcon);
