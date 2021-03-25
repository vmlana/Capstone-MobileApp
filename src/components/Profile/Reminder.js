import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import ReminderList from "./ReminderList";
import NotificationMsg from "./NotificationMsg";

const Reminder = ({ navigation }) => {
  const [bellColor, setBellColor] = useState(true);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [scheduleArr, setScheduleArr] = useState([]);

  const reminderSwitch = () => {
    setReminderVisible(!reminderVisible);
  };

  const getScheduleArr = (array) => {
    setScheduleArr(array);
  };

  return (
    <View style={styles.reminderContainer}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.titleText}>Reminders</Text>
          <Text style={{ color: "#707070", fontFamily: 'GothamLight', fontSize: 15, lineHeight: 20 }}>
            Set-up a reminder before class
          </Text>
        </View>

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
          scheduleArr={scheduleArr}
        //   userId={state.userInfo.authId}
        //   playListData={playListData}
        //   milSec={convertToMil(dateTime)}
        //   bookedDateTime={dateTime}
        //   dateTime={changeToReadable(readableDateTime)}
        />
      </Modal>
      <ReminderList navigation={navigation} getScheduleArr={getScheduleArr} />
    </View>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    marginTop: 30,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#707070'
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  titleText: {
    fontSize: 26,
    lineHeight: 36,
    color: "#707070",
    fontFamily: 'GothamRoundedBold_21016'
  },
  contactText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#707070",
    marginBottom: 15,
  },
});

export default Reminder;
