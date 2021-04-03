import React, {useState, useEffect, useContext} from "react";
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
import { Context as AuthContext } from "../context/AuthContext";

import { getBlogs, getBlogsByCategoryIdAndInstructorId } from '../data/api';

const BlogListScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState({
    everydayReads: [],
    mayLike: []
  })
  const { state } = useContext(AuthContext);

  // console.log("***************")
  // console.log(state.userInfo.authId)

  useEffect(()=>{
    (async()=>{
      const everydayReads = await getBlogs(null, null);
      const mayLike = await getBlogs( null, state.userInfo.authId);
      // const mayLike = await getBlogs( null, 60);

      // console.log(mayLike)

      setBlogs(prev=>({
        ...prev,
        everydayReads: everydayReads,
        mayLike: mayLike
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
          blogs.mayLike != null?
          <RectangleListContainer
            // title="About body stiffness"
            title="You May Like"
            dataList={blogs.mayLike}
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
