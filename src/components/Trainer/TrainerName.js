import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Thumbnail } from "native-base";

const TrainerName = ({ navigation, data }) => {
	return (
		<TouchableOpacity
			style={styles.trainerInfo}
			onPress={() => navigation.navigate("TrainerDetails", { instructorName: data.instructorName, instructorID: data.instructorID })}
		>
			<Thumbnail
				small
				source={{
					uri:
						"https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png",
				}}
				style={styles.thumbNail}
			/>
			<Text style={{ marginLeft: 5 }}>{data.instructorName}</Text>
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
