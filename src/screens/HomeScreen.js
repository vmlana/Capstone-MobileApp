import { StatusBar } from "expo-status-bar";
import React from "react";
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

// components ===============
import SearchIcon from "../components/Search/SearchIcon";

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Text>Here goes the main contents</Text>
        <Button onPress={() => navigation.navigate("PlayList")}>
          <Text>Play List</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default HomeScreen;
