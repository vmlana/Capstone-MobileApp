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

const ContentContainer = ({ navigation, result, type }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PlayList", {
            singleVideoData: result.lessons,
            playListData: result,
          })
        }
      >
        <ThumbNail
          type={type}
          source={{ uri: "https://dummyimage.com/150x150/000/fff" }}
        />
      </TouchableOpacity>
      {type === "cat" || type === "playlists" ? (
        <Text>{result.playlistName}</Text>
      ) : null}

      {type === "playlists" ? (
        <TrainerName data={result} />
      ) : type === "programs" ? (
        <View style={styles.playListContainer}>
          <Text>{result.playlistName}</Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="checkbox-multiple-blank-outline"
              size={15}
              color="black"
              style={{ marginRight: 5, alignItems: "center" }}
            />
            <Text>{result.lessons.length}</Text>
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
  width: ${({ type }) => (type === "cat" ? "160px" : "140px")};
  height: ${({ type }) => (type === "cat" ? "140px" : "140px")};
  border-radius: 4px;
  margin-bottom: 5px;
`;

export default ContentContainer;
