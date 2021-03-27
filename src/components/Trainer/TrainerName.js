import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Thumbnail } from "native-base";
import { colors } from "../../colors";

import { getInstructorInfo } from "../../data/api";

const TrainerName = ({ navigation, data, blog, page }) => {
  const [instructorInfo, setInstructorInfo] = useState("");

  useEffect(() => {
    getInstructorInfo(data.instructorID).then((instructor) => {
      setInstructorInfo(instructor);
    });
  }, [data]);

  return (
    <TouchableOpacity
      style={blog ? styles.trainerInfoForBlog : styles.trainerInfo}
      onPress={() =>
        navigation.navigate("TrainerDetails", {
          instructorName: data.instructorName,
          instructorID: data.instructorID
            ? data.instructorID
            : data.instructorId,
        })
      }
    >
      <Thumbnail
        small
        source={{
          uri: instructorInfo.imageFile
            ? instructorInfo.imageFile
            : data.instructorImage,
        }}
        style={styles.thumbNail}
      />
      <Text
        style={{
          ...styles.trainerName,
          fontFamily: "GothamRoundedLight_21020",
          color: colors.darkGrey,
        }}
      >
        {data.instructorName ? data.instructorName : data.trainerName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trainerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbNail: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  trainerName: {
    fontSize: 13,
    lineHeight: 13,
  },
  trainerInfoForBlog: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TrainerName;
