import React, { useContext, useState, useEffect } from "react";
import { Video } from "expo-av";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text, Image } from "react-native-elements";
import { Thumbnail } from "native-base";
import * as ScreenOrientation from "expo-screen-orientation";
import { colors } from "../../colors";

import TrainerName from "../Trainer/TrainerName";

import { setActivityLog } from "../../data/api";
import { Context as AuthContext } from "../../context/AuthContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleVideo = ({ navigation, data, playListData }) => {
  const { state } = useContext(AuthContext);

  const onFullscreenUpdate = async (
    { fullscreenUpdate },
    VideoFullscreenUpdateEvent
  ) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        await ScreenOrientation.unlockAsync(); // only on Android required
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        ); // only on Android required
        break;
    }
  };
  return (
    <View>
      <Video
        source={{
          uri: data.videoFile,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        resizeMode="contain"
        onFullscreenUpdate={onFullscreenUpdate}
        style={{ width: windowWidth, height: 235 }}
        onPlaybackStatusUpdate={(playbackStatus) => {
          if (playbackStatus.didJustFinish) {
            const log = setActivityLog(
              state.userInfo.authId,
              null,
              playListData.playlistId,
              data.lessonId
            );
          }
        }}
      />

      <View style={styles.videoHeader}>
        <Text
          style={{
            ...styles.lessonTitle,
            fontFamily: "GothamRoundedMedium_21022",
            color: colors.darkGrey,
          }}
        >
          {data.lessonName}
        </Text>
        <TrainerName data={playListData} navigation={navigation} />
      </View>

      <View style={styles.videoInfo}>
        <Text
          style={{
            fontFamily: "GothamRoundedBook_21018",
            color: colors.darkGrey,
          }}
        >
          {playListData.categoryName}
        </Text>
        <Text
          style={{
            fontFamily: "GothamRoundedBook_21018",
            color: colors.darkGrey,
          }}
        >
          {data.videoDuration} mins
        </Text>
      </View>
      <Text
        style={{
          ...styles.desc,
          fontFamily: "GothamRoundedBook_21018",
          color: colors.darkGrey,
        }}
      >
        {data.lessonDescription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  videoHeader: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10,
  },
  videoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 25,
    alignItems: "center",
  },
  lessonTitle: {
    fontSize: 23,
    lineHeight: 28,
    marginBottom: 10,
    // color: "#707070",
  },
  desc: {
    marginHorizontal: 25,
    marginVertical: 10,
    lineHeight: 18,
  },
});

export default SingleVideo;
