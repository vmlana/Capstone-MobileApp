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
import FooterContainer from "./components/Footer/Footer";

const App = () => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>Here goes the main contents</Text>
      </Content>
      <FooterContainer />
    </Container>
  );
};

export default App;
