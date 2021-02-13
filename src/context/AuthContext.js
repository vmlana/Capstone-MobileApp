import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";

// import a component fetching user info through API

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_err_msg":
      return { ...state, errorMessage: "" };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { errorMessage: "", token: null };
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

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await "ADD POST METHOD like API.post('/signin, {email, password})";
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
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  // ======================================
  navigate("Signin");
  // ======================================
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
  },
  { token: null, errorMessage: "" }
);
