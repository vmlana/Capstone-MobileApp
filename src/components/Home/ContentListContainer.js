import React, { useState, useEffect } from "react";
import {
	Container,
	Title,
	Content,
	Button,
	Left,
	Right,
	Body,
	Icon,
} from "native-base";

import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import ContentContainer from "./ContentContainer";

const ContentListContainer = ({ title, dataList, navigation, type }) => {
	return (
		<View>
			<Text style={styles.titleText}>{title}</Text>

			{type === "programs" ? (
				<FlatList
					style={{ marginBottom: 20 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={dataList}
					// data={dataList[0].playlists}
					keyExtractor={(item, index) => {
						return item.toString() + index;
					}}
					renderItem={({ item }) => (
						<ContentContainer
							result={item}
							type={type}
							navigation={navigation}
						/>
					)}
				/>
			) : type === "playlists" ? (
				<FlatList
					style={{ marginBottom: 20 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={dataList}
					keyExtractor={(item, index) => {
						return item.toString() + index;
					}}
					renderItem={({ item }) => (
						<ContentContainer
							result={item}
							type={type}
							navigation={navigation}
						/>
					)}
				/>
			) : type === "cat" ? (
				<FlatList
					style={{ marginBottom: 20 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={dataList}
					keyExtractor={(item, index) => {
						return item.toString() + index;
					}}
					renderItem={({ item }) => (
						<ContentContainer
							result={item}
							type={type}
							navigation={navigation}
						/>
					)}
				/>
			) : (
				<FlatList
					style={{ marginBottom: 20 }}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={dataList}
					keyExtractor={(item, index) => {
						return item.toString() + index;
					}}
					renderItem={({ item }) => (
						<ContentContainer
							result={item}
							type={type}
							navigation={navigation}
						/>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	titleText: {
		fontWeight: 'bold',
		fontSize: 19,
		lineHeight: 23,
		color: '#767676'
	}
})


export default ContentListContainer;
