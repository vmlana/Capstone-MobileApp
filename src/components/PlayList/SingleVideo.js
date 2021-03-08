import React, { useState, useEffect } from "react";
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

import TrainerName from "../Trainer/TrainerName";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleVideo = ({ navigation, data, playListData }) => {
  const onFullscreenUpdate = async ({
    fullscreenUpdate,
  }: VideoFullscreenUpdateEvent) => {
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
        style={{ width: windowWidth, height: 250 }}
        onPlaybackStatusUpdate={(playbackStatus) =>
          playbackStatus.didJustFinish ? console.log("done") : null
        }
      />

      <View style={styles.videoHeader}>
        <Text style={styles.lessonTitle}>{data.lessonName}</Text>
        <TrainerName data={playListData} navigation={navigation} />
      </View>
      <View style={styles.videoInfo}>
        <Text>{playListData.categoryName}</Text>
        <Text>Need to get duration</Text>
      </View>
      <Text style={styles.desc}>{data.lessonDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  videoInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 25,
  },
  lessonTitle: {
    fontSize: 23,
    lineHeight: 28,
    color: '#707070'
  },
  desc: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});

export default SingleVideo;
