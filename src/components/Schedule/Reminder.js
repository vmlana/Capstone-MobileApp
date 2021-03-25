import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { abs } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Entypo";
import Picker from "./Picker";
import { colors } from "../../colors";

import moment from "moment";

import { createSchedule } from "../../data/api";

import { Context as AuthContext } from "../../context/AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Reminder = ({
  onPress,
  userId,
  playListData,
  milSec,
  dateTime,
  bookedDateTime,
}) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [min, setMin] = useState(0);
  const [minutes, setMinutes] = useState(10);

  const { state, scheduleAdded } = useContext(AuthContext);

  const dateDatatoPasstoDB = new Date(bookedDateTime).toISOString();
  console.log("in reminder", dateDatatoPasstoDB);

  const setMinTime = (val) => {
    const minToMilSec = val * 60000;
    setMin(minToMilSec);
    setMinutes(val);
  };

  const now = new Date();
  const currentMil = now.getTime();

  async function scheduleAndCancel() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey!",
      },
      trigger: { seconds: 5, repeats: true },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  const schedulePushNotification = async (time) => {
    // console.log("notification time", milSec - min - currentMil);

    const reminderData = {
      userId: userId,
      programId: null,
      playlistId: playListData.playlistId,
      scheduleDate: dateDatatoPasstoDB,
      reminderMinutes: minutes,
    };

    onPress();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "It's about time to move your body! 📬",
        body: `Booked Session - ${playListData.playlistName}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
      //   trigger: { seconds: (milSec - min - currentMil) / 1000 },
    });

    async function newList() {
      await createSchedule(reminderData);

      scheduleAdded(state.scheduleSwitch);
    }
    newList();
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Icon
          name={"cross"}
          size={32}
          style={styles.crossIcon}
          onPress={onPress}
        />
        <View style={styles.modalHeader}>
          <Text
            style={{
              ...styles.modalText,
              fontFamily: "GothamRoundedBold_21016",
              color: "white",
            }}
          >
            Add a Reminder
          </Text>
          <Text
            style={{
              ...styles.modalTextSmall,
              fontFamily: "GothamRoundedBook_21018",
              color: "white",
            }}
          >
            Set-up a reminder before class
          </Text>
        </View>

        <View style={styles.reminderInfo}>
          <View>
            <Text
              style={{
                marginVertical: 5,
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                fontFamily: "GothamRoundedBold_21016",
              }}
            >
              {playListData.playlistName}
            </Text>
            <View style={styles.bookedTime}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "GothamRoundedBook_21018",
                }}
              >
                {dateTime.split(",")[0]}
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  color: "white",
                  fontFamily: "GothamRoundedBook_21018",
                }}
              >
                {dateTime.split(",")[1]}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Picker style={styles.reminderPicker} onChange={setMinTime} />
              <Text
                style={{
                  marginLeft: 45,
                }}
              ></Text>
              <Text
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  right: 0,
                  backgroundColor: "rgba(144, 186, 226, 0.5)",
                  paddingLeft: 50,
                  paddingRight: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  color: "#707070",

                  zIndex: 1,
                }}
              >
                mins
              </Text>
            </View>
            <Text
              style={{
                fontSize: 11,
                color: "white",
                fontFamily: "GothamRoundedBook_21018",
              }}
            >
              Before Session
            </Text>
          </View>
        </View>

        <Button
          title="Done"
          onPress={async () => {
            await schedulePushNotification(min);
          }}
          buttonStyle={styles.reminderSetBtn}
          titleStyle={{
            color: "#624A99",
            fontFamily: "GothamRoundedBook_21018",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "white",
  },
  modalView: {
    width: "80%",
    height: "35%",
    justifyContent: "space-between",
    backgroundColor: "#7561A4",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  crossIcon: {
    position: "absolute",
    top: 6,
    right: 6,
    color: "white",
    padding: 6,
    zIndex: 3,
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "white",

    alignItems: "flex-start",
  },
  modalText: {
    marginBottom: 7,
    // color: "white",
    // fontWeight: "700",
    fontSize: 18,
  },
  modalTextSmall: {
    marginBottom: 7,
    textAlign: "center",
    color: "white",
  },
  reminderInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bookedTime: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 20,
  },
  //   reminderPicker: { zIndex: 100 },
  reminderSetBtn: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Reminder;
