import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import ReminderList from "./ReminderList";

const Reminder = ({ navigation }) => {
  return (
    <View style={styles.reminderContainer}>
      <Text style={styles.titleText}>Reminders</Text>
      <ReminderList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    marginVertical: 15,
  },
  titleText: {
    fontSize: 26,
    lineHeight: 31,
    color: "#707070",
    marginBottom: 15,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#707070",
    marginBottom: 15,
  },
});

export default Reminder;
