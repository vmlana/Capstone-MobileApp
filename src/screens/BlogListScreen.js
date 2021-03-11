import React, {useState, useEffect} from "react";
import SearchIcon from "../components/Search/SearchIcon";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from "native-base";

import RectangleListContainer from "../components/Search/RectangleListContainer";

import { getBlogs } from '../data/api';

const BlogListScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState({
    everydayReads: [],
    aboutSomething: []
  })

  useEffect(()=>{
    (async()=>{
      const blogs = await getBlogs();
      setBlogs(prev=>({
        ...prev,
        everydayReads: blogs
      }))
    })()
  }, [])

  return (
    <Container style={styles.container}>
      <Content>
        {/* Everyday Reads **********************/}
        {
          blogs.everydayReads.length !== 0?
          <RectangleListContainer
            title="Everyday Reads"
            dataList={blogs.everydayReads}
            navigation={navigation}
          /> : null
        }
        {/* Everyday Reads **********************/}
        {
          blogs.everydayReads.length !== 0?
          <RectangleListContainer
            title="About body stiffness"
            dataList={blogs.everydayReads}
            navigation={navigation}
          /> : null
        }
        {/* <Text onPress={()=>navigation.navigate("Blog")}>Blog List</Text> */}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: 30,
    paddingLeft: 30,
  },
})

export default BlogListScreen;
