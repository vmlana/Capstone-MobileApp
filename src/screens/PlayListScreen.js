import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const PlayListScreen = ({ navigation }) => {
  // data and playList contain info of single videos and playlist respectively passed to the parameter from the ContentContainer component.
  // data conatins the info about playlists.lessons
  const data = navigation.getParam("singleVideoData");
  // playList conatins the info about playlists
  const playList = navigation.getParam("playListData");

  const [singleVideos, setSingleVideos] = useState([]);
  const [playListData, setPlayList] = useState([]);

  useEffect(() => {
    setSingleVideos(data);
    setPlayList(playList);
  }, []);

  return (
    <View>
      {singleVideos
        ? singleVideos.map((singleVideo, index) => (
            <View key={index}>
              <Text>{singleVideo.lessonName}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleVideo", {
                    //   passing the parameter to the single video screen
                    videoData: data,
                    playListData,
                  })
                }
              >
                <Text>{singleVideo.lessonDescription}</Text>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </View>
  );
};

export default PlayListScreen;
