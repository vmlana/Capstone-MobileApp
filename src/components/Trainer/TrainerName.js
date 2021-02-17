import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Thumbnail } from "native-base";

const TrainerName = ({ data }) => {
  return (
    <TouchableOpacity style={styles.trainerInfo}>
      <Thumbnail
        small
        source={{
          uri: data.trainerPic,
        }}
        style={styles.thumbNail}
      />
      <Text style={{ marginLeft: 5 }}>{data.trainerName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trainerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbNail: {
    width: 20,
    height: 20,
  },
});

export default TrainerName;
