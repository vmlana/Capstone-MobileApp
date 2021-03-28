import { API_URL } from "../GLOBAL";
// import { useContext } from "react";
import { AsyncStorage } from "react-native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const retrieveUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem("userInfo");
    if (value !== null) {
      // We have data!!
      // console.log(value);
      const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } = JSON.parse(value);
      return accessToken;
      // return value.json()
    }
  } catch (error) {
    // Error retrieving data
    console.log(error)
  }
};

export async function registerForPushNotificationsAsync(userId: string) {
  let experienceId = undefined;
  if (!Constants.manifest) {
    // Absence of the manifest means we're in bare workflow
    experienceId = "@username/example";
  }
  const expoPushToken = await Notifications.getExpoPushTokenAsync({
    experienceId,
  });
  await fetch("https://example.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      expoPushToken,
    }),
  });
}

export const getPrograms = async () => {
  const accessToken = await retrieveUserInfo()
  const programs = await fetch(
    `${API_URL}/programs?userId=3&programId=`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return programs;
};

export const getPlayLists = async () => {
  const accessToken = await retrieveUserInfo()
  const playlists = await fetch(`${API_URL}/playlists?userId=3&programId=`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getInstructorInfo = async (instructoId) => {
  const accessToken = await retrieveUserInfo()
  const instructor = await fetch(
    `${API_URL}/instructor?instructorId=${instructoId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return instructor;
};

export const getCategories = async () => {
  const accessToken = await retrieveUserInfo()
  const categories = await fetch(`${API_URL}/categories`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return categories;
};

export const getPlayListsByCategoryId = async (categoryId) => {
  const accessToken = await retrieveUserInfo()
  const playlists = await fetch(`${API_URL}/playlists?categoryId=${categoryId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return playlists;
};

export const getSearchResult = async (userId, keyword) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(
    `${API_URL}/search?userId=${userId}&keyword=${keyword}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    }
  )
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getPlaylistByPlaylistId = async (playlistId) => {
  const accessToken = await retrieveUserInfo()
  // console.log(4.5, playlistId)
  const result = await fetch(`${API_URL}/playlists?playlistId=${playlistId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      // console.log(response);
      if (response.status != 404) {
        // console.log(5, response)
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getProgramByProgramId = async (programId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(`${API_URL}/programs?programId=${programId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getUserDashboard = async (userId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(`${API_URL}/dashboard?userId=${userId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const setActivityLog = async (
  userId,
  programId,
  playlistId,
  lessonId
) => {
  const accessToken = await retrieveUserInfo()
  //console.log('Register Log: ' + userId + '  ' + programId + '  ' + playlistId + '  ' + lessonId);

  const result = await fetch(`${API_URL}/activitylog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": `${accessToken}`,
    },

    body: JSON.stringify({
      userId: userId,
      programId: programId,
      playlistId: playlistId,
      lessonId: lessonId,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return result;
};

export const getBlogs = async (blogId, userId) => {
  const accessToken = await retrieveUserInfo()
  let qry = "";

  if (blogId) {
    qry = blogId != null ? `?blogId=${blogId}` : "";
  } else if (userId) {
    qry = userId != null ? `?userId=${userId}` : "";
  }

  // console.log(qry)

  const blogs = await fetch(`${API_URL}/blogs${qry}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return blogs;
};

export const getUserScheduleData = async (userId, playlistId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(
    `${API_URL}/schedules?userId=${userId}&playlistId=${playlistId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    }
  )
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getDashboardData = async (userId, initialDate, finalDate) => {
  const accessToken = await retrieveUserInfo()
  const dashboardData = await fetch(
    `${API_URL}/dashboard?userId=${userId}&initialDate=${initialDate}&finalDate=${finalDate}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    }
  )
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return dashboardData;
};

export const getAllUserScheduleData = async (userId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(`${API_URL}/schedules?userId=${userId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getSurveyData = async (surveyId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(`${API_URL}/survey?surveyId=${surveyId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));

  return result;
};

export const postSurvey = async (surveyAnswers) => {
  const accessToken = await retrieveUserInfo()
  const newSurvey = await fetch(`${API_URL}/survey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": `${accessToken}`,
    },
    body: JSON.stringify(surveyAnswers),
  })
    .then((response) => response.text())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => console.error(error));

  return newSurvey;
};

export const createSchedule = async (scheduleData) => {
  const accessToken = await retrieveUserInfo()
  const newSchedule = await fetch(`${API_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": `${accessToken}`,
    },
    body: JSON.stringify(scheduleData),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return newSchedule;
};

export const deleteSchedule = async (scheduleId) => {
  const accessToken = await retrieveUserInfo()
  const deleteScheduleData = await fetch(
    `${API_URL}/schedules?scheduleId=${scheduleId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": `${accessToken}`,
      },
      body: JSON.stringify({ scheduleId: scheduleId }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return deleteScheduleData;
};

export const getLessonById = async (lessonId) => {
  const accessToken = await retrieveUserInfo()
  const result = await fetch(`${API_URL}/lessons?lessonId=${lessonId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return result;
};

export const getBlogsByCategoryIdAndInstructorId = async (
  categoryId,
  instructorId
) => {
  const accessToken = await retrieveUserInfo()
  const blogs = await fetch(
    `${API_URL}/blogs?categoryId=${categoryId}&instructorId=${instructorId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    }
  )
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return blogs;
};

export const getUserData = async (userId) => {
  const accessToken = await retrieveUserInfo()
  const userData = await fetch(`${API_URL}/user?userId=${userId}`, {
      headers: {
        "access-token": `${accessToken}`,
      }
    })
    .then((response) => {
      if (response.status != 404) {
        return response.json();
      } else {
        return null;
      }
    })
    .catch((error) => console.error(error));
  return userData;
};
