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


const BlogScreen = ({ navigation }) => {
  const blogData = navigation.getParam("blogData");
  const win = Dimensions.get('window');
  const scrollRef = useRef(); 

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <Content>
        <Text>{blogData.blogTitle}</Text>
        <TrainerName data={blogData} />
        <Text>{blogData.blogPostDate}</Text>
        <AutoHeightImage
          width={win.width}
          source={{uri: blogData.blogImageFile}}
          // style={styles.image}
         />
        <Text>{blogData.blogContent}</Text>
        {
          blogData.tags ?
          blogData.tags.map((item)=>
            <Text>{item.tagName}</Text>
          )
          : null 
        }
        {/* Similar blog posts **********************/}
        {
          blogData.relatedBlogs ?

          blogData.relatedBlogs.length !== 0?
          <RectangleListContainer
            title="About body stiffness"
            dataList={blogData.relatedBlogs}
            navigation={navigation}
            onPressScroll={() => { scrollRef.current?.scrollTo({
            y: 0,
            animated: false,
        }); }}
          /> : null
          
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
    // width: 100,
    // width: win.width,
  },
})

export default BlogScreen;
