import React, { useState } from "react";
import { Text } from "react-native-elements";
import { onChange } from "react-native-reanimated";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const Picker = ({ onChange }) => {
  return (
    <>
      <ScrollPicker
        dataSource={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]}
        selectedIndex={1}
        renderItem={(data, index) => data}
        onValueChange={(data, selectedIndex) => {
          onChange(data);
        }}
        wrapperHeight={40}
        wrapperWidth={100}
        wrapperBackground={"#7561A4"}
        itemHeight={23}
        highlightColor={"#707070"}
        itemTextStyle={{ fontSize: 0.5, color: "white" }}
        activeItemTextStyle={{ color: "black", zIndex: 5 }}
        highlightWidth={1}
      />
    </>
  );
};

export default Picker;
