import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";

import { getAllUserScheduleData } from "../../data/api";

import { Context as AuthContext } from "../../context/AuthContext";
import { scheduleNotificationAsync } from "expo-notifications";

import moment from "moment";

const ReminderList = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [allScheduleData, setAllScheduleData] = useState([]);

  const changeToReadable = (time) => moment(time).format("MMM Do, h:mm a");

  useEffect(() => {
    const getScheduleList = async () => {
      const allUserScheduleData = await getAllUserScheduleData(
        state.userInfo.authId
      );
      setAllScheduleData(allUserScheduleData);
    };
    getScheduleList();

    console.log("called");
  }, [state.scheduleSwitch]);
  return (
    <View>
      {allScheduleData.map((data, index) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PlayList", {
              playListData: allScheduleData[index],
            })
          }
          style={styles.bookList}
          key={index}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
              {data.playlistName}
            </Text>
            <View style={styles.bookInfo}>
              <Text>{changeToReadable(data.scheduleDate).split(",")[0]}</Text>
              <Text style={{ marginLeft: 20 }}>
                {changeToReadable(data.scheduleDate).split(",")[1]}
              </Text>
            </View>
          </View>
          {data.reminderMinutes !== 0 ? (
            <View style={styles.reminderInfo}>
              <View style={styles.min}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {data.reminderMinutes}
                </Text>
                <Text>mins</Text>
              </View>
              <Text style={{ fontSize: 12, color: "black" }}>
                Before session
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
    marginVertical: 10,
    paddingBottom: 16,
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
