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

import { colors } from "../../colors";

const windowWidth = Dimensions.get("window").width;

const Blogs = ({navigation, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.blogTitle}>
        {data.blogTitle}
      </Text>
      <View style={styles.blogInfo}>
        <TrainerName data={data} navigation={navigation} />
        <Text style={styles.blogDate}>{data.blogPostDate}</Text>
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
  blogTitle: {
    fontFamily: "GothamRoundedBold_21016",
    color: colors.darkGrey,
    marginHorizontal: 25,
    fontSize: 28
  },
  blogInfo: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  blogDate: {
    fontFamily: "GothamRoundedLight_21020",
    color: colors.darkGrey,
    fontSize: 12
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
  blogContent: {
    marginHorizontal: 25,
    marginVertical: 10,
    fontFamily: "GothamRoundedBook_21018",
    color: colors.darkGrey,
    lineHeight: 18,
    letterSpacing: .2,
  },
});

export default Blogs;
