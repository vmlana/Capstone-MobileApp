import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Thumbnail } from 'native-base'

const UserInfo = ({ imageFile, userName, department, userId }) => {

    return (
        <View style={styles.userInfoContainer}>
            <View style={styles.userInfoContent}>
                <View style={styles.userInfoView}>
                    <Text style={styles.userNameText}>Hi {userName}</Text>
                    <Text style={styles.extraText}>Check out your progress</Text>
                </View>
                <View>
                    <Thumbnail
                        large
                        source={{
                            uri: imageFile,
                        }}
                        style={styles.thumbNail}
                    />
                </View>

            </View>
            <View style={styles.userInfoContent}>
                <Text style={styles.userDepartment}>Work Type: {department}</Text>
                <Text style={styles.editLink}>Edit Picture</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    userInfoContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        alignItems: 'center',
    },
    userInfoView: {
        maxWidth: '70%',
    },
    userNameText: {
        fontSize: 28,
        lineHeight: 38,
        color: '#FBA76E'
    },
    extraText: {
        color: '#707070',
        fontSize: 17,
        lineHeight: 20
    },
    userDepartment: {
        fontSize: 17,
        lineHeight: 20,
        color: '#707070',
        maxWidth: '70%',
    },
    editLink: {
        fontSize: 9,
        lineHeight: 11,
        color: '#707070',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#707070"
    }
})


export default UserInfo
