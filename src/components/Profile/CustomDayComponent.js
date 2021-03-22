import React from 'react'
import { Text, View } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import moment from 'moment';
import { getDashboardData } from "../../data/api";


const CustomDayComponent = (props) => {

    var weekDayName = moment(props.date).format('ddd');
    var weekDayNumber = moment(props.date).format('D');
    // console.log(weekDayNumber);
    // console.log(props)

    return (
        <View>
            {/* <Text>{weekDayName}</Text> */}
            {
                (props.percent > 0) ? (
                    <ProgressCircle
                        percent={props.percent}
                        radius={18}
                        borderWidth={3}
                        shadowColor="#9383B9"
                        color="#FBA76E"
                        bgColor="#7561A4"
                    >
                        <Text style={{ fontSize: 10, color: '#FFF' }}>{weekDayName}</Text>
                        <Text style={{ fontSize: 10, color: '#FFF' }}>{weekDayNumber}</Text>
                    </ProgressCircle>
                )
                    :
                    (
                        <ProgressCircle
                            percent={0}
                            radius={17}
                            borderWidth={0}
                            color="#FBA76E"
                            bgColor="#9383B9"
                        >
                            <Text style={{ fontSize: 10, color: '#FFF' }}>{weekDayName}</Text>
                            <Text style={{ fontSize: 10, color: '#FFF' }}>{weekDayNumber}</Text>
                        </ProgressCircle>
                    )
            }
        </View>


    )
}

export default CustomDayComponent
