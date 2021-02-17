import React from "react";
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

const SingleVideo = ({ data }) => {
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
          uri: data.video,
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
        <Text h3>{data.videoTitle}</Text>
        <TrainerName data={data} />
      </View>
      <View style={styles.videoInfo}>
        <Text>{data.category}</Text>
        <Text>{data.duration}</Text>
      </View>
      <Text style={styles.desc}>{data.desc}</Text>
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
  desc: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});

export default SingleVideo;
