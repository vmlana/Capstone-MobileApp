import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const SearchIcon = ({ navigation }) => {
  const navToSearch = () => {
    navigation.navigate("Search");
  };
  return <Feather name="search" onPress={navToSearch} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 30,
    fontSize: 20,
    color: "grey",
  },
});

export default withNavigation(SearchIcon);