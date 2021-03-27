import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import SurveyList from "../components/Survey/SurveyList";
import SubmitComplete from "../components/Survey/SubmitComplete";
import { Button } from "react-native-elements";
import { getSurveyData, postSurvey } from "../data/api";
import bcgimg from "../../assets/TextBG.png";

import { Context as AuthContext } from "../context/AuthContext";

import { colors } from "../colors";

const SurveyScreen = ({ navigation }) => {
  const surveyDataset = navigation.getParam("surveyData");
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [surveys, setSurveys] = useState("");
  const [isPicked, setIsPicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { state, scheduleAdded } = useContext(AuthContext);

  useEffect(() => {
    const getSurvey = async () => {
      const surveyData = await getSurveyData(surveyDataset.surveyId);
      //   console.log("useEffect surveyData", surveyData);
      setSurveys(surveyData);

      surveyData.questions.map((question, index) =>
        setAnswers((old) => [
          ...old,
          {
            questionId: question.questionId,
            answerValue: "1",
          },
        ])
      );
    };

    getSurvey();
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
      surveyId: surveyDataset.surveyId,
      programId: surveyDataset.programId,
      answers: answers,
    };

    postSurvey(surveyAnswers);
    setSubmitted(true);
    scheduleAdded(state.scheduleSwitch);

    setTimeout(() => {
      setSubmitted(false);
      navigation.navigate("Home");
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={bcgimg} />
        <Text
          h3
          style={{
            ...styles.headerText,
            fontFamily: "GothamRoundedMedium_21022",
          }}
        >
          Please select the option that best {"\n"} suits your experience with
          us
        </Text>
      </View>

      {surveys ? (
        surveys.questions.map((survey, index) => (
          <View key={index} style={styles.quiz}>
            <View>
              <Text
                style={{
                  ...styles.question,
                  fontFamily: "GothamRoundedMedium_21022",
                }}
              >
                {survey.questionDescription}
              </Text>
            </View>
            <SurveyList
              data={survey}
              onPick={onPick}
              indexVal={index}
              onPress={onSubmit}
            />
          </View>
        ))
      ) : (
        <Text
          style={{ ...styles.question, fontFamily: "GothamRoundedBook_21018" }}
        >
          Loading...
        </Text>
      )}
      {surveys ? (
        <TextInput
          multiline={true}
          numberOfLines={Platform.OS === "ios" ? null : 6}
          minHeight={Platform.OS === "ios" && 6 ? 20 * 6 : null}
          onChangeText={(text) => updateText(text)}
          value={text}
          autoCorrect={false}
          style={styles.textArea}
        />
      ) : null}

      <Button
        title="Submit Feedback"
        buttonStyle={{
          ...styles.button,
          fontFamily: "GothamRoundedBook_21018",
        }}
        onPress={onSubmit}
      />

      <Modal
        transparent={true}
        visible={submitted}
        onRequestClose={() => {
          submitted;
        }}
      >
        <SubmitComplete />
      </Modal>
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
    backgroundColor: "#F59C60",
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
    color: "#767676",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});

export default SurveyScreen;
