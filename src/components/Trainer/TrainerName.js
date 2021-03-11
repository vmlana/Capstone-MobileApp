import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Thumbnail } from "native-base";

import { getInstructorInfo } from '../../data/api'

const TrainerName = ({ navigation, data, blog }) => {

	console.log(data.imageFile)

	const [instructorInfo, setinstructorInfo] = useState([]);

	useEffect(() => {
		getInstructorInfo(data.instructorID).then(
			instructors => {
				instructors.map(instructor => {
					setinstructorInfo(instructor)
				})
			}
		)
	}, [])

	return (
		<TouchableOpacity
			style={
				!blog?
				styles.trainerInfo:
				styles.trainerInfoForBlog
				}
			onPress={() => navigation.navigate("TrainerDetails", { instructorName: data.instructorName, instructorID: data.instructorID })}
		>
			<Thumbnail
				small
				source={{
					uri: data.instructorImage,
				}}
				style={styles.thumbNail}
			/>
			<Text style={styles.trainerName}>
				{data.instructorName ? data.instructorName : data.trainerName}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	trainerInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 7,
	},
	thumbNail: {
		width: 24,
		height: 24,
		marginRight: 5,
	},

	trainerName: {
		fontSize: 13,
		lineHeight: 13,
		color: '#707070'
	},
	trainerInfoForBlog: {
		flexDirection: "row",
		alignItems: "center",
		// marginTop: 7,
	},
});

export default TrainerName;
