import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Text } from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalendarStrip from "react-native-calendar-strip";
// import DatePicker from "react-native-date-picker";

import Calendar from "../components/Profile/Calendar";

import moment from "moment";

const SetScheduleScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formatedTime, setFormatedTime] = useState(null);
  const [ampm, setAmpm] = useState(null);
  const [dateTime, setDateTime] = useState([]);

  //   const showDatePicker = () => {
  //     setDatePickerVisibility(true);
  //   };

  //   const hideDatePicker = () => {
  //     setDatePickerVisibility(false);
  //   };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    console.log("A time has been picked: ", new Date(time).toLocaleString());
    const readableTime = new Date(time).toLocaleString();
    const arrayTime = readableTime.split(" ");
    setFormatedTime(
      arrayTime.length !== 5
        ? arrayTime[1].slice(0, -3)
        : arrayTime[3].slice(0, -3)
    );
    setAmpm(arrayTime.length !== 5 ? arrayTime[2] : "");
    setSelectedTime(time.toISOString().split("T")[1]);
    setTimePickerVisibility(false);
  };

  //   console.log(selectedDate);
  //   console.log(selectedTime);

  //   const dateTime = moment(
  //     `${selectedDate} ${selectedTime}`,
  //     "YYYY-MM-DD HH:mm:ss"
  //   ).format();

  useEffect(() => {
    const concatDateTime = selectedDate + "T" + selectedTime;
    setDateTime(concatDateTime);
  }, [selectedDate, selectedTime, dateTime]);

  const formatedDate = new Date();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <CalendarStrip
          scrollable
          onDateSelected={(date) => (
            showTimePicker(),
            setSelectedDate(date.toISOString().substring(0, 10))
          )}
          style={{
            paddingTop: 40,
            paddingBottom: 10,
            height: 200,
            marginHorizontal: 25,
          }}
          calendarHeaderStyle={{ color: "gray", fontSize: 18 }}
          dateNumberStyle={{ color: "#B7B7B7", fontSize: 24 }}
          dateNameStyle={{ color: "#B7B7B7" }}
          styleWeekend={false}
          highlightDateNumberStyle={{ color: "blue", fontSize: 24 }}
          highlightDateNameStyle={{ color: "blue" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          iconStyle={{ display: "none" }}
        />
      </View>
      {/* <DatePicker mode={"time"} /> */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        mode="time"
      />

      {!selectedTime ? null : (
        <>
          <View style={styles.bookTitle}>
            <Text h4>Session Booked</Text>
            <Text>Bell Icon</Text>
          </View>
          <View style={styles.bookInfo}>
            <Text>{moment(selectedDate).format("MMM Do YY")}</Text>
            <Text style={{ marginLeft: 20 }}>{formatedTime + " " + ampm}</Text>
          </View>
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
    marginBottom: 10,
  },
  bookInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 25,
  },
});
