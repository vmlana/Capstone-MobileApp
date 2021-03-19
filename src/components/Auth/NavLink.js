import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
// import Spacer from "./Spacer";
import { withNavigation } from "react-navigation";

import {colors} from '../../colors';

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{fontFamily: "GothamRoundedLight_21020", color: colors.darkGrey}}>{text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <Text style={{...styles.link, fontFamily: "GothamRoundedBold_21016" }}>
            {routeName === "Signup" ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        {/* <Text style={styles.link}>Forgot Password?</Text> */}
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
    color: colors.darkGrey,
    marginLeft: 5,
  },
});

export default withNavigation(NavLink);
