import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

export const loginUser = (userData, props) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      console.log("res.data", res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS }); // clear errors
      props.navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const signupUser = (newUserData, props) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS }); // clear errors
      props.navigate("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("fbIdToken");
  delete axios.defaults.headers.common["Authorization"];
  // dispatch({ type: SET_USER, payload: {} });
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  await axios
    .get("/user")
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  await axios
    .post("/user/image", formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};
const setAuthorizationHeader = (token) => {
  const fbIdToken = `Bearer ${token}`;
  localStorage.setItem("fbIdToken", fbIdToken);
  axios.defaults.headers.common["Authorization"] = fbIdToken;
};
