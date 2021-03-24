import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Thumbnail } from "native-base";

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
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  userInfoContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    alignItems: "center",
  },
  userInfoView: {
    maxWidth: "70%",
  },
  userNameText: {
    fontSize: 28,
    lineHeight: 38,
    color: "#FBA76E",
    fontFamily: "GothamRoundedBold_21016",
  },
  extraText: {
    color: "#707070",
    fontSize: 17,
    lineHeight: 23,
    fontFamily: "GothamLight",
  },
  userDepartment: {
    fontSize: 17,
    lineHeight: 23,
    color: "#707070",
    maxWidth: "70%",
    fontFamily: "GothamMedium",
  },
  editLink: {
    fontSize: 12,
    lineHeight: 13,
    color: "#707070",
    fontFamily: "GothamMedium",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#707070",
    maxWidth: "70%",
  },
});

export default UserInfo;
