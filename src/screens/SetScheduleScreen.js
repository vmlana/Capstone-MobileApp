import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CalendarStrip from "react-native-calendar-strip";

import Calendar from "../components/Profile/Calendar";

const SetScheduleScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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
    setTimePickerVisibility(false);
  };

  return (
    <View>
      <CalendarStrip
        scrollable
        style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
        onDateSelected={(date) => (showTimePicker(), console.log(date))}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        mode="time"
      />
    </View>
  );
};

export default SetScheduleScreen;

const styles = StyleSheet.create({});
