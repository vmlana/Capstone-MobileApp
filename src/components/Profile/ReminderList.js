import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";
import Swipeout from "react-native-swipeout";

import { getAllUserScheduleData, deleteSchedule } from "../../data/api";

import { Context as AuthContext } from "../../context/AuthContext";
import { scheduleNotificationAsync } from "expo-notifications";

import moment from "moment";

const ReminderList = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [allScheduleData, setAllScheduleData] = useState([]);
  const [basic, setBasic] = useState(true);
  const [deleteSwitcher, setDeleteSwitcher] = useState(false);

  const changeToReadable = (time) => moment(time).format("MMM Do, h:mm a");

  //   let swipeBtns = [
  //     {
  //       text: "Delete",
  //       backgroundColor: "#ba0c00",
  //       onPress: () => {
  //         console.log("cnacel called");
  //       },
  //     },
  //   ];

  useEffect(() => {
    const getScheduleList = async () => {
      const allUserScheduleData = await getAllUserScheduleData(
        state.userInfo.authId
      );
      setAllScheduleData(allUserScheduleData);
    };
    getScheduleList();
  }, [state.scheduleSwitch, deleteSwitcher]);

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
                  deleteSchedule(data.scheduleId),
                    setDeleteSwitcher(!deleteSwitcher),
                    console.log("delete called");
                },
              },
            ]}
            autoClose="true"
            backgroundColor="transparent"
            style={{ height: 80 }}
          >
            <View style={styles.bookList} key={index}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      playListData: allScheduleData[index],
                    })
                  }
                  key={index}
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
              {data.reminderMinutes !== 0 ? (
                <View style={styles.reminderInfo}>
                  <View style={styles.min}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#707070",
                      }}
                    >
                      {data.reminderMinutes}
                    </Text>
                    <Text>mins</Text>
                  </View>
                  <Text
                    style={{ fontSize: 12, color: "black", color: "#707070" }}
                  >
                    Before session
                  </Text>
                </View>
              ) : null}
            </View>
          </Swipeout>
        ))
      ) : (
        <Text>There is no session booked</Text>
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
