import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Dimensions }  from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  // Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail
} from "native-base";
import Carousel, {Pagination} from 'react-native-snap-carousel';

const InstructorSection = ({ dataList, navigation }) => {

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.instructorContainer}>
        <Thumbnail
          style={styles.thumbnail}
          source={{ 
              uri: item.instructorImage ? item.instructorImage : "https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png" 
              }} />
        <View style={styles.instructorContainerRight}>
          <Text style={styles.instructorName}>{item.instructorName}</Text>
          <Text  style={styles.instructorDescription}>
          {
            item.instructorResume.substring(100, 0) + "..."
          }
          </Text>
          <Text
            style={styles.seeMoreText}
            onPress={() => navigation.navigate("TrainerDetails", { instructorName: item.instructorName, instructorID: item.instructorId })}
          >See More</Text>
        </View>
      </View>
    )
  };

  return (
    <View style={
        dataList.length > 1 ?
        {marginBottom: 0}:
        {marginBottom: 26}
        }>
    <Carousel
        ref={isCarousel}
        data={dataList}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width - 80}
        itemWidth={Math.round((Dimensions.get('window').width + 80) * 0.7)}
        onSnapToItem={(index) => setIndex(index)}
    />
    <Pagination
        dotsLength={dataList.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
    />
    </View>
  );
};

const styles = StyleSheet.create({
//   instructorSection: {
//     marginBottom: 26,
//   },
  instructorContainer: {
    flexDirection: "row",
  },
  thumbnail: {
    width: 40,
		height: 40,
  },
  instructorContainerRight: {
    marginLeft: 16,
    width: "75%"
  },
  instructorName: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 4,
  },
  instructorDescription: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 4,
  },
  seeMoreText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    textDecorationLine: "underline"
  }
});

export default InstructorSection;
