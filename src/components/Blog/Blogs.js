import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text, Image } from "react-native-elements";
import { Thumbnail } from "native-base";

import TrainerName from "../Trainer/TrainerName";

const windowWidth = Dimensions.get("window").width;

const Blogs = ({navigation, data }) => {
  return (
    <View style={styles.container}>
      <Text h2 h2Style={{ marginHorizontal: 25 }}>
        {data.blogTitle}
      </Text>
      <View style={styles.blogInfo}>
        <TrainerName data={data} navigation={navigation} />
        <Text>{data.blogPostDate}</Text>
      </View>
      <Image source={{ uri: data.blogImageFile }} containerStyle={styles.blogImg} />
      <Text style={styles.blogContent}>{data.blogContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 80,
  },
  blogInfo: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  trainerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbNail: {
    width: 30,
    height: 30,
  },
  blogImg: {
    width: "100%",
    height: 300,
    marginVertical: 10,
  },
  blogContent: { marginHorizontal: 25, marginVertical: 10 },
});

export default Blogs;
