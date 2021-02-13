import React, { useState, useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import { Context as AuthContext } from "../context/AuthContext";

// import AuthForm from "../components/Auth/AuthForm";
// import NavLink from "../components/NavLink";

// import Spacer from "../components/Spacer";

const SigninScreen = ({ navigation }) => {
  //   const { state, signin, clearErrMsg } = useContext(AuthContext);

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
      />
      <AuthForm
        headerText="Sing In to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        text={"Don't have an account? Sign up first"}
        routeName="Signup"
      /> */}
      <Text>Sign in</Text>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SigninScreen;
