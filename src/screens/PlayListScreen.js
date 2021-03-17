import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { getPlaylistByPlaylistId } from "../data/api";

const PlayListScreen = ({ navigation, playlistId }) => {
  // data and playList contain info of single videos and playlist respectively passed to the parameter from the ContentContainer component.
  // data conatins the info about playlists.lessons
  const data = navigation.getParam("singleVideoData");
  // playList conatins the info about playlists
  const playList = navigation.getParam("playListData");
  const [singleVideos, setSingleVideos] = useState([]);
  const [playListData, setPlayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSingleVideos(data);
    setPlayList(playList);
    // console.log(1)
    // console.log(playList);
    if (playList && !data) {
      console.log(2);
      (async () => {
        setIsLoading(true);
        const playlistData = await getPlaylistByPlaylistId(playList.playlistId);
        setIsLoading(false);
        // console.log(3)
        // console.log(playlistData);
        // console.log(playlistData[0].lessons);
        setSingleVideos(playlistData[0].lessons);
      })();
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data && !playList) {
    return (
      <View style={styles.centered}>
        <Text>No lessons found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* {singleVideos
        ? singleVideos.map((singleVideo, index) => (
            <View key={index}>
              <Text>{singleVideo.lessonName}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleVideo", {
                    //   passing the parameter to the single video screen
                    videoData: singleVideo,
                    playListData,
                  })
                }
              >
                <Text>{singleVideo.lessonDescription}</Text>
              </TouchableOpacity>
            </View>
          ))
        : null} */}
      <FlatList
        style={styles.flatList}
        data={singleVideos}
        keyExtractor={(item) => item.lessonId.toString()}
        renderItem={({ item, index }) => {
          return (
            <View>
              {index % 2 === 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleVideo", {
                      //   passing the parameter to the single video screen
                      videoData: item,
                      playListData,
                      lessonName: item.lessonName,
                    })
                  }
                  style={styles.lessonContainer}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.imageFile }}
                    // source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/" + item.imageFile }}
                  />
                  <View style={styles.nameAndDesView}>
                    <Text style={styles.lessonName}>{item.lessonName}</Text>
                    <View>
                      <Text style={styles.lessonDescription}>
                        {item.lessonDescription}
                      </Text>
                    </View>
                    {item.videoDuration ? (
                      <Text style={styles.duration}>{item.videoDuration} min</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleVideo", {
                      //   passing the parameter to the single video screen
                      videoData: item,
                      playListData,
                      lessonName: item.lessonName,
                    })
                  }
                  style={styles.lessonContainer}
                >
                  <View style={styles.nameAndDesViewLeft}>
                    <Text style={styles.lessonName}>{item.lessonName}</Text>
                    <View>
                      <Text style={styles.lessonDescription}>
                        {item.lessonDescription}
                      </Text>
                    </View>
                    {item.videoDuration ? (
                      <Text style={styles.duration}>{item.videoDuration} min</Text>
                    ) : null}
                  </View>
                  <Image
                    style={styles.image}
                    source={{ uri: item.imageFile }}
                    // source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/" + item.imageFile }}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    padding: 25,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonContainer: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  image: {
    width: 135,
    height: 142,
    borderRadius: 5,
  },
  nameAndDesView: {
    paddingTop: 26,
    paddingLeft: 26,
    paddingBottom: 26,
    flex: 1,
    flexDirection: "column",
  },
  nameAndDesViewLeft: {
    paddingTop: 26,
    paddingRight: 26,
    paddingBottom: 26,
    flex: 1,
    flexDirection: "column",
  },
  lessonName: {
    fontSize: 19,
    marginBottom: 11,
    color: "#707070",
    lineHeight: 23,
  },
  lessonDescription: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "300",
    marginBottom: 11,
    color: "#707070",
  },
  duration: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: "300",
    color: "#707070",
  },
});

export default PlayListScreen;
