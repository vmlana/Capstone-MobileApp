import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AuthForm from "../components/Auth/AuthForm";
import NavLink from "../components/Auth/NavLink";

// import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  //   const { state, signup, clearErrMsg } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <NavigationEvents
        // onWillFocus gets called while transitioning to this component screen
        onWillFocus={clearErrMsg}

        // onDidFocus gets called right after transitioned to this component screen
        //   onDidFocus={()=>{}}

        // onWillBlur gets called while transitionig away from this component screen
        // onWillBlur={()=>{})}

        // onDidBlur gets called right after transitionig away from this component screen
        //   onDidBlur={()=>{}}
      /> */}
      <AuthForm
        headerText1="Create Account,"
        headerText2="Sign up to get started!"
        // errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        routeName="Signup"
        // onSubmit={signup}
        navigation={navigation}
      />
      <NavLink text={"I'm already a member."} routeName="Signin" />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignupScreen;
