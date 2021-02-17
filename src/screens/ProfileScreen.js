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
