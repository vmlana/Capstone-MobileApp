import React from "react";
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
import CalendarStrip from "react-native-calendar-strip";

const Calendar = () => {
  <Container>
    <Header>
      <Left />
      <Body>{/* <Title>Pivot Care</Title> */}</Body>
      <Right>
        <SearchIcon />
      </Right>
    </Header>
    <Content>
      <CalendarStrip
        scrollable
        style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={"#3343CE"}
        calendarHeaderStyle={{ color: "white" }}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
      />
    </Content>
  </Container>;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Calendar;
