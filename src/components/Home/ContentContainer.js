import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../colors";

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

const ContentContainer = ({ navigation, result, type }) => {
  // type !== "cat" && type !== "playlists"
  //   ? console.log("program list", result)
  //   : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          {
            type === "playlists"
              ? navigation.navigate("PlayList", {
                singleVideoData: result.lessons,
                playListData: result,
              })
              : type === "cat"
                ? navigation.navigate("Category", {
                  category: result,
                })
                : navigation.navigate("Program", {
                  program: result,
                });
          }
        }}
      >
        <ThumbNail type={type} source={{ uri: result.imageFile }} />
      </TouchableOpacity>
      {type === "playlists" ? (
        <Text
          style={{
            ...styles.contentTitle,
            fontFamily: "GothamBook",
            color: colors.darkGrey,
          }}
        >
          {result.playlistName}
        </Text>
      ) : type === "cat" ? (
        <Text
          style={{
            ...styles.contentTitle,
            fontFamily: "GothamBook",
            color: colors.darkGrey,
          }}
        >
          {result.name}
        </Text>
      ) : null}

      {type === "playlists" ? (
        <TrainerName data={result} navigation={navigation} screen="home" />
      ) : type === "programs" ? (
        <View style={styles.playListContainer}>
          <Text
            style={{
              ...styles.contentTitle,
              fontFamily: "GothamBook",
              color: colors.darkGrey,
            }}
          >
            {result.programName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="checkbox-multiple-blank-outline"
              size={15}
              color="#707070"
              style={{ marginRight: 5, alignItems: "center", paddingTop: 3 }}
            />
            <Text>{result.lessons ? result.lessons.length : null}</Text>
          </View>
        </View>
      ) : null}
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

  playListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  contentTitle: {
    fontSize: 13.5,
    lineHeight: 18,
    paddingTop: 5,
    marginBottom: 7,
    width: 140,
    textTransform: "capitalize"
  },
});

const ThumbNail = styled.Image`
  width: ${({ type }) => (type === "cat" ? "160px" : "140px")};
  height: ${({ type }) => (type === "cat" ? "140px" : "140px")};
  border-radius: 5px;
  margin-bottom: 5px;
`;

export default ContentContainer;
