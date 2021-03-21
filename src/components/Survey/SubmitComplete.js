import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SubmitComplete = () => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View>
          <Text h4 style={{ color: "white" }}>
            Complete Submitted
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SubmitComplete;

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
    height: "20%",
    justifyContent: "space-between",
    alignItems: "center",
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
});
