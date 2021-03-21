import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Thumbnail } from "native-base";
import { Button, Text, Input } from "react-native-elements";

import ClapImage from '../../../assets/icons-clap.png'
import CelebrateImage from '../../../assets/icons-celebrate.png'
import WinnerImage from '../../../assets/icons-winner.png'
const clapImageUri = Image.resolveAssetSource(ClapImage).uri
const celebrateImageUri = Image.resolveAssetSource(CelebrateImage).uri
const winnerImageUri = Image.resolveAssetSource(WinnerImage).uri

const Update = ({ weekWorkout }) => {
	const dashboardArr = [
		{
			imgeUri: clapImageUri,
			color: '#65A4D1',
			text: 'Keep it Up!'
		},
		{
			imgeUri: celebrateImageUri,
			color: '#7561A4',
			text: 'Great Job!'
		},
		{
			imgeUri: winnerImageUri,
			color: '#FBA76E',
			text: 'Bravo!'
		}
	]

	var randomDashboard = dashboardArr[Math.floor(Math.random() * dashboardArr.length)];

	// console.log(randomDashboard)

	return (
		<View style={[styles.container, { backgroundColor: randomDashboard.color }]} >
			<View style={styles.textContainer}>
				<Text style={styles.headerText}>{randomDashboard.text}</Text>
				<Text style={styles.headerSubText}>You completed {weekWorkout} workouts last week!</Text>
			</View>
			<Thumbnail
				large
				source={{
					uri: randomDashboard.imgeUri,
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
		marginTop: 25,
		alignItems: "center",
		paddingHorizontal: 25,
		paddingVertical: 20,
		// backgroundColor: '#65A4D1', 

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
