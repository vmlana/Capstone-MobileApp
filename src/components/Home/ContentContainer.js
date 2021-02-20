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

import { videoData } from "../../demoData";

const ContentContainer = ({ navigation, result, type }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("SingleVideo", { data: videoData })}
			>
				<ThumbNail type={type} source={{ uri: result.thumbNail }} />
			</TouchableOpacity>
			{type === "cat" || type === "movie" ? <Text>{result.title}</Text> : null}

			{type === "movie" ? (
				<TouchableOpacity
					onPress={() => navigation.navigate("TrainerDetails", { name: result.trainer, id: 2 })}
				>
					<View style={styles.trainerContainer}>
						<Thumbnail
							style={styles.trainerThumb}
							small
							source={{
								uri: result.trainerPic,
							}}
						/>

						<Text style={{ fontSize: 12 }}>{result.trainer}</Text>
					</View>
				</TouchableOpacity>
			) : type === "playlist" ? (
				<View style={styles.playListContainer}>
					<Text>{result.title}</Text>
					<View style={{ flexDirection: "row" }}>
						<MaterialCommunityIcons
							name="checkbox-multiple-blank-outline"
							size={15}
							color="black"
							style={{ marginRight: 5, alignItems: "center" }}
						/>
						<Text>{result.movieLists.length}</Text>
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
