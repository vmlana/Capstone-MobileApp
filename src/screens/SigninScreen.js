import React, { useState, useContext, useEffect } from "react";
import { NavigationEvents } from "react-navigation";
import { View, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { Text, Input, Button } from "react-native-elements";

import { navigate } from "../navigationRef";

import { Context as AuthContext } from "../context/AuthContext";

import AuthForm from "../components/Auth/AuthForm";
import NavLink from "../components/Auth/NavLink";

// import Spacer from "../components/Spacer";

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrMsg, tokenRefresh, autoSignin } = useContext(AuthContext);

    useEffect(()=>{
      (async()=>{
        let userInfo = await AsyncStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);

        // console.log(userInfo);

        const now = new Date().getTime();
        // console.log(now)
        // console.log(now - userInfo.accessExpiresIn);
        // console.log(now < userInfo.accessExpiresIn);
        if(now < userInfo.accessExpiresIn){
          // console.log("auto")
          autoSignin();
          navigation.navigate("Home");
        } else if (now < userInfo.refreshExpiresIn) {
          // console.log("refresh");
          // refresh token
          tokenRefresh(userInfo.refreshToken, navigation);
        }
      })()
    }, [])

    useEffect(()=>{
      if(state.errorMessage !== "") {
        alert(state.errorMessage);
      }
    }, [state])

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
        headerText1="Welcome,"
        headerText2="Sign in to Continue!"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        routeName="Signin"
        onSubmit={signin}
        navigation={navigation}
        style={styles.auth}
      />
      <NavLink text={"I'm a new user."} routeName="Signup" />
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
  },
});

export default SigninScreen;
