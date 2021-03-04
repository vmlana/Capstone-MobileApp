import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import { abs } from "react-native-reanimated";
import Picker from "./Picker";

const Reminder = ({ onPress }) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
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
              <Text style={{ color: "white" }}>06.01.2021</Text>
              <Text style={{ marginLeft: 20, color: "white" }}>12:00PM</Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
              }}
            >
              <Picker style={styles.reminderPicker} />
              <Text
                style={{
                  alignSelf: "center",
                  backgroundColor: "#93c3e6",
                  marginLeft: 45,
                }}
              ></Text>
              <Text
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  right: 0,
                  backgroundColor: "rgba(0, 123, 255, 0.48)",
                  paddingLeft: 60,
                  paddingRight: 5,
                  paddingVertical: 5,
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
          onPress={onPress}
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
