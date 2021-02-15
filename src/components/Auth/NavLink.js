import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>{text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <Text style={styles.link}>
            {routeName === "Signup" ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 20,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  link: {
    color: "blue",
    marginLeft: 5,
  },
});

export default withNavigation(NavLink);
