import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Text, Button } from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Reminder from "../components/Schedule/Reminder";

import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { Directions } from "react-native-gesture-handler";

import { Context as AuthContext } from "../context/AuthContext";
import { playList } from "../demoData";
import { createSchedule } from "../data/api";

const today = new Date();
const todaysDate = today.toISOString().slice(0, 10);

const SetScheduleScreen = ({ navigation }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pressedDay, setPressedDay] = useState("");
  const [bookedDateArr, setBookedDateArr] = useState([]);
  const [marked, setMarked] = useState({});
  const [isoDateTimeArr, setIsoDateTimeArr] = useState([]);
  const [formatedDateTimeArr, setFormatedDateTimeArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeData, setTimeData] = useState("");
  const [reminderVisible, setReminderVisible] = useState(false);
  const [pickedDateTimeArr, setPickedDateTimeArr] = useState([]);
  const { state } = useContext(AuthContext);

  const data = navigation.getParam("videoData");
  const playListData = navigation.getParam("playListData");

  const showTimePicker = (day) => {
    setTimePickerVisibility(true);
    setPressedDay(day.dateString);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const reminderSwitch = (index) => {
    setTimeData(formatedDateTimeArr[index]);
    setReminderVisible(!reminderVisible);
  };

  const handleConfirm = (time) => {
    const utcTime = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
    const dateGot = utcTime.toISOString().split("T")[0];
    const pickedDateTime = utcTime.toISOString().replace(dateGot, pressedDay);

    const readableDateTime = moment
      .utc(pickedDateTime)
      .format("MMM Do, h:mm a");

    const testTime = new Date(pickedDateTime);

    const scheduleData = {
      userId: state.userInfo.authId,
      programId: null,
      playListId: playListData.playlistId,
      scheduleData: pickedDateTime,
      reminderMinutes: 0,
    };

    setPickedDateTimeArr([...pickedDateTimeArr, testTime.getTime()]);
    setBookedDateArr([...bookedDateArr, pressedDay]);
    setFormatedDateTimeArr([...formatedDateTimeArr, readableDateTime]);
    setIsoDateTimeArr([...isoDateTimeArr, pickedDateTime]);
    setTimePickerVisibility(false);
    createSchedule(scheduleData);
  };

  const getMarkedDate = () => {
    const marking = bookedDateArr.reduce((obj, item) => {
      return {
        ...obj,
        [item]: { selected: true, selectedColor: "blue" },
      };
    }, {});

    setMarked(marking);
  };

  const sortBookedDate = () => {
    return formatedDateTimeArr.map((a, b) => a - b);
  };

  //   fetch booked playlist info by playlistId everytime session booked.
  useEffect(() => {
    const today = new Date();
    setPressedDay(today.toISOString().slice(0, 10));
    getMarkedDate();
  }, [bookedDateArr, formatedDateTimeArr]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Calendar
          onDayPress={showTimePicker}
          enableSwipeMonths={true}
          hideArrows={true}
          markedDates={marked}
        />
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        mode="time"
      />

      {formatedDateTimeArr.length === 0 ? null : (
        <>
          <View style={styles.bookTitle}>
            <Text h4>{playListData.playlistName} Booked</Text>
          </View>
          {formatedDateTimeArr.map((dateTime, index) => (
            <View key={index} style={styles.bookList}>
              <View style={styles.bookInfo}>
                <Text>{dateTime.split(",")[0]}</Text>
                <Text style={{ marginLeft: 20 }}>{dateTime.split(",")[1]}</Text>
              </View>
              <Icon
                name={"bell"}
                color={"#624A99"}
                size={20}
                onPress={() => reminderSwitch(index)}
              />
              <Modal
                transparent={true}
                visible={reminderVisible}
                onRequestClose={() => {
                  reminderSwitch;
                }}
              >
                <Reminder
                  onPress={reminderSwitch}
                  userId={state.userInfo.authId}
                  videoData={data}
                  playListId={playListData.playlistId}
                  milSec={pickedDateTimeArr[index]}
                  dateTime={dateTime}
                />
              </Modal>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default SetScheduleScreen;

const styles = StyleSheet.create({
  bookTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 30,
  },
  bookList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  bookInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
