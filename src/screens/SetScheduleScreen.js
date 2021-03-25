import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import { Text, Button } from "react-native-elements";
import { colors } from "../colors";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Reminder from "../components/Schedule/Reminder";

import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { Directions } from "react-native-gesture-handler";

import { Context as AuthContext } from "../context/AuthContext";
import { playList } from "../demoData";
import { createSchedule, getUserScheduleData } from "../data/api";
import { createIconSetFromFontello } from "@expo/vector-icons";

const today = new Date();
const todaysDate = today.toISOString().slice(0, 10);
const currentMil = moment().valueOf();

const SetScheduleScreen = ({ navigation }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [pressedDay, setPressedDay] = useState("");
  const [marked, setMarked] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [readableDateTime, setReadableDateTime] = useState(null);
  const [reminderVisible, setReminderVisible] = useState(false);

  const { state, scheduleAdded } = useContext(AuthContext);

  const [scheduleDataArr, setscheduleDataArr] = useState([]);
  const [change, setChange] = useState(false);

  const data = navigation.getParam("videoData");
  const playListData = navigation.getParam("playListData");

  const showTimePicker = (day) => {
    setTimePickerVisibility(true);
    setPressedDay(day.dateString);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const reminderSwitch = (val) => {
    val ? setReadableDateTime(val) : null;
    setReminderVisible(!reminderVisible);
  };

  const handleConfirm = (time) => {
    const localTime = new Date(
      time.getTime() - time.getTimezoneOffset() * 60000
    );
    const dateGot = localTime.toISOString().split("T")[0];
    // const dateGot = time.toISOString().split("T")[0];
    // console.log("dateGot&pressedDate", dateGot, pressedDay);
    // console.log("time", time);
    // console.log(
    //   "utcTimetoPass",
    //   localTime.toISOString().split("T")[1].slice(0, -1)
    // );
    const selectedLocalTime = localTime
      .toISOString()
      .split("T")[1]
      .slice(0, -7);
    const selectedLoaclDateandTime = pressedDay + "T" + selectedLocalTime;
    const pickedDateTime = new moment(
      selectedLoaclDateandTime,
      "YYYY-MM-DDTHH:mm"
    ).utc();
    // console.log("SLDT", selectedLoaclDateandTime);
    // console.log("final utc date and time", finalDateUTC);
    // const pickedDateTime = time.toISOString().replace(dateGot, pressedDay);
    // const pickedDateTime = localTime.toISOString().replace(dateGot, pressedDay);
    const readableDateTime = moment(pickedDateTime).format("MMM Do, h:mm a");

    const scheduleData = {
      userId: state.userInfo.authId,
      programId: null,
      playlistId: playListData.playlistId,
      scheduleDate: pickedDateTime,
      reminderMinutes: 0,
    };

    setTimePickerVisibility(false);
    async function newList() {
      await createSchedule(scheduleData);
      //   setChange(!change);
      scheduleAdded(state.scheduleSwitch);
    }
    newList();
  };

  const getMarkedDate = () => {
    let currentDate = moment().format().split("T")[0];
    const currentDateObj = {
      [currentDate]: {
        marked: true,
        customStyles: {
          text: {
            fontWeight: "bold",
          },
        },
      },
    };

    const marking = scheduleDataArr.reduce((obj, item) => {
      return {
        ...obj,
        [item.split("T")[0]]: {
          selected: true,
          selectedColor: "#624A99",
        },
      };
    }, {});

    let markingObj = Object.assign({}, currentDateObj, marking);

    setMarked(markingObj);
  };

  const changeToReadable = (time) => moment(time).format("MMM Do, h:mm a");
  const convertToMil = (time) => {
    const testTime = new Date(time);
    return testTime.getTime();
  };

  //   fetch booked playlist info by playlistId everytime session booked.
  useEffect(() => {
    const today = new Date();
    setPressedDay(today.toISOString().slice(0, 10));
    getMarkedDate();
  }, [scheduleDataArr]);

  useEffect(() => {
    const getScheduleArr = async (userId, playlistId) => {
      let scheduleListArr = await getUserScheduleData(userId, playlistId);

      if (scheduleListArr !== null) {
        const x = await scheduleListArr.map((schedule) => {
          let testDateTime = new Date(schedule.scheduleDate.toLocaleString());
          let localTime = moment(testDateTime).format();
          return localTime;
        });

        setscheduleDataArr(x);
      } else {
        setscheduleDataArr([]);
      }
    };

    getScheduleArr(state.userInfo.authId, playListData.playlistId);
  }, [state.scheduleSwitch]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Calendar
          markingType={"custom"}
          onDayPress={showTimePicker}
          enableSwipeMonths={true}
          hideArrows={false}
          markedDates={marked}
          theme={{
            textDayFontFamily: "GothamRoundedBook_21018",
            textMonthFontFamily: "GothamRoundedBook_21018",
            textDayHeaderFontFamily: "GothamRoundedBook_21018",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            todayTextColor: "#4F99CE",
            arrowColor: "#624A99",
          }}
        />
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        headerTextIOS={"Pick a time"}
        mode="time"
      />

      {scheduleDataArr.length === 0 ? null : (
        <>
          <View style={styles.bookTitle}>
            <Text
              h4
              style={{
                fontFamily: "GothamRoundedMedium_21022",
                color: colors.darkGrey,
              }}
            >
              {playListData.playlistName} Booked
            </Text>
          </View>
          <ScrollView>
            {scheduleDataArr.map((dateTime, index) => (
              <View key={index} style={styles.bookList}>
                <View style={styles.bookInfo}>
                  <Text
                    style={{
                      fontFamily: "GothamRoundedBook_21018",
                      color: colors.darkGrey,
                    }}
                  >
                    {changeToReadable(dateTime).split(",")[0]}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontFamily: "GothamRoundedBook_21018",
                      color: colors.darkGrey,
                    }}
                  >
                    {changeToReadable(dateTime).split(",")[1]}
                  </Text>
                </View>
                <Icon
                  name={"bell"}
                  color={"#624A99"}
                  size={20}
                  onPress={() => reminderSwitch(dateTime)}
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
                    playListData={playListData}
                    milSec={convertToMil(dateTime)}
                    bookedDateTime={readableDateTime}
                    dateTime={changeToReadable(readableDateTime)}
                  />
                </Modal>
              </View>
            ))}
          </ScrollView>
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
