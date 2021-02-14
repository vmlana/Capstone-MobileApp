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
      <Header>
        <Left />
        <Body>
          <Title>Search Screen</Title>
        </Body>
        <Right>
          <SearchIcon />
        </Right>
      </Header>
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
