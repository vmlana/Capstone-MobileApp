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

import ContentContainer from "./ContentContainer";

const ContentListContainer = ({ title, dataList, navigation, type }) => {
  return (
    <View>
      <Text h4>{title}</Text>

      {type === "programs" ? (
        <FlatList
          style={{ marginBottom: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dataList[0].playlists}
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

export default ContentListContainer;
