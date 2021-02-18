import React from "react";
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
      <FlatList
        style={{ marginBottom: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dataList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <ContentContainer result={item} type={type} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default ContentListContainer;
