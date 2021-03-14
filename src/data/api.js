import { API_URL } from "../GLOBAL";

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
  console.log("test in api for schedule", userId, playlistId);
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

export const createSchedule = async (scheduleData) => {
  //   return JSON.stringify(scheduleData);

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
