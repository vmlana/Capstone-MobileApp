import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const SurveyNotification = ({ close, navigation, data }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{ ...styles.Text, fontFamily: "GothamRoundedMedium_21022" }}
        >
          Give us your feedback {"\n"}on how we can improve
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.Button}
          activeOpacity={1}
          onPress={() =>
            navigation.navigate("Survey", {
              surveyData: data,
            })
          }
        >
          <Text
            style={{
              color: "#FF9D5A",
              fontSize: 14,
              lineHeight: 20,
              fontFamily: "GothamBook",
            }}
          >
            Feedback
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Icon name={"close"} size={18} color={"white"} onPress={close} />
      </View>
    </View>
  );
};

export default SurveyNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF9D5A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 15,
  },
  Button: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  Text: {
    color: "white",
    fontSize: 14,
    lineHeight: 19
  },
});
