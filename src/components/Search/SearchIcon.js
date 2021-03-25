import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

const SearchIcon = ({ navigation }) => {
  const navToSearch = () => {
    navigation.navigate("Search");
  };
  return <FontAwesome name="search" onPress={navToSearch} style={styles.icon} />;
  // return <Image source={require("../../../assets/icon-search.png")} style={{ height: 24, width: 24 }} />
  //  <Feather name="search" onPress={navToSearch} style={styles.icon}  />;
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 30,
    textAlign: "center",
    color: "#7561A4",
    fontSize: 23,
    lineHeight: 40,
    fontFamily: "GothamRoundedMedium_21022",
    fontWeight: "bold"
  },
});

export default withNavigation(SearchIcon);
