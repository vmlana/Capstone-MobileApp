import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from "react-native";
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

import SearchIcon from "../components/Search/SearchIcon";
import Calendar from "../components/Profile/Calendar";
import { getUserDashboard } from "../data/api";

import { Context as AuthContext } from "../context/AuthContext";
import UserInfo from "../components/Profile/UserInfo";
import Reminder from "../components/Profile/Reminder";
import Contact from "../components/Profile/Contact";

import bkgMobileProfile from "../../assets/bkgMobileProfile.png";

const ProfileScreen = ({ navigation }) => {
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useContext(AuthContext);
  if (state.userInfo) {
    // console.log("Home_authId:", state.userInfo.authId);
  }

  const { signout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const dashboardData = await getUserDashboard(state.userInfo.authId);
      setIsLoading(false);
      // console.log('Dashboard: ', dashboardData);
      setDashboard(dashboardData);
    })();
  }, []);

  return (
    <Container>
      <Content style={styles.container}>
        <View style={styles.subContainer}>
          <UserInfo
            imageFile={dashboard.imageFile}
            userName={dashboard.userName}
            department={dashboard.department}
            userId={dashboard.userId}
          />
          <View style={styles.workoutProgress}>
            <Calendar userId={state.userInfo.authId} />
            {dashboard.workInDay != null || dashboard.workInDay > 0 ? (
              <View style={styles.progressCheckContainer}>
                <Text style={styles.progressGreet}>Congratulations!</Text>
                <Text style={styles.completedClasses}>
                  You completed {dashboard.workInDay} classes today!
                </Text>
              </View>
            ) : (
              <View style={styles.progressCheckContainer}>
                <Text style={styles.progressMessage}>Start workout!</Text>
                <Text style={styles.completedClasses}>
                  You completed {0} classes today!
                </Text>
              </View>
            )}

            <View style={styles.levelStreak}>
              <Text style={styles.userLevel}>Mid-level</Text>
              <View style={styles.streakContainer}>
                <Text style={styles.userStreak}>Streak Day</Text>
                <Text style={styles.userStreakDays}>{dashboard.streakDay}</Text>
              </View>
            </View>
          </View>
          <Reminder navigation={navigation} />
        </View>
        <ImageBackground
          source={bkgMobileProfile}
          style={{
            width: "100%",
            // height: "100%",

          }}
          imageStyle={{
            resizeMode: "stretch",
          }}
        >
          <Contact
            signout={() => {
              signout(navigation);
              // navigation.navigate("Signin");
            }}
          />
        </ImageBackground>
        {/* <TouchableOpacity
          onPress={() => {
            signout();
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.signOutLink}>Sign Out</Text>
        </TouchableOpacity> */}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 25,
  },
  subContainer: {
    padding: 25,
  },
  workoutProgress: {
    backgroundColor: "#7561A4",
    borderRadius: 5,
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 23,
  },
  progressCheckContainer: {
    marginVertical: 20
  },
  progressMessage: {
    fontFamily: 'GothamRoundedBold_21016',
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 20,
    maxWidth: 200,
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#9383B9",
    borderRadius: 7,
  },
  progressGreet: {
    fontFamily: "GothamRoundedBold_21016",
    color: "#FFFFFF",
    fontSize: 17,
    lineHeight: 20,
    maxWidth: 200,
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#9383B9",
    borderRadius: 7,
  },
  completedClasses: {
    fontFamily: 'GothamLight',
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 15,
  },
  levelStreak: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userLevel: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "GothamRoundedBold_21016",
  },
  streakContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userStreak: {
    fontSize: 15,
    lineHeight: 20,
    color: "#FFFFFF",
    fontFamily: "GothamBook",
  },
  userStreakDays: {
    marginLeft: 15,
    fontSize: 43,
    lineHeight: 52,
    color: "#FBA76E",
    fontFamily: "GothamRoundedBold_21016",
  },
});

export default ProfileScreen;
