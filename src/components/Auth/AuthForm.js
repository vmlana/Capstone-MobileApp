import React, { useState } from "react";
import { Button, Text, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
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
  const [employeeNum, setEmployeeNum] = useState("");
  return (
    <View style={styles.container}>
      <View>
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
            height: 36,
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
            height: 36,
          }}
          containerStyle={{ paddingBottom: 0 }}
        />

        {routeName === "Signup" ? (
          <>
            <Input
              label="Company Name"
              labelStyle={{ fontSize: 12 }}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              inputContainerStyle={{
                borderWidth: 1,
                borderRadius: 4,
                marginTop: 4,
                height: 36,
              }}
            />
            <Input
              label="Employee Number"
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
                height: 36,
              }}
              containerStyle={{ paddingBottom: 0 }}
            />
          </>
        ) : null}
      </View>
      {/* {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        ""
      )} */}

      <View>
        <Button
          title={submitButtonText}
          titleStyle={{ fontSize: 17 }}
          style={{ marginHorizontal: 10, height: 36 }}
          // onPress={() => onSubmit({ email, password })}
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title={"Connect with Google"}
          titleStyle={{ fontSize: 17 }}
          style={styles.button}
          // onPress={() => onSubmit({ email, password })}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 50,
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
    height: 36,
  },
});

export default AuthForm;
