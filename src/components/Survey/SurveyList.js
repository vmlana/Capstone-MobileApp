import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { colors } from "../../colors";

const SurveyList = ({ data, onPick, indexVal }) => {
  const [value, setValue] = useState("1");
  //   console.log(("indexVal", indexVal), ("questionId", data.questionId));

  const onPress = (newValue) => {
    setValue(newValue);
    onPick(indexVal, newValue, data.questionId);
  };

  return (
    <View>
      <RadioButton.Group
        onValueChange={(newValue) => {
          onPress(newValue);
        }}
        value={value}
      >
        {data.options.map((survey, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <RadioButton value={survey.optionId} color={"#624A99"} />
            {/* <View
              style={{
                borderWidth: 1,
                padding: 8,
                position: "absolute",
                left: 10,
                top: 10,
              }}
            ></View> */}
            <Text
              style={{ ...styles.text, fontFamily: "GothamRoundedBook_21018" }}
            >
              {survey.optionDescription}
            </Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#767676",
  },
});

export default SurveyList;
