import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

import { View, StyleSheet } from "react-native";

import {
  categoryPlayList as catPlays,
  recentlyAddedPlayList as recAddPlays,
  playList,
} from "../demoData";

import { getPrograms } from "../data/api";

// components ===============
import Update from "../components/Home/Update";
import SearchIcon from "../components/Search/SearchIcon";
import ContentListContainer from "../components/Home/ContentListContainer";

const programId = 1;

const HomeScreen = ({ navigation }) => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getProgramArr = async () => {
      const programArr = await getPrograms();
      const filteredProgramList = await programArr.filter(
        (program) => program.programId === programId
      );
      await setPrograms(filteredProgramList);
    };

    getProgramArr();
  }, []);

  return (
    <Container>
      <Content>
        <Update />
        <View style={styles.container}>
          <ContentListContainer
            title={"Select Your workout type"}
            dataList={catPlays}
            type={"cat"}
            navigation={navigation}
          />
          <ContentListContainer
            title={"Recently Added"}
            dataList={recAddPlays}
            type={"movie"}
            navigation={navigation}
          />
          <ContentListContainer
            title={"Most Viewed / Hit List"}
            dataList={recAddPlays}
            sizeBig={false}
            type={"movie"}
            navigation={navigation}
          />
          {programs.length !== 0 ? (
            <ContentListContainer
              title={"Workout Playlists"}
              dataList={programs}
              type={"programs"}
              navigation={navigation}
            />
          ) : null}
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
});

export default HomeScreen;
