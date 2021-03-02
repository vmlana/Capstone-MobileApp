import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";

import { useSearchContext } from '../../../src/context/searchContext';


const CloseIcon = ({ navigation }) => {
  const {searchString, setSearchString} = useSearchContext();

  const deleteInput = () => {
    navigation.goBack();
    setSearchString("");
  };
  return <Ionicons name="close" onPress={deleteInput} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 30,
    fontSize: 20,
    color: "grey",
  },
});

export default withNavigation(CloseIcon);
