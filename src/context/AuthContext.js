import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import { API_URL } from '../GLOBAL';

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
    const response =       
      await fetch(`${API_URL}/login`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
       body: `email=${email}&password=${password}&userType=user`,
      })

    .then(result=>{
        return result;
      })
      .catch(error => {throw error})

    if(response.ok) {
      
      let releasedate = await response.json().then(async(json) => {
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
      console.log('Network failed with response ' + result.status + ': ' + result.statusText);
    }

  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sigh up. Please try again.",
    });
  }
};

const autoSignin = (dispatch) => async () => {
        let userInfo = await AsyncStorage.getItem("userInfo");
        userInfo = JSON.parse(userInfo);
        dispatch({ type: "signin", payload: userInfo });
};

const tokenRefresh = (dispatch) => async (refreshToken, navigation) => {
  // console.log("refresh token!!!")
  try {
    const response =       
      await fetch(`${API_URL}/token`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
       body: `refreshToken=${refreshToken}`,
      })

    .then(result=>{
        return result;
      })
      .catch(error => {throw error})

    if(response.ok) {
      
      let releasedate = await response.json().then(async(json) => {
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
      console.log('Network failed with response ' + result.status + ': ' + result.statusText);
    }

  } catch (error) {
    console.log(error.message);
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await "ADD POST MEHOD like API.post('/signup, {email, password})";
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    // navigate to the Home screen after successful signin
    // Need to use the naviagate function to navigate between pages outside of the components.
    navigate("Home");
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sigh up. Please try again.",
    });
  }
};

const signout = (dispatch) => async () => {
  // console.log("signout");
  await AsyncStorage.removeItem("userInfo");
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
    autoSignin
  },
  { token: null, errorMessage: "" }
);
