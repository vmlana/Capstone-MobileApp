import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import SurveyList from "../components/Survey/SurveyList";
import { Button } from "react-native-elements";
import { postSurvey } from "../data/api";
import bcgimg from "../../assets/TextBG.png";

import { Context as AuthContext } from "../context/AuthContext";

const SurveyScreen = ({ navigation }) => {
  const surveyData = navigation.getParam("surveyData");
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [isPicked, setIsPicked] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    surveyData.questions.map((question, index) =>
      setAnswers((old) => [
        ...old,
        {
          questionId: question.questionId,
          answerValue: "1",
        },
      ])
    );
  }, []);

  const onPick = async (indexVal, value, questionId) => {
    const newAnswers = [...answers];
    newAnswers[indexVal] = {
      questionId: questionId,
      answerValue: value,
    };

    setAnswers(newAnswers);
  };

  const updateText = (text) => {
    const newAnswers = [...answers];
    newAnswers[answers.length - 1] = {
      questionId: 12,
      answerValue: text,
    };

    setAnswers(newAnswers);
    setText(text);
  };

  const onSubmit = () => {
    const surveyAnswers = {
      userId: state.userInfo.authId,
      surveyId: surveyData.surveyId,
      programId: null,
      answers: answers,
    };
    postSurvey(surveyAnswers);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={bcgimg} />
        <Text h3 style={styles.headerText}>
          Please select the option that best {"\n"} suits your experience with
          us
        </Text>
      </View>

      {surveyData.questions.map((survey, index) => (
        <View key={index} style={styles.quiz}>
          <View>
            <Text style={styles.question}>{survey.questionDescription}</Text>
          </View>
          <SurveyList
            data={survey}
            onPick={onPick}
            indexVal={index}
            onPress={onSubmit}
          />
        </View>
      ))}
      <TextInput
        multiline={true}
        numberOfLines={Platform.OS === "ios" ? null : 6}
        minHeight={Platform.OS === "ios" && 6 ? 20 * 6 : null}
        onChangeText={(text) => updateText(text)}
        value={text}
        autoCorrect={false}
        style={styles.textArea}
      />
      <Button title="Submit" buttonStyle={styles.button} onPress={onSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    position: "relative",
  },
  headerText: {
    paddingHorizontal: 15,
    position: "absolute",
    top: "35%",
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#624A99",
    marginVertical: 0,
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 4,
    margin: 20,
  },
  quiz: {
    // borderBottomWidth: 0.5,
    // borderColor: "black",
    marginBottom: 20,
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  question: {
    color: "#707070",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});

export default SurveyScreen;
