import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { abs } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Entypo";
import Picker from "./Picker";

import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Reminder = ({ onPress, videoData, milSec, dateTime }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [min, setMin] = useState(0);

  const setMinTime = (val) => {
    const minToMilSec = val * 60000;
    setMin(minToMilSec);
  };

  const now = new Date();
  const utcTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const currentTime = new Date(utcTime.toISOString());
  const currentMil = currentTime.getTime();

  const schedulePushNotification = async (time) => {
    // console.log("notification time", milSec - min - currentMil);
    onPress();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "It's about time to move your body! 📬",
        body: videoData.lessonName,
        data: { data: "goes here" },
      },
      trigger: { seconds: (milSec - min - currentMil) / 1000 },
    });
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
          <Text style={styles.modalText}>Add a Reminder</Text>
          <Text style={styles.modalTextSmall}>
            Set-up a reminder before class
          </Text>
        </View>

        <View style={styles.reminderInfo}>
          <View>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Session Name
            </Text>
            <View style={styles.bookedTime}>
              <Text style={{ color: "white" }}>{dateTime.split(",")[0]}</Text>
              <Text style={{ marginLeft: 20, color: "white" }}>
                {dateTime.split(",")[1]}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
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
                  color: "black",
                }}
              >
                mins
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: "white" }}>Before Session</Text>
          </View>
        </View>

        <Button
          title="Done"
          onPress={async () => {
            await schedulePushNotification(min);
          }}
          buttonStyle={styles.reminderSetBtn}
          titleStyle={{ color: "#624A99" }}
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
    backgroundColor: "#624A99",
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
    color: "white",
    fontWeight: "700",
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
  //   reminderPicker: {},
  reminderSetBtn: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Reminder;
