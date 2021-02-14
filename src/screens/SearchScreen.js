import React from "react";
import SearchIcon from "../components/Search/SearchIcon";
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

const SearchScreen = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Text>Here goes the main contents</Text>
        <Button onPress={() => navigation.navigate("Home")}>
          <Text>Home</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SearchScreen;
