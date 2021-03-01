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
                source={{ uri: 
                result.blogImage ? result.blogImage : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1994&q=80" }}
            />
            <Text style={styles.blogTitle}>{result.blogName}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.descriptionContainer}>
        <TrainerName data={result} navigation={navigation} />
        <Text style={styles.date}>30.01.2021</Text>
      </View>
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
  descriptionContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  date: {
    color: "#444",
    marginRight: 2,
  }
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
