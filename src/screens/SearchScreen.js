import React, { useEffect, useState } from "react";
import SearchIcon from "../components/Search/SearchIcon";
import { View, StyleSheet }  from "react-native";
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
  const [searchResultObject, setSearchResultObject] = useState({
    keyword: "",
    playlists: [],
    programs: [],
    blogs: [],
  })

  useEffect(()=>{
    if(searchString !== "") {
      (async()=>{
        let searchResult = await getSearchResult(3, searchString);
  
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

  if (
      searchResultObject.playlists.length === 0
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
          instructorsArray.length !== 0?
          <InstructorSection dataList={instructorsArray} />
          : null
        }
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
          blogsArray.length !== 0?
          <RectangleListContainer
            title="Blog Posts"
            dataList={blogsArray}
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
