import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import AuthForm from "../components/Auth/AuthForm";
// import NavLink from "../components/NavLink";

// import Spacer from "../components/Spacer";

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
      />
      <AuthForm
        headerText="Sing Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        text={"Already have an account? Sign in from here"}
        routeName="Signin"
      /> */}
      <Text>Sign Up</Text>
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
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SignupScreen;
