import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Thumbnail } from "native-base";
import { Button, Text, Input } from "react-native-elements";

import ClapImage from '../../../assets/icons-clap.png'
const clapImageUri = Image.resolveAssetSource(ClapImage).uri

const Update = () => {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.headerText}>Keep it Up!</Text>
				<Text style={styles.headerSubText}>You completed 5 workouts last week!</Text>
			</View>
			<Thumbnail
				large
				source={{
					uri: clapImageUri,
				}}
			/>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 25,
		marginVertical: 25,
		alignItems: "center",
		paddingHorizontal: 25,
		paddingVertical: 20,
		backgroundColor: '#65A4D1',

	},
	textContainer: {
		width: "65%",
		color: '#FFFFFF'
	},
	headerText: {
		color: '#FFFFFF',
		fontSize: 28,
		lineHeight: 34,
		marginBottom: 5
	},
	headerSubText: {
		color: '#FFFFFF',
		fontSize: 13,
		lineHeight: 15
	}
});

export default Update;
