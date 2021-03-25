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

import { colors } from '../../colors';

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
    fontFamily: "GothamRoundedBold_21016",
    color: colors.darkGrey,
    letterSpacing: .2,
    // marginBottom: 4
  }
})

export default RectangleListContainer;