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
            <Text style={{ fontSize: 12.5, color: '#FFF', fontFamily: 'GothamLight', marginBottom: 7, textAlign: 'center' }}>{weekDayName.charAt(0)}</Text>
            {
                (props.percent > 0 && props.percent) ? (
                    <ProgressCircle
                        percent={props.percent}
                        radius={16}
                        borderWidth={3}
                        shadowColor="#9383B9"
                        color="#FBA76E"
                        bgColor="#7561A4"
                        outerCircleStyle={{
                            alignSelf: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 15, color: '#FFF', fontFamily: 'GothamMedium' }}>{weekDayNumber}</Text>
                    </ProgressCircle>
                )
                    :
                    (
                        <ProgressCircle
                            percent={0}
                            radius={16}
                            borderWidth={0}
                            color="#FBA76E"
                            bgColor="#9383B9"
                            outerCircleStyle={{
                                alignSelf: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 15, color: '#FFF', fontFamily: 'GothamMedium' }}>{weekDayNumber}</Text>
                        </ProgressCircle>
                    )
            }
        </View>


    )
}

export default CustomDayComponent
