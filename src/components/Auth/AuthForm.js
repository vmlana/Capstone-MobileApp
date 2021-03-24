import React, { useState } from "react";
import { Button, Text, Input } from "react-native-elements";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import NavLink from "./NavLink";
// import Spacer from "./Spacer";

import { colors } from "../../colors";

const AuthForm = ({
  headerText1,
  headerText2,
  errorMessage,
  onSubmit,
  submitButtonText,
  navigation,
  routeName,
}) => {
  const [email, setEmail] = useState("vini@savy.ca");
  const [password, setPassword] = useState("123456");
  const [companyName, setCompanyName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={true} style={{ marginBottom: 0 }}>
        <Text
          style={{
            marginHorizontal: 10,
            fontFamily: "GothamRoundedBold_21016",
            color: colors.UIViolet,
            fontSize: 30,
          }}
        >
          {headerText1}
        </Text>
        <Text
          style={{
            ...styles.header,
            // fontFamily: "GothamLight",
            color: colors.darkGrey,
            fontWeight: "normal",
            fontSize: 23,
            paddingBottom: 30,
            letterSpacing: 1.2,
          }}
        >
          {headerText2}
        </Text>
        <Input
          label="Email"
          labelStyle={{
            fontSize: 14,
            fontFamily: "GothamLight",
            fontWeight: "normal",
            color: "#707070",
          }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            borderWidth: 0.5,
            borderRadius: 4,
            marginTop: 4,
            // height: 36,
            borderBottomWidth: 0.5,
          }}
          inputStyle={{
            paddingLeft: 10,
          }}
        />
        <Input
          label="Password"
          labelStyle={{
            fontSize: 14,
            fontFamily: "GothamLight",
            fontWeight: "normal",
            color: "#707070",
          }}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          inputContainerStyle={{
            borderWidth: 0.5,
            borderRadius: 4,
            marginTop: 4,
            // height: 36,
            borderBottomWidth: 0.5,
          }}
          containerStyle={{ paddingBottom: 0 }}
          inputStyle={{
            paddingLeft: 10,
          }}
        />
        {routeName === "Signin" ? (
          <Text
            style={{
              textAlign: "right",
              marginRight: 16,
              fontFamily: "GothamLight",
              fontSize: 12,
              color: "#707070",
              textDecorationLine: "underline",
            }}
          >
            Forgot password?
          </Text>
        ) : null}

        {routeName === "Signup" ? (
          <>
            <Input
              label="Company Name"
              labelStyle={{
                fontSize: 14,
                // fontFamily: "GothamLight",
                fontWeight: "normal",
                color: "#707070",
                letterSpacing: 1.2,
              }}
              value={companyName}
              onChangeText={setCompanyName}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={{
                borderWidth: 0.5,
                borderRadius: 4,
                marginTop: 4,
                // height: 36,
                borderBottomWidth: 0.5,
              }}
              inputStyle={{
                paddingLeft: 10,
              }}
            />
            <Input
              label="Employee Number"
              labelStyle={{
                fontSize: 14,
                // fontFamily: "GothamLight",
                fontWeight: "normal",
                color: "#707070",
                letterSpacing: 1.2,
              }}
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={false}
              inputContainerStyle={{
                borderWidth: 0.5,
                borderRadius: 4,
                marginTop: 4,
                // height: 36,
                borderBottomWidth: 0.5,
              }}
              containerStyle={{ paddingBottom: 0 }}
              inputStyle={{
                paddingLeft: 10,
              }}
            />
          </>
        ) : null}
      </KeyboardAvoidingView>
      {/* {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        ""
      )} */}

      <View>
        <Button
          title={submitButtonText}
          titleStyle={{ fontSize: 17, fontFamily: "GothamRoundedBook_21018" }}
          buttonStyle={styles.button}
          // onPress={() => onSubmit({ email, password })}
          onPress={() => {
            if (routeName === "Signup") {
              onSubmit(email, password, companyName, employeeId, navigation);
            } else {
              onSubmit(email, password, navigation);
            }
          }}
          // onPress={() => navigation.navigate("Home")}
        />
        {/* <Button
          title={"Connect with Google"}
          titleStyle={{ fontSize: 17 }}
          buttonStyle={styles.button}
          // onPress={() => onSubmit({ email, password })}
          onPress={() => navigation.navigate("Home")}
        /> */}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    marginTop: windowHeight / 18,
    marginBottom: 30,
    justifyContent: "space-between",
    paddingTop: "7%",
    height: "80%",
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    fontWeight: "normal",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  link: {
    color: "blue",
  },
  button: {
    // marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: colors.UIViolet,
    padding: 12,
    borderRadius: 5,
  },
});

export default AuthForm;
