import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import ReminderList from "./ReminderList";
import NotificationMsg from "./NotificationMsg";

const Reminder = ({ navigation }) => {
  const [bellColor, setBellColor] = useState(true);
  const [reminderVisible, setReminderVisible] = useState(false);

  const reminderSwitch = () => {
    setReminderVisible(!reminderVisible);
  };
  return (
    <View style={styles.reminderContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Reminders</Text>

        <Icon
          name={"bell"}
          color={"#624A99"}
          size={24}
          onPress={reminderSwitch}
          style={{ paddingLeft: 20 }}
        />
      </View>
      <Modal
        transparent={true}
        visible={reminderVisible}
        onRequestClose={() => {
          reminderSwitch;
        }}
      >
        <NotificationMsg
          onPress={reminderSwitch}
          //   userId={state.userInfo.authId}
          //   playListData={playListData}
          //   milSec={convertToMil(dateTime)}
          //   bookedDateTime={dateTime}
          //   dateTime={changeToReadable(readableDateTime)}
        />
      </Modal>
      <ReminderList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    marginVertical: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
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
