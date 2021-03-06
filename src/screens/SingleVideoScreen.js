import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";

// component ===============
import SingleVideo from "../components/PlayList/SingleVideo";
import Blogs from "../components/Blog/Blogs";

// Data ====================
import { blogData, playList } from "../demoData";
import {
  getLessonById,
  getBlogsByCategoryIdAndInstructorId,
} from "../data/api";

// Style ====================
import { colors } from "../colors";

const SingleVideoScreen = ({ navigation }) => {
  const data = navigation.getParam("videoData");
  const playList = navigation.getParam("playListData");

  const [playListData, setPlayList] = useState([]);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    setPlayList(playList);

    // get  blogs by categoryId and instructorId
    (async () => {
      const lesson = await getLessonById(data.lessonId);
      const categoryId = lesson[0].categoryId;
      const instructorId = lesson[0].instructorId;
      const relatedBlogs = await getBlogsByCategoryIdAndInstructorId(
        categoryId,
        instructorId
      );
      setBlogs(relatedBlogs);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SingleVideo
          data={data}
          playListData={playListData}
          navigation={navigation}
        />
        {blogs != null ? (
          <Blogs data={blogs[0]} navigation={navigation} />
        ) :
          <View style={styles.noBlogsContainer}>
            <Text style={styles.noBlogsText}>There is no related blogs to this lesson.</Text>
          </View>
        }
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title="Schedule a Session"
          buttonStyle={styles.button}
          titleStyle={{ fontFamily: "GothamRoundedBook_21018" }}
          onPress={() =>
            navigation.navigate("SetSchedule", {
              videoData: data,
              playListData: playList,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#F59C60",
    alignSelf: "center",
    padding: 10,
    borderRadius: 4,
    fontFamily: "GothamRoundedBook_21018",
    fontSize: 20,
    lineHeight: 28
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  noBlogsContainer: {
    margin: 32,
    flex: 1,
    textAlign: "center"
  },
  noBlogsText: {
    textAlign: "center",
    fontFamily: "GothamRoundedBook_21018",
    color: colors.mediumGrey
  },
});

export default SingleVideoScreen;
