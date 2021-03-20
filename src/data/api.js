import { API_URL } from "../GLOBAL";
// import { useContext } from "react";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

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
  const programs = await fetch(`${API_URL}/programs?userId=3&programId=`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return programs;
};

export const getPlayLists = async () => {
  const playlists = await fetch(`${API_URL}/playlists?userId=3&programId=`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return playlists;
};

export const getInstructorInfo = async (instructoId) => {
  const instructor = await fetch(
    `${API_URL}/instructor?instructorId=${instructoId}`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return instructor;
};

export const getCategories = async () => {
  const categories = await fetch(`${API_URL}/categories`)
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
  const playlists = await fetch(`${API_URL}/playlists?categoryId=${categoryId}`)
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
  const result = await fetch(
    `${API_URL}/search?userId=${userId}&keyword=${keyword}`
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
  // console.log(4.5, playlistId)
  const result = await fetch(`${API_URL}/playlists?playlistId=${playlistId}`)
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
  const result = await fetch(`${API_URL}/programs?programId=${programId}`)
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
  const result = await fetch(`${API_URL}/dashboard?userId=${userId}`)
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
  //console.log('Register Log: ' + userId + '  ' + programId + '  ' + playlistId + '  ' + lessonId);

  const result = await fetch(`${API_URL}/activitylog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  let qry = "";

  if (blogId) {
    qry = blogId != null ? `?blogId=${blogId}` : "";
  } else if (userId) {
    qry = userId != null ? `?userId=${userId}` : "";
  }

  // console.log(qry)

  const blogs = await fetch(`${API_URL}/blogs${qry}`)
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
  const result = await fetch(
    `${API_URL}/schedules?userId=${userId}&playlistId=${playlistId}`
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
  const dashboardData = await fetch(
    `${API_URL}/dashboard?userId=${userId}&initialDate=${initialDate}&finalDate=${finalDate}`
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
  const result = await fetch(`${API_URL}/schedules?userId=${userId}`)
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
  const result = await fetch(`${API_URL}/survey?surveyId=${surveyId}`)
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
  const newSurvey = await fetch(`${API_URL}/survey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const newSchedule = await fetch(`${API_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return newSchedule;
};

export const deleteSchedule = async (scheduleId) => {
  const deleteSceduleData = await fetch(
    `${API_URL}/schedules?scheduleId=${scheduleId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleId: scheduleId }),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  return deleteScheduleData;
};

export const getLessonById = async (lessonId) => {
  const result = await fetch(`${API_URL}/lessons?lessonId=${lessonId}`)
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
  const blogs = await fetch(
    `${API_URL}/blogs?categoryId=${categoryId}&instructorId=${instructorId}`
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
  const userData = await fetch(`${API_URL}/user?userId=${userId}`)
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
