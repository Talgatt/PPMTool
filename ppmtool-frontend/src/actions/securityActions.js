import axios from "axios";
import { GET_ERRORS } from "../constants/backlogConstants";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../constants/securityConstants";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/user/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

export const login = (loginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post("/api/users/login", loginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in the header
    setJWTToken(token);
    // decode token
    const decoded = jwt_decode(token);
    // dispatch to securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
