import React, { useState } from "react";
import { Text } from "react-native-elements";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const wheelPickerData = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const Picker = () => {
  return (
    <>
      <ScrollPicker
        dataSource={[
          //   { value: 10, text: "10 mins" },
          //   { value: 15, text: "15 mins" },
          //   { value: 20, text: "20 mins" },
          //   { value: 25, text: "25 mins" },
          //   { value: 30, text: "30 mins" },
          "10",
          "15",
          "20",
        ]}
        selectedIndex={1}
        renderItem={(data, index) => data.text}
        onValueChange={(data, selectedIndex) => {
          console.log(data);
        }}
        wrapperHeight={40}
        wrapperWidth={100}
        wrapperBackground={"#624A99"}
        itemHeight={20}
        highlightColor={"#624A99"}
        itemTextStyle={{ color: "white" }}
        // activeItemTextStyle={}
      />
    </>
  );
};

export default Picker;
