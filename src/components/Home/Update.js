import React from "react";
import { StyleSheet, View } from "react-native";
import { Thumbnail } from "native-base";
import { Button, Text, Input } from "react-native-elements";

const Update = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text h4>Bravo!</Text>
        <Text>You completed 5 workouts last week!</Text>
      </View>
      <Thumbnail
        medium
        source={{
          uri:
            "https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 30,
    height: 100,
    alignItems: "center",
    padding: 20,
  },
  textContainer: { width: "60%" },
});

export default Update;
