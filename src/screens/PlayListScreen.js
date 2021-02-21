import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

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

  if (playListData.length === 0) {
    return (
        <View style={styles.centered}>
            <Text>No lessons found.</Text>
        </View>
    );
  }

  return (
    <View
      style={styles.container}
    >
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
          data={playListData.lessons}
          keyExtractor={(item)=> item.lessonId.toString()}
          renderItem={({item, index}) => {
            return (
            <View>
              {
                index % 2 === 0
                ?
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleVideo", {
                      //   passing the parameter to the single video screen
                      videoData: item,
                      playListData,
                    })
                  }
                  style={styles.lessonContainer}
                >
                  <Image
                    style={styles.image}
                    // source={{ uri: item.imageFile }}
                    source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/" + item.imageFile }}
                  />
                  <View style={styles.nameAndDesView}>
                    <Text 
                      style={styles.lessonName}
                    >
                      {item.lessonName}
                    </Text>
                    <View>
                      <Text 
                        style={styles.lessonDescription}
                      >
                        {item.lessonDescription}
                      </Text>
                    </View>
                    <Text style={styles.duration}>Duration: 20 mins</Text>
                  </View>
                </TouchableOpacity>
              :
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleVideo", {
                      //   passing the parameter to the single video screen
                      videoData: item,
                      playListData,
                    })
                  }
                  style={styles.lessonContainer}
                >
                  <View style={styles.nameAndDesViewLeft}>
                    <Text 
                      style={styles.lessonName}
                    >
                      {item.lessonName}
                    </Text>
                    <View>
                      <Text 
                        style={styles.lessonDescription}
                      >
                        {item.lessonDescription}
                      </Text>
                    </View>
                    <Text style={styles.duration}>Duration: 20 mins</Text>
                  </View>
                  <Image
                    style={styles.image}
                    // source={{ uri: item.imageFile }}
                    source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/" + item.imageFile }}
                  />
                </TouchableOpacity>
              }
            </View>
            )}
          }
        />
    </View>
  );
};

PlayListScreen.navigationOptions = (navData) => {
  const playList = navData.navigation.getParam("playListData");
  return {
      headerTitle: playList.playlistName,
  };
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 33,
  },
  centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  lessonContainer: {
    flexDirection:'row',
    marginBottom: 23
  },
  image: {
    width: 135,
    height: 142,
    borderRadius: 5
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
    color: "#707070"
  },
  lessonDescription: {
    fontSize: 13,
    fontWeight: "300",
    marginBottom: 11,
    color: "#707070"
  },
  duration: {
    fontSize: 13,
    fontWeight: "300",
    color: "#707070"
  }
});

export default PlayListScreen;
