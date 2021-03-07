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

const AuthForm = ({
  headerText1,
  headerText2,
  errorMessage,
  onSubmit,
  submitButtonText,
  navigation,
  routeName,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled={true} style={{ marginBottom: 0 }}>
        <Text h3 style={{ fontWeight: "bold", marginHorizontal: 10 }}>
          {headerText1}
        </Text>
        <Text h4 style={styles.header}>
          {headerText2}
        </Text>
        <Input
          label="Email"
          labelStyle={{ fontSize: 12 }}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 4,
            marginTop: 4,
            // height: 36,
          }}
        />
        <Input
          label="Password"
          labelStyle={{ fontSize: 12 }}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 4,
            marginTop: 4,
            // height: 36,
          }}
          containerStyle={{ paddingBottom: 0 }}
        />

        {routeName === "Signup" ? (
          <>
            <Input
              label="Company Name"
              labelStyle={{ fontSize: 12 }}
              value={companyName}
              onChangeText={setCompanyName}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 4,
                marginTop: 4,
                // height: 36,
              }}
            />
            <Input
              label="Employee Number"
              labelStyle={{ fontSize: 12 }}
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={false}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 4,
                marginTop: 4,
                // height: 36,
              }}
              containerStyle={{ paddingBottom: 0 }}
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
          titleStyle={{ fontSize: 17 }}
          buttonStyle={{ marginHorizontal: 10 }}
          // onPress={() => onSubmit({ email, password })}
          onPress={() => {
            if(routeName === "Signup") {
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
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
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
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default AuthForm;
