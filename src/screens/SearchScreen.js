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
} from "native-base";

import SearchInput from '../components/Search/SearchInput';
import ContentListContainer from "../components/Home/ContentListContainer";


import { useSearchContext } from '../../src/context/searchContext';
import { getSearchResult } from '../data/api';


const SearchScreen = ({ navigation }) => {
  const {searchString, setSearchString} = useSearchContext();
  const [searchResultObject, setSearchResultObject] = useState({
    keyword: "",
    playlists: [],
    programs: [],
    blogs: [],
  })

  useEffect(()=>{
    (async()=>{
      const searchResult = await getSearchResult(3, searchString);

      setSearchResultObject(searchResult);
    })();
  },[searchString])

  if (
      searchString === "" ||
      searchResultObject === null) {
    return (
      <View style={styles.centered}>
        <Text>No result found. Please try other keyword.</Text>
      </View>
    )
  }

  return (
    <Container>
      <Content>
        <View style={styles.container}>
        {/* <Button onPress={() => navigation.navigate("Home")}>
          <Text>Home</Text>
        </Button> */}
        {
          searchResultObject.playlists.length !== 0 ?
          <ContentListContainer
            title={searchString + " Related Videos"}
            dataList={searchResultObject.playlists}
            type={"playlists"}
            navigation={navigation}
          /> : null
        }
        </View>
      </Content>
    </Container>
  );
};

SearchScreen.navigationOptions = (navData) => {
  const searchFn = () => {
    console.log("search");
  };
  // const { search } = this.state;

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
