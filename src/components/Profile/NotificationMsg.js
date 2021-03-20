import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";
import { createSchedule } from "../../data/api";
import moment from "moment";

import * as Notifications from "expo-notifications";
import { Context as AuthContext } from "../../context/AuthContext";

const NotificationMsg = ({ onPress, scheduleArr }) => {
  const { state, scheduleAdded } = useContext(AuthContext);

  const notificationReset = async () => {
    await scheduleArr.map((schedule) => {
      let testDateTime = new Date(schedule.scheduleDate.toLocaleString());
      let localTime = moment(testDateTime).format();

      const dataToSend = {
        userId: schedule.userId,
        scheduleDate: localTime,
        reminderMinutes: 0,
        programId: null,
        programName: null,
        playlistId: schedule.playlistId,
      };

      createSchedule(dataToSend);
    });
    scheduleAdded(state.scheduleSwitch);
  };
  const cancel = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("cancel called");
    await notificationReset();
    onPress();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View>
          <Text h4 style={{ color: "white" }}>
            Turn off all notifications?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Yes"
            onPress={cancel}
            buttonStyle={styles.reminderSetBtn}
            titleStyle={{ color: "#624A99" }}
          />
          <Button
            title="No"
            onPress={onPress}
            buttonStyle={styles.reminderSetBtn}
            titleStyle={{ color: "#624A99" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "white",
  },
  modalView: {
    width: "80%",
    height: "20%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#624A99",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  reminderSetBtn: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 50,
  },
});

export default NotificationMsg;
