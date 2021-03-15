import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import SurveyList from "../components/Survey/SurveyList";

const SurveyScreen = ({ navigation }) => {
  const surveyData = navigation.getParam("surveyData");
  return (
    <ScrollView>
      <View>
        <Text h3>
          Please select the option that best {"\n"} suits your experience with
          us
        </Text>
      </View>
      {surveyData.questions.map((survey) => (
        <View>
          <View>
            <Text>{survey.questionDescription}</Text>
          </View>
          <SurveyList data={survey.options} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SurveyScreen;
