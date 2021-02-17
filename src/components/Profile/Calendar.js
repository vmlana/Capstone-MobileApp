import React, { useState, useEffect } from "react";
import moment from "moment";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from "native-base";

const Calendar = ({ navigation, customStyles }) => {
  const [customStyle, setCustomStyle] = useState(null);

  useEffect(() => {
    customStyles ? setCustomStyle(customStyles) : setCustomStyle(null);
  }, []);

  return (
    <View style={styles.container}>
      <CalendarStrip
        customDatesStyles={customStyle}
        scrollable
        style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
        onDateSelected={(date) => console.log(date)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Calendar;
