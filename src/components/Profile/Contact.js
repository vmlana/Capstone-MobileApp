import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'

import { colors } from '../../colors';

const Contact = ({ signout }) => {
    return (
        <View style={styles.contactContainer}>
            <View>
                <Text style={{ ...styles.titleText, fontFamily: "GothamRoundedBold_21016", color: colors.darkGrey }}>Contact Us</Text>
                <Text style={{ ...styles.contactText, color: "#707070", fontFamily: 'GothamLight', fontSize: 15, lineHeight: 20 }}>For any queries, you can contact us directly on:</Text>
                <Text style={{ ...styles.userEmail, fontFamily: "GothamRoundedBold_21016", color: colors.darkGrey }}>support@pivotcare.ca</Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 5, justifyContent: "space-between" }}>
                <TouchableOpacity
                    onPress={() => {
                        signout();
                    }}
                >
                    <Text style={{ ...styles.signOutLink, fontFamily: "GothamRoundedBook_21018", fontSize: 15 }}>Log Out</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.signOutLink, marginRight: 12, fontFamily: "GothamRoundedBook_21018", fontSize: 15 }}>Terms & Conditions</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
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
        color: '#707070'
    },
    signOutLink: {
        marginBottom: 10,
        color: "#fff",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#fff",
    },
})


export default Contact
