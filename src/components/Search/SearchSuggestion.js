import React from "react";
import { View, Text } from "react-native";

const SearchSuggestion = (props) => {
  return (
    <View>
      <Text>Search Suggestion {props.text}</Text>
    </View>
  );
};

export default SearchSuggestion;
