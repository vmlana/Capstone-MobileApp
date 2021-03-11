import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const RectangleContainer = ({ navigation, result, type, onPressScroll }) => {
  const [blog, setBlog] = useState();

  console.log("result", result)

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
            <ThumbNail
                source={{ uri: 
                blog.blogThumbImageFile ? blog.blogThumbImageFile : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1994&q=80" }}
            />
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
    color: "white",
    padding: 7,
    fontWeight: "bold"
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
    justifyContent: "space-between"
  },
  date: {
    color: "#444",
    marginRight: 2,
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
