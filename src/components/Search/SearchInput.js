import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet,  } from "react-native";
import SearchIcon from '../../components/Search/SearchIcon';

import { useSearchContext } from '../../../src/context/searchContext';

import {colors} from '../../colors';

const SearchInput = (props) => {
  const [searchInput, setSearchInput] = useState("")
  const {searchString, setSearchString} = useSearchContext();

  const onChange =(text) => {
    setSearchInput(text);
  }

  const onSubmit = () => {
    setSearchString(searchInput);
  }

  useEffect(()=>{
    setSearchInput(searchString);
  }, [searchString]);

  return (
    <View style={styles.searchInputContainer}>
      
      {/* <SearchIcon /> */}
        <TextInput
          label="text"
          style={styles.input}
          onChangeText={onChange}
          value={searchInput}
          onSubmitEditing={onSubmit}
          autoFocus={true}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    // backgroundColor: "#cccccc",
    width: "100%",
    padding: 5,
    fontSize: 20,
    fontFamily: "GothamRoundedBook_21018",
    color: colors.darkGrey,
  }
})

export default SearchInput;
