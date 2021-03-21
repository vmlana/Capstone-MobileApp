import React, { useState, useEffect, Component } from "react";
import { View, Text } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { getDashboardData } from "../../data/api";

const Calendar = ({ userId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [customDatesStyles, setCustomDatesStyles] = useState([]);

  useEffect(() => {
    let customDatesStyle = [];

    // console.log('Start Date: ', startDate)
    // console.log('End Date: ', endDate)
    if (startDate !== "") {
      getDashboardData(userId, startDate, endDate).then((result) => {
        // console.log(result.daysResult)

        result.daysResult.map((progressResult) => {
          if (progressResult.logged != null) {
            let date = progressResult.day;
            // console.log(date)

            customDatesStyle.push({
              startDate: date, // Single date since no endDate provided
              dateNameStyle: {
                paddingBottom: 7,
              },
              dateNumberStyle: {
                borderWidth: 3,
                borderColor: "#FBA76E",
                alignItems: "center",
                justifyContent: "center",
                width: 35,
                height: 35,
                borderRadius: 50,
                lineHeight: 30,
              },
              // highlightDateNameStyle: { color: 'pink' },
              highlightDateNumberStyle: {
                borderWidth: 3,
                borderColor: "#FBA76E",
                alignItems: "center",
                justifyContent: "center",
                width: 35,
                height: 35,
                borderRadius: 50,
                lineHeight: 30,
                color: "#FFFFFF",
              },
              // Random color...
              // dateContainerStyle: { backgroundColor: `#${(`#00000${(Math.random() * (1 << 24) | 0).toString(16)}`).slice(-6)}` },
              dateContainerStyle: {
                // borderTopWidth: 1,
                // borderBottomWidth: 1,
                // borderLeftWidth: 1,
                // borderWidth: 1,
              },
            });
          }
        });

        setCustomDatesStyles(customDatesStyle);
      });
    }
  }, [startDate]);

  const formatHeaderString = moment().format("D MMMM YYYY, dddd");

  const onDateSelected = (date) => {
    this.setState({ formattedDate: date.format("YYYY-MM-DD") });
  };

  return (
    <View>
      <CalendarStrip
        // startDate={endDate}
        customDatesStyles={customDatesStyles}
        maxDate={moment().format("YYYY-MM-DD")}
        calendarAnimation={{ type: "parallel", duration: 1000 }}
        style={{ height: 120 }}
        headerText={formatHeaderString}
        calendarHeaderStyle={{ color: "white", fontSize: 16, lineHeight: 19 }}
        dateNumberStyle={{ color: "white", fontSize: 14, fontWeight: "normal" }}
        dateNameStyle={{ color: "white", fontSize: 10 }}
        highlightDateNameStyle={{ color: "white" }}
        onWeekChanged={(start, end) => {
          setStartDate(start.format("YYYY-MM-DD"));
          setEndDate(end.format("YYYY-MM-DD"));
          // console.log(start.format('YYYY-MM-DD'))
          // console.log(end.format('YYYY-MM-DD'))
        }}
        dateNameFormat={moment().format("dd")}
        // scrollable={true}
        // scrollerPaging={true}
        // highlightDateNumberStyle={{ color: "white" }}
        // iconContainer={{ flex: 0.1 }}
        // dateContainerStyle={{ backgroundColor: 'red' }}
        // dayContainerStyle={{ backgroundColor: 'black' }}
        // highlightDateContainerStyle={{ backgroundColor: 'black' }}
        // markedDates={this.state.markedDates}
        // daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
        // onDateSelected={this.onDateSelected}
        // useIsoWeekday={false}
        // calendarColor={'#3343CE'}
      />
      {/* <Text style={{ fontSize: 24 }}>Selected Date: {this.state.formattedDate}</Text> */}
    </View>
  );
};

export default Calendar;
