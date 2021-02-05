import React from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from "native-base";

const FooterContainer = () => {
  return (
    <Footer>
      <FooterTab>
        <Button active>
          <Icon active name="home" />
          <Text>Home</Text>
        </Button>
        <Button>
          <Icon name="book" />
          <Text>Blog</Text>
        </Button>
        <Button>
          <Icon name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterContainer;
