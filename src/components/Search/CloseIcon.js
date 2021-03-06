import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";

import { useSearchContext } from '../../../src/context/searchContext';


const CloseIcon = ({ navigation }) => {
  const { searchString, setSearchString } = useSearchContext();

  const deleteInput = () => {
    navigation.goBack();
    setSearchString("");
  };
  return <Ionicons name="close" onPress={deleteInput} style={styles.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
    fontSize: 30,
    color: "#7561A4",
  },
});

export default withNavigation(CloseIcon);
