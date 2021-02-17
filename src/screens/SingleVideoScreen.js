import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";

// component ===============
import SingleVideo from "../components/PlayList/SingleVideo";
import Blogs from "../components/Blog/Blogs";

// Data ====================
import { blogData } from "../demoData";

const SingleVideoScreen = ({ navigation }) => {
  const data = navigation.getParam("data");
  return (
    <View style={styles.container}>
      <ScrollView>
        <SingleVideo data={data} />
        <Blogs data={blogData} />
      </ScrollView>
      <View style={styles.bottom}>
        <Button
          title="Schedule a Session"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("SetSchedule")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "orange",
    color: "white",
    alignSelf: "center",
    padding: 10,
    borderRadius: 4,
  },
  bottom: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
});

export default SingleVideoScreen;
