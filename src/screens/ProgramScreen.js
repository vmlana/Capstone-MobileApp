import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator } from "react-native";

import { getProgramByProgramId } from '../data/api';

const ProgramScreen = ({ navigation }) => {
  const program = navigation.getParam("program");

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    (async () => {
      setIsLoading(true);
      const programPlayLists = await getProgramByProgramId(program.programId);
      setIsLoading(false);

      // console.log("**************");
      // console.log(programPlayLists);
      // console.log(programPlayLists[0].playlists);
      setPlaylists(programPlayLists[0].playlists);
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
          <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!playlists) {
    return (
        <View style={styles.centered}>
            <Text>No playlists found.</Text>
        </View>
    );
  }

  return (
    <View
      style={styles.container}
    >
        <FlatList
          style={styles.flatList}
          data={playlists}
          keyExtractor={(item)=> item.playlistId.toString()}
          renderItem={({item, index}) => {
            return (
            <View>
              {
                index % 2 === 0
                ?
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      singleVideoData: item.lessons,
                      playListData: item,
                    })
                  }
                  style={styles.playlistContainer}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.imageFile ? item.imageFile : "https://pivotcare-s3.s3-us-west-2.amazonaws.com/stretch.jpg" }}
                    // source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/stretch.jpg" }}
                  />
                  <View style={styles.nameAndDesView}>
                    <Text 
                      style={styles.playlistName}
                    >
                      {item.playlistName}
                    </Text>
                    <Text style={styles.instructorName}>{item.instructorName}</Text>
                    <View>
                      <Text 
                        style={styles.playlistDescription}
                      >
                        {item.playlistDescription}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              :
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PlayList", {
                      singleVideoData: item.lessons,
                      playListData: item,
                    })
                  }
                  style={styles.playlistContainer}
                >
                  <View style={styles.nameAndDesViewLeft}>
                    <Text 
                      style={styles.playlistName}
                    >
                      {item.playlistName}
                    </Text>
                    <Text style={styles.instructorName}>{item.instructorName}</Text>
                    <View>
                      <Text 
                        style={styles.playlistDescription}
                      >
                        {item.playlistDescription}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={styles.image}
                    // source={{ uri: item.imageFile }}
                    source={{ uri: "https://pivotcare-s3.s3-us-west-2.amazonaws.com/stretch.jpg" }}
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

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // padding: 33,
  },
  flatList: {
    padding: 33,
  },
  centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  playlistContainer: {
    flexDirection:'row',
    marginBottom: 23,
    alignItems: "center"
  },
  image: {
    width: 135,
    height: 142,
    borderRadius: 5
  },
  nameAndDesView: {
    paddingTop: 13,
    paddingLeft: 26,
    paddingBottom: 26,
    flex: 1,
    flexDirection: "column",
  },
  nameAndDesViewLeft: {
    paddingTop: 13,
    paddingRight: 26,
    paddingBottom: 26,
    flex: 1,
    flexDirection: "column",
  },
  playlistName: {
    fontSize: 19,
    marginBottom: 6,
    color: "#707070"
  },
  playlistDescription: {
    fontSize: 13,
    fontWeight: "300",
    marginBottom: 11,
    color: "#707070"
  },
  instructorName: {
    fontSize: 13,
    fontWeight: "300",
    color: "#707070",
    marginBottom: 6,
  }
});

export default ProgramScreen;
