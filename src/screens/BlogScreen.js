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

const BlogScreen = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Blog</Title>
        </Body>
        <Right>
          <SearchIcon />
        </Right>
      </Header>
      <Content>
        <Text>Here goes the main contents</Text>
      </Content>
    </Container>
  );
};

export default BlogScreen;
