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

const BlogScreen = () => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Header</Title>
        </Body>
      </Header>
      <Content>
        <Text>Here goes the main Blog contents</Text>
      </Content>
    </Container>
  );
};

export default BlogScreen;
