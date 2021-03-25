import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

import {
  Container,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
} from "native-base";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";

import TrainerName from "../Trainer/TrainerName";

import {getBlogs} from '../../data/api';

import {colors} from '../../colors';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const RectangleContainer = ({ navigation, result, type, onPressScroll }) => {
  const [blog, setBlog] = useState();

  // console.log("result", result)

  useEffect(()=>{
    (async()=>{
      const response = await getBlogs(result.blogId);
      // console.log("*********")
      // console.log(response[0])
      setBlog(response[0]);
    })()    
  }, [])

  if(!blog) {
    return(
      <View style={styles.centered}>
          <ActivityIndicator size="small" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Blog", {
                blogData: blog,
              })
            onPressScroll ?
            onPressScroll() :
            null
            }
          }
      >
        <View style={styles.thumbNailContainer}>
            <View>
            <ThumbNail
                source={{ uri: 
                blog.blogThumbImageFile ? blog.blogThumbImageFile : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1994&q=80" }}
            />
            <AnimatedLinearGradient
              colors={["rgba(255,255,255, 0)", "rgba(0,0,0, .5)","rgba(0,0,0, 1)"]}
              style={styles.overlay} />
            </View>
            <Text style={styles.blogTitle}>
            {blog.blogTitle}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.descriptionContainer}>
        <TrainerName data={blog} navigation={navigation} blog={true} />
        <Text style={styles.date}>{blog.blogPostDate}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 260,
    height: 160,
  },
  thumbNailContainer:{
    position: "relative",
  },
  blogTitle:{
    position: "absolute",
    bottom: 0,
    padding: 12,
    fontFamily: "GothamRoundedBold_21016",
    color: colors.white,
    lineHeight: 18
  },
  trainerContainer: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  trainerThumb: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  playListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center"
  },
  date: {
    fontSize: 12,
    fontFamily: "GothamRoundedLight_21020",
    color: colors.darkGrey,
    // marginTop: 4,
    marginRight: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // backgroundColor: 'red',
    opacity: .5,
    marginBottom: 5,
    borderRadius: 6
  }
});

const ThumbNail = styled.Image`
  width: 260px;
  height: 160px;
  border-radius: 6px;
  /* border-top-left-radius: 6px;
  border-top-right-radius: 6px; */
  margin-bottom: 5px;
`;

export default RectangleContainer;
