import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { API_URL } from "../GLOBAL";

// import a component fetching user info through API

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_err_msg":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      // return { errorMessage: "", token: action.payload };
      return { errorMessage: "", userInfo: action.payload };
    case "signout":
      return { errorMessage: "", userInfo: null };
    case "scheduleAdded":
      return { ...state, scheduleSwitch: action.payload };
    default:
      return state;
  }
};

// WE NEED TO INSTALL jsonwebtoken

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  token
    ? (dispatch({ type: "signin", payload: token }), navigate("HOME"))
    : // ======================================
      navigate("Signin");
  // ======================================
};

const signin = (dispatch) => async (email, password, navigation) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `email=${email}&password=${password}&userType=user`,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });

    if (response.ok) {
      let releasedate = await response.json().then(async (json) => {
        return json;
      });

      if (!releasedate.success) {
        throw "error";
      }

      await AsyncStorage.setItem("userInfo", JSON.stringify(releasedate));
      dispatch({ type: "signin", payload: releasedate });

      // navigate to the Home screen after successful signin
      // Need to use the naviagate function to navigate between pages outside of the components.
      navigation.navigate("Home");
    } else {
      console.log(
        "Network failed with response " +
          result.status +
          ": " +
          result.statusText
      );
    }
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in. Please try again.",
    });
  }
};

const autoSignin = (dispatch) => async () => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  dispatch({ type: "signin", payload: userInfo });
};

const scheduleAdded = (dispatch) => async (schedule) => {
  dispatch({ type: "scheduleAdded", payload: !schedule });
};

const tokenRefresh = (dispatch) => async (refreshToken, navigation) => {
  // console.log("refresh token!!!")
  try {
    const response = await fetch(`${API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `refreshToken=${refreshToken}`,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });

    if (response.ok) {
      let releasedate = await response.json().then(async (json) => {
        return json;
      });

      if (!releasedate.success) {
        throw "error";
      }

      await AsyncStorage.setItem("userInfo", JSON.stringify(releasedate));
      dispatch({ type: "signin", payload: releasedate });

      // navigate to the Home screen after successful signin
      // Need to use the naviagate function to navigate between pages outside of the components.
      navigation.navigate("Home");
    } else {
      console.log(
        "Network failed with response " +
          result.status +
          ": " +
          result.statusText
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};

const signup = (dispatch) => async (
  email,
  password,
  companyName,
  employeeId,
  navigation
) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `email=${email}&password=${password}&userType=user&companyName=${companyName}&employeeId=${employeeId}`,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });

    if (response.ok) {
      let releasedate = await response.json().then(async (json) => {
        return json;
      });

      if (!releasedate.success) {
        throw "error";
      }

      await AsyncStorage.setItem("userInfo", JSON.stringify(releasedate));
      dispatch({ type: "signin", payload: releasedate });

      // navigate to the Home screen after successful signin
      // Need to use the naviagate function to navigate between pages outside of the components.
      navigation.navigate("Home");
    } else {
      console.log(
        "Network failed with response " +
          result.status +
          ": " +
          result.statusText
      );
    }
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up. Please try again.",
    });
  }
};

const signout = (dispatch) => async (navigation) => {
  let userInfo = await AsyncStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);

  const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } = userInfo;

  await AsyncStorage.removeItem("userInfo");

  await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "access-token": `${accessToken}`,
      "refresh-token": `${refreshToken}`,
      "access-expiration-date": `${accessExpiresIn}`,
      "refresh-expiration-date": `${refreshExpiresIn}`  
    }
  })
  .then(result=>{
    console.log('success', result);
    // AsyncStorage.removeItem("userInfo");
  })
  .catch(error=>{
    console.log('failed', error);
    // AsyncStorage.removeItem("userInfo");
  })

  navigation.navigate("Signin");
  dispatch({ type: "signout" });
  console.log("signout");

};

const clearErrMsg = (dispatch) => () => {
  dispatch({ type: "clear_err_msg" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    tryLocalSignin,
    signin,
    signup,
    signout,
    clearErrMsg,
    tokenRefresh,
    autoSignin,
    scheduleAdded,
  },
  { token: null, errorMessage: "", scheduleSwitch: false }
);
