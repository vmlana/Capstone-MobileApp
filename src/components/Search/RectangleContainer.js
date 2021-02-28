import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Container,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
} from "native-base";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { playList, videoData } from "../../demoData";
import TrainerName from "../Trainer/TrainerName";
import { getCategories } from "../../data/api";

const RectangleContainer = ({ navigation, result, type }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Blog", {
                blogData: result,
              })
            }
          }
      >
        <View style={styles.thumbNailContainer}>
            <ThumbNail
                source={{ uri: result.blogImage }}
            />
            <Text style={styles.blogTitle}>{result.title}</Text>
        </View>
      </TouchableOpacity>
      <TrainerName data={result} navigation={navigation} />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
  },
  thumbNailContainer:{
    position: "relative",
  },
  blogTitle:{
    position: "absolute",
    bottom: 0,
    color: "white",
    padding: 7,
    fontWeight: "bold"
  },
  trainerContainer: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  trainerThumb: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  playListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const ThumbNail = styled.Image`
  width: 240px;
  height: 140px;
  /* border-radius: 4px; */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-bottom: 5px;
`;

export default RectangleContainer;
