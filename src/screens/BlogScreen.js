import React, {useRef} from "react";
import SearchIcon from "../components/Search/SearchIcon";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
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
import AutoHeightImage from 'react-native-auto-height-image';
import TrainerName from "../components/Trainer/TrainerName";
import RectangleListContainer from "../components/Search/RectangleListContainer";
import { light } from "@material-ui/core/styles/createPalette";

import {colors} from '../colors';

const BlogScreen = ({ navigation }) => {
  const blogData = navigation.getParam("blogData");
  const win = Dimensions.get('window');
  const scrollRef = useRef(); 

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <Content>

        <View style={styles.header}>
          <Text style={styles.blogTitle}>{blogData.blogTitle}</Text>
          <View style={styles.headerInfo}>
            <TrainerName
              data={blogData}
              navigation={navigation} />
            <Text style={styles.date}>{blogData.blogPostDate}</Text>
          </View>
        </View>
        <AutoHeightImage
          width={win.width}
          source={{uri: blogData.blogImageFile}}
          // style={styles.image}
         />
        <View style={styles.article}>
          <Text style={styles.contents}>{blogData.blogContent}</Text>
        </View>
        {
          blogData.tags ?
          <View style={styles.tags}>{
          blogData.tags.map((item, index)=> {
            let tagName = item.tagName;
            index !== 0 ? tagName = " / " + tagName : null;
            return (
            <Text style={styles.tag}>
              {tagName}
            </Text>)
          }
          )}
          </View>
          : null 
        }
        {/* Similar blog posts **********************/}
        {
          blogData.relatedBlogs ?

          blogData.relatedBlogs.length !== 0?
          <View style={styles.relatedBlogs}>
            <RectangleListContainer
              title="Similar Blog Posts"
              dataList={blogData.relatedBlogs}
              navigation={navigation}
              onPressScroll={() => { scrollRef.current?.scrollTo({
              y: 0,
              animated: false,
          }); }}
            />
          </View>
          : null

          : null
        }
      </Content>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      // padding: 33,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 30,
    paddingRight: 30,
  },
  // centered: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  // },
  blogTitle: {
    fontFamily: "GothamRoundedBold_21016",
    color: colors.darkGrey,
    // marginHorizontal: 25,
    fontSize: 28,
    letterSpacing: 1,
    marginBottom: 18
  },
  headerInfo: {
    flexDirection:'row',
    // marginBottom: 23,
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  date: {
    fontFamily: "GothamRoundedLight_21020",
    color: colors.darkGrey,
    fontSize: 12
  },
  article: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  contents: {
    lineHeight: 22,
    letterSpacing: .2,
    fontFamily: "GothamRoundedBook_21018",
    color: colors.darkGrey,
  },
  tags: {
    marginTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection:'row',
    marginBottom: 32
  },
  tag: {
    fontFamily: "GothamRoundedBook_21018",
    color: colors.mediumGrey,
  },
  relatedBlogs: {
    paddingLeft: 30,
    marginBottom: 60
  }
})

export default BlogScreen;
