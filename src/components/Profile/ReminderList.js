import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Text, Button } from "react-native-elements";
import Swipeout from "react-native-swipeout";

import Reminder from "../Schedule/Reminder";
import {
  getAllUserScheduleData,
  deleteSchedule,
  getPlaylistByPlaylistId,
} from "../../data/api";

import { Context as AuthContext } from "../../context/AuthContext";
import { scheduleNotificationAsync } from "expo-notifications";

import moment from "moment";

const ReminderList = ({ navigation, getScheduleArr }) => {
  const { state, scheduleAdded } = useContext(AuthContext);
  const [allScheduleData, setAllScheduleData] = useState([]);
  const [deleteSwitcher, setDeleteSwitcher] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [readableDateTime, setReadableDateTime] = useState(null);
  const [playListData, setPlayListData] = useState({});

  const changeToReadable = (time) => moment(time).format("MMM Do, h:mm a");
  const convertToMil = (time) => {
    const testTime = new Date(time);
    return testTime.getTime();
  };

  const reminderSwitch = () => {
    setReminderVisible(!reminderVisible);
  };

  const reminderSwitchWithData = async (playlistId, dateTime) => {
    const getPlaylist = async () => {
      const playlistData = await getPlaylistByPlaylistId(playlistId);
      setPlayListData(playlistData);
    };
    await getPlaylist();

    let testDateTime = new Date(dateTime.toLocaleString());
    let localTime = moment(testDateTime).format();
    await setReadableDateTime(localTime);

    setReminderVisible(!reminderVisible);
  };

  useEffect(() => {
    const getScheduleList = async () => {
      const allUserScheduleData = await getAllUserScheduleData(
        state.userInfo.authId
      );
      setAllScheduleData(allUserScheduleData);
      getScheduleArr(allUserScheduleData);
    };

    getScheduleList();
  }, [state.scheduleSwitch]);

  return (
    <View>
      {allScheduleData !== null ? (
        allScheduleData.map((data, index) => (
          <Swipeout
            right={[
              {
                text: "Delete",
                backgroundColor: "#ba0c00",
                onPress: () => {
                  deleteSchedule(data.scheduleId).then((result) => {
                    console.log("delete data complete");
                    return scheduleAdded(state.scheduleSwitch);
                  });
                  // setDeleteSwitcher(!deleteSwitcher),

                  console.log("delete called");
                },
              },
            ]}
            autoClose={true}
            backgroundColor="transparent"
            style={{ height: 80 }}
            key={index}
          >
            <View style={styles.bookList}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      playListData: allScheduleData[index],
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 5,
                      color: "#707070",
                    }}
                  >
                    {data.playlistName}
                  </Text>
                </TouchableOpacity>

                <View style={styles.bookInfo}>
                  <Text style={{ color: "#707070" }}>
                    {changeToReadable(data.scheduleDate).split(",")[0]}
                  </Text>
                  <Text style={{ marginLeft: 20, color: "#707070" }}>
                    {changeToReadable(data.scheduleDate).split(",")[1]}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.reminderInfo}
                onPress={() =>
                  reminderSwitchWithData(data.playlistId, data.scheduleDate)
                }
              >
                <View style={styles.min}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#707070",
                    }}
                  >
                    {data.reminderMinutes !== 0 ? data.reminderMinutes : 0}
                  </Text>
                  <Text>mins</Text>
                </View>
                <Text
                  style={{ fontSize: 12, color: "black", color: "#707070" }}
                >
                  Before session
                </Text>
              </TouchableOpacity>
            </View>
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
                playListData={playListData[0]}
                milSec={convertToMil(readableDateTime)}
                bookedDateTime={readableDateTime}
                dateTime={changeToReadable(readableDateTime)}
              />
            </Modal>
          </Swipeout>
        ))
      ) : (
        <Text style={{ color: "#707070" }}>There is no session booked</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bookList: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    alignItems: "center",
  },
  bookInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  reminderInfo: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignSelf: "flex-end",
  },
  min: {
    backgroundColor: "rgba(144, 186, 226, 0.5)",
    borderRadius: 3,
    paddingVertical: 3,
    marginBottom: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ReminderList;
