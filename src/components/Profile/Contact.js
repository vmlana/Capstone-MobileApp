import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

import {colors} from '../../colors';

const Contact = ({signout}) => {
    return (
        <View style={styles.contactContainer}>
            <View>
                <Text style={{...styles.titleText, fontFamily: "GothamRoundedBold_21016", color: colors.darkGrey }}>Contact Us</Text>
                <Text style={{...styles.contactText, fontFamily: "GothamRoundedLight_21020", color: colors.darkGrey}}>For any queries, you can contact the instructors directly on</Text>
                <Text style={{...styles.userEmail, fontFamily: "GothamRoundedBold_21016", color: colors.darkGrey}}>contactinstructors@appname.com</Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 5, justifyContent: "space-between"}}>
                <TouchableOpacity
                    onPress={() => {
                        signout();
                    }}
                    >
                    <Text style={{...styles.signOutLink, fontFamily: "GothamRoundedBook_21018"}}>Log Out</Text>
                </TouchableOpacity>
                <Text style={{...styles.signOutLink, marginRight: 12, fontFamily: "GothamRoundedBook_21018"}}>Terms & Conditions</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        marginVertical: 15,
        height: 500,
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 25,
        paddingRight: 25,
    },
    titleText: {
        fontSize: 26,
        lineHeight: 31,
        color: '#707070',
        marginBottom: 15
    },
    contactText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#707070',
        marginBottom: 15
    },
    userEmail: {
        fontSize: 15,
        lineHeight: 20,
        color: '#707070',
        fontWeight: 'bold'
    },
    signOutLink: {
        // marginBottom: 30,
        color: "#fff",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#fff",
      },
    })


export default Contact
