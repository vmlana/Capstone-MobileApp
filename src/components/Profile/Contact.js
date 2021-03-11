import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Contact = () => {
    return (
        <View style={styles.contactContainer}>
            <Text style={styles.titleText}>Contact Us</Text>
            <Text style={styles.contactText}>For any queries, you can contact the instructors directly on</Text>
            <Text style={styles.userEmail}>contactinstructors@appname.com</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        marginVertical: 15
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
    }
})


export default Contact
