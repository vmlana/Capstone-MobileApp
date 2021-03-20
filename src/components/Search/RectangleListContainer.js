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

import RectangleContainer from "./RectangleContainer";

const RectangleListContainer = ({ title, dataList, navigation, onPressScroll }) => {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>

        <FlatList
          style={{ marginBottom: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataList}
          keyExtractor={(item, index) => {
            return item.toString() + index;
          }}
          renderItem={({ item }) => (
            <RectangleContainer
              result={item}
              navigation={navigation}
              onPressScroll={onPressScroll}
            />
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#707070",
    // letterSpacing: .2
  }
})

export default RectangleListContainer;