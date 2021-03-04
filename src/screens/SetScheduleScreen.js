import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Text, Button } from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Reminder from "../components/Schedule/Reminder";

import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { Directions } from "react-native-gesture-handler";

const today = new Date();
const todaysDate = today.toISOString().slice(0, 10);

const SetScheduleScreen = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pressedDay, setPressedDay] = useState("");
  const [bookedDateArr, setBookedDateArr] = useState([]);
  const [marked, setMarked] = useState({});
  const [isoDateTimeArr, setIsoDateTimeArr] = useState([]);
  const [formatedDateTimeArr, setFormatedDateTimeArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeData, setTimeData] = useState("");

  const [reminderVisible, setReminderVisible] = useState(false);

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
    const dateGot = time.toISOString().split("T")[0];
    const pickedDateTime = time.toISOString().replace(dateGot, pressedDay);
    const readableDateTime = moment
      .utc(pickedDateTime)
      .format("MMM Do, h:mm a");

    setBookedDateArr([...bookedDateArr, pressedDay]);
    setFormatedDateTimeArr([...formatedDateTimeArr, readableDateTime]);
    setIsoDateTimeArr([...isoDateTimeArr, pickedDateTime]);
    setTimePickerVisibility(false);
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
            <Text h4>Session Booked</Text>
          </View>
          {formatedDateTimeArr.map((dateTime, index) => (
            <View key={index} style={styles.bookList}>
              <View style={styles.bookInfo}>
                <Text>{dateTime.split(",")[0]}</Text>
                <Text style={{ marginLeft: 20 }}>{dateTime.split(",")[1]}</Text>
              </View>
              <Icon
                name={"bell"}
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
                <Reminder onPress={reminderSwitch} dateTime={timeData} />
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
  },
  bookInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
