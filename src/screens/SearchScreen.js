import React, { useEffect, useState } from "react";
import SearchIcon from "../components/Search/SearchIcon";
import { View, StyleSheet, ActivityIndicator }  from "react-native";
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
  Thumbnail
} from "native-base";

import SearchInput from '../components/Search/SearchInput';
import ContentListContainer from "../components/Home/ContentListContainer";
import InstructorSection from '../components/Search/InstructorSection';

import { blogData, instructorsData } from '../demoData';

import { useSearchContext } from '../../src/context/searchContext';
import { getSearchResult } from '../data/api';
import RectangleListContainer from "../components/Search/RectangleListContainer";

const SearchScreen = ({ navigation }) => {
  const {searchString, setSearchString} = useSearchContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResultObject, setSearchResultObject] = useState({
    keyword: "",
    playlists: [],
    programs: [],
    blogs: [],
    instructors: [],
  })

  useEffect(()=>{
    setSearchResultObject({
      keyword: "",
      playlists: [],
      programs: [],
      blogs: [],
      instructors: [],
    })

    if(searchString !== "") {
      (async()=>{
        setIsLoading(true);
        let searchResult = await getSearchResult(3, searchString);
        setIsLoading(false);

        // console.log(searchResult);
        if(searchResult){
          setSearchResultObject(searchResult);
        }
      })();
    }
  },[searchString])

  // TEST data set up *********
  const blogsArray = [blogData, blogData, blogData];
  const instructorsArray = instructorsData;

  // **************************

  if (isLoading) {
    return (
      <View style={styles.centered}>
          <ActivityIndicator size="large" />
      </View>
    );
  }

  if (
      searchResultObject.instructors.length === 0
      && searchResultObject.playlists.length === 0
      && searchResultObject.programs.length === 0
      && searchResultObject.blogs.length === 0 
      ) {
    return (
      <View style={styles.centered}>
        <Text>Nothing found.</Text>
      </View>
    )
  }

  return (
    <Container>
      <Content>
        <View style={styles.container}>
        {/* INSTRUCTOR SECTION **********************/}
        {
          searchResultObject.instructors.length?
          <InstructorSection
            navigation={navigation}
            dataList={searchResultObject.instructors} />
          : null
        }
        {/* TEST INSTRUCTOR SECTION **********************/}
        {/* {
          instructorsArray.length !== 0?
          <InstructorSection
            navigation={navigation}
            dataList={instructorsArray} />
          : null
        } */}
        {/* PLAYLIST SECTION **********************/}
        {
          searchResultObject.playlists.length !== 0 ?
          <ContentListContainer
            title={"Playlists"}
            dataList={searchResultObject.playlists}
            type={"playlists"}
            navigation={navigation}
          /> : null
        }
        {/* BLOG SECTION **********************/}
        {
          searchResultObject.blogs.length !== 0?
          <RectangleListContainer
            title="Blog Posts"
            dataList={searchResultObject.blogs}
            navigation={navigation}
          /> : null
        }
        {/* TEST BLOG SECTION **********************/}
        {/* {
          blogsArray.length !== 0?
          <RectangleListContainer
            title="Blog Posts"
            dataList={blogsArray}
            navigation={navigation}
          /> : null
        } */}
        {/* BLOG SECTION **********************/}
        {
          searchResultObject.programs.length !== 0?
          <ContentListContainer
            title={"Programs"}
            dataList={searchResultObject.programs}
            type={"programs"}
            navigation={navigation}
          /> : null
        }
        </View>
      </Content>
    </Container>
  );
};

SearchScreen.navigationOptions = (navData) => {
  return {
      headerTitle: (
        <SearchInput />
      ),
      headerLeft: (
        <View style={{paddingLeft: 20}}>
          <SearchIcon />
        </View>
      ),
      // headerRight: (
      // )
  };
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 25,
  },
  centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
});

export default SearchScreen;
