import React from "react";
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

import SearchIcon from "../components/Search/SearchIcon";
import Calendar from "../components/Profile/Calendar";

let customDatesStyles = [];
let startDate = moment();
for (let i = 0; i < 6; i++) {
  customDatesStyles.push({
    startDate: startDate.clone().add(i, "days"), // Single date since no endDate provided
    // dateNameStyle: styles.dateNameStyle,
    // dateNumberStyle: { color: "purple" },
    // Random color...
    dateContainerStyle: {
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderWidth: 1,
    },
  });
}

{
  /* <CalendarStrip
          scrollable
          onDateSelected={(date) => (
            showTimePicker(),
            setSelectedDate(date.toISOString().substring(0, 10))
          )}
          style={{
            paddingTop: 40,
            paddingBottom: 10,
            height: 200,
            marginHorizontal: 25,
          }}
          calendarHeaderStyle={{ color: "gray", fontSize: 18 }}
          dateNumberStyle={{ color: "#B7B7B7", fontSize: 24 }}
          dateNameStyle={{ color: "#B7B7B7" }}
          styleWeekend={false}
          highlightDateNumberStyle={{ color: "blue", fontSize: 24 }}
          highlightDateNameStyle={{ color: "blue" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey" }}
          iconStyle={{ display: "none" }}
        /> */
}

const ProfileScreen = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <Calendar customStyles={customDatesStyles} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ProfileScreen;
