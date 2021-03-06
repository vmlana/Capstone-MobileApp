import React, { useState, useEffect, Component } from "react";
import { View, Text } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { getDashboardData } from "../../data/api";
import CustomDayComponent from './CustomDayComponent';
import { Image } from "native-base";

const Calendar = ({ userId }) => {

	const [startDate, setStartDate] = useState('2021-02-15')
	// const [endDate, setEndDate] = useState(moment().subtract(7, "days").format('YYYY-MM-DD'))
	const [customDatesStyles, setCustomDatesStyles] = useState([])
	const [progressData, setProgressData] = useState([])

	const getPercet = (dateFilter, data) => {
		// console.log('progressData', data);

		let percent = 0
		let matchedDate = {}
		if (data.length > 0) {
			matchedDate = data.find(mDate => (
				mDate.day == dateFilter
			))

			if (matchedDate.percent != null) {
				percent = matchedDate.percent
			}

			// console.log(matchedDate);

		}
		// return percent
		return percent
	}


	useEffect(() => {

		// console.log('Start Date: ', startDate)
		// console.log('End Date: ', endDate)
		if (startDate !== '') {
			getDashboardData(userId, startDate).then((result) => {
				// console.log(result.daysResult)

				setProgressData(result.daysResult);

			});
		}

	}, [startDate]);

	useEffect(() => {
		// console.log('UseEffect: ', progressData)

	}, [progressData]);


	const formatHeaderString = moment().format('D MMMM YYYY, dddd')

	const onDateSelected = date => {
		this.setState({ formattedDate: date.format('YYYY-MM-DD') });
	}

	return (
		<View>
			<CalendarStrip
				startDate={startDate}
				customDatesStyles={customDatesStyles}
				maxDate={moment().format('YYYY-MM-DD')}
				calendarAnimation={{ type: 'parallel', duration: 1000 }}
				style={{ height: 120 }}
				headerText={formatHeaderString}
				calendarHeaderStyle={{ color: '#FFFFFF', fontSize: 16, lineHeight: 22, fontFamily: 'GothamMedium' }}
				// dateNumberStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'normal', fontFamily: 'GothamMedium' }}
				// dateNameStyle={{ color: '#FFFFFF', fontSize: 8, fontFamily: 'GothamLight' }}

				// onWeekChanged={(start, end) => {
				// 	setStartDate(start.format('YYYY-MM-DD'))
				// 	setEndDate(end.format('YYYY-MM-DD'))
				// }}
				dateNameFormat={moment().format('dd')}

				dayComponent={({ date }) => {
					let formattedDt = date.format('YYYY-MM-DD');
					let percentProgress = getPercet(formattedDt, progressData)
					return (<CustomDayComponent userId={userId} date={formattedDt} percent={percentProgress} />);
				}}
				highlightDateNameStyle={{ color: '#FFFFFF' }}
				highlightDateNumberStyle={{ color: 'white' }}
				iconLeft={require("../../../assets/icon-prev.png")}
				iconRight={require("../../../assets/icon-next.png")}
				iconLeftStyle={{
					marginRight: 5
				}}
				iconRightStyle={{
					marginLeft: 5
				}}
			/>

		</View>
	);
}

export default Calendar


