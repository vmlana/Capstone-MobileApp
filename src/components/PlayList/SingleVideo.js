import React from "react";
import { Video } from "expo-av";
import { View, Text, TouchableHighlight, Dimensions } from "react-native";

let video =
  "https://static.videezy.com/system/resources/previews/000/034/463/original/C0002_6_copy.mp4";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleVideo = () => {
  return (
    <View>
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        resizeMode="stretch"
        shouldPlay
        isLooping
        style={{ width: windowWidth, height: 250 }}
        onPlaybackStatusUpdate={(playbackStatus) =>
          playbackStatus.didJustFinish ? console.log("done") : null
        }
      />
    </View>
  );
};

export default SingleVideo;
