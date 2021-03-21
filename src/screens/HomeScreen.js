import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
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

import { View, StyleSheet, ScrollView } from "react-native";

import {
  categoryPlayList as catPlays,
  recentlyAddedPlayList as recAddPlays,
  playList,
} from "../demoData";

import {
  getPrograms,
  getPlayLists,
  getCategories,
  getSurveyData,
  getUserData,
} from "../data/api";

// components ===============
import Update from "../components/Home/Update";
import SearchIcon from "../components/Search/SearchIcon";
import ContentListContainer from "../components/Home/ContentListContainer";
import SurveyNotification from "../components/Home/SurveyNotification";

import { Context as AuthContext } from "../context/AuthContext";

const programId = 101;

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [playLists, setPlayLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [showSurvey, setShowSurvey] = useState(true);
  const { state } = useContext(AuthContext);

  const surveySwitch = () => {
    setShowSurvey(!showSurvey);
  };

  useEffect(() => {
    const getProgramArr = async () => {
      const programArr = await getPrograms();
      const filteredProgramList = await programArr.filter(
        (program) => program.programId === programId
      );
      setPrograms(filteredProgramList);
    };

    const getPlayListArr = async () => {
      const playListArr = await getPlayLists();
      setPlayLists(playListArr);
    };

    const getCategoriesArr = async () => {
      const categoriesArr = await getCategories();
      setCategories(categoriesArr);
    };

    const getSurveyArr = async () => {
      const surveyData = await getSurveyData(1);
      setSurvey(surveyData);
    };

    const getUserDataArr = async () => {
      const userData = await getUserData(state.userInfo.authId);
      // console.log(userData);
      setUserInfo(userData);
    };

    getProgramArr();
    getPlayListArr();
    getCategoriesArr();
    getSurveyArr();
    getUserDataArr();
  }, [state]);

  useEffect(() => { }, []);

  if (state.userInfo) {
    // console.log("Home_authId:", state.userInfo);
  }

  // console.log("userData", userInfo);

  //   console.log(userInfo.surveys[0].surveyId);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {userInfo.weekWorkout > 0 ? (
          <Update weekWorkout={userInfo.weekWorkout} />
        ) : null}

        <View style={styles.container}>
          <ContentListContainer
            title={"Select Your workout type"}
            dataList={categories}
            type={"cat"}
            navigation={navigation}
          />
          <ContentListContainer
            title={"Recently Added"}
            dataList={playLists}
            type={"playlists"}
            navigation={navigation}
          />
          {playLists.length !== 0 ? (
            <ContentListContainer
              title={"Most Viewed / Hit List"}
              dataList={playLists}
              sizeBig={false}
              type={"playlists"}
              navigation={navigation}
            />
          ) : null}
          {programs.length !== 0 ? (
            <ContentListContainer
              title={"Workout Playlists"}
              dataList={programs}
              type={"programs"}
              navigation={navigation}
            />
          ) : null}
        </View>
      </ScrollView>

      {userInfo && showSurvey ? (
        userInfo.surveys ? (
          <View style={styles.bottom}>
            <SurveyNotification
              navigation={navigation}
              close={surveySwitch}
              data={userInfo.surveys[0].surveyId}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginTop: 25,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
