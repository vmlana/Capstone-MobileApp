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

import { View, FlatList } from "react-native";
import { Text } from "react-native-elements";

import RectangleContainer from "./RectangleContainer";

const RectangleListContainer = ({ title, dataList, navigation }) => {
  return (
    <View>
      <Text h4>{title}</Text>

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
            />
          )}
        />
    </View>
  );
};

export default RectangleListContainer;