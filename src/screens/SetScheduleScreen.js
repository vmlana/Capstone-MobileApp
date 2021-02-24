import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Text } from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";
// import CalendarStrip from "react-native-calendar-strip";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import moment from "moment";
const today = new Date();
const todaysDate = today.toISOString().slice(0, 10);

const SetScheduleScreen = () => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pressedDay, setPressedDay] = useState("");
  const [bookedDateArr, setBookedDateArr] = useState([]);
  const [marked, setMarked] = useState({});
  const [isoDateTimeArr, setIsoDateTimeArr] = useState([]);
  const [formatedDateTimeArr, setFormatedDateTimeArr] = useState([]);

  const showTimePicker = (day) => {
    setTimePickerVisibility(true);
    setPressedDay(day.dateString);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
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
        {/* <CalendarStrip
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
        /> */}

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
            <Text>Bell Icon</Text>
          </View>
          {formatedDateTimeArr.map((dateTime, index) => (
            <View key={index} style={styles.bookInfo}>
              <Text>{dateTime.split(",")[0]}</Text>
              <Text style={{ marginLeft: 20 }}>{dateTime.split(",")[1]}</Text>
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
  bookInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
