import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PlayListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Play List Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayListScreen;
