import React, { useState } from "react";
// import { Button, Text, Input } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
// import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      {/* <Text h3>{headerText}</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        ""
      )}

      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password })}
      /> */}

      <Text>Auth Form</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  link: {
    color: "blue",
  },
});

export default AuthForm;
