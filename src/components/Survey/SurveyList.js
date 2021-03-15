import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

const SurveyList = ({ data }) => {
  const [value, setValue] = useState("1");
  return (
    <View>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        {/* <View style={{ flexDirection: "row" }}> */}
        {data.map((survey) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={survey.optionValue} color={"#624A99"} />
            <Text>{survey.optionDescription}</Text>
          </View>
        ))}
        {/* </View> */}
      </RadioButton.Group>
    </View>
  );
};
const styles = StyleSheet.create({});

export default SurveyList;
