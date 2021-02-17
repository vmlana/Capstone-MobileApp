import React from "react";
import { Video } from "expo-av";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleVideo = () => {
  const video =
    "https://pivotcare-s3.s3-us-west-2.amazonaws.com/videos/TutorialOpening1613176335390";

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
          uri: video,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        resizeMode="contain"
        // shouldPlay
        onFullscreenUpdate={onFullscreenUpdate}
        style={{ width: windowWidth, height: 250 }}
        onPlaybackStatusUpdate={(playbackStatus) =>
          playbackStatus.didJustFinish ? console.log("done") : null
        }
      />
    </View>
  );
};

export default SingleVideo;
