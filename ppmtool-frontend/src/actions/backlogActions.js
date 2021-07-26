import {
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_BACKLOG_FAIL,
  GET_BACKLOG_REQUEST,
  GET_BACKLOG_SUCCESS,
  GET_ERRORS,
  GET_PROJECT_TASK_SUCCESS,
} from "../constants/backlogConstants";
import axios from "axios";

export const getBacklog = (backlog_id) => async (dispatch) => {
  dispatch({
    type: GET_BACKLOG_REQUEST,
  });
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);
    console.log("res");
    console.log(res.data);

    dispatch({
      type: GET_BACKLOG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    dispatch({
      type: GET_BACKLOG_FAIL,
      payload: err,
    });
  }
};

export const getProjectTask =
  (backlog_id, pt_id, history) => async (dispatch) => {
    try {
      console.log(`/api/backlog/${backlog_id}/${pt_id}`);
      const res = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);

      // console.log("backlog update");
      // console.log(res.data);
      dispatch({
        type: GET_PROJECT_TASK_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      //history.push("/dashboard");
    }
  };

export const addProjectTask =
  (backlog_id, projectTask, history) => async (dispatch) => {
    try {
      await axios.post(`/api/backlog/${backlog_id}`, projectTask);
      history.push(`/projectBoard/${backlog_id}`);
    } catch (err) {
      console.log(err);
    }
  };

export const updateProjectTask =
  (backlog_id, pt_id, projectTask, history) => async (dispatch) => {
    try {
      await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, projectTask);
      console.log("changing page");
      history.push(`/projectBoard/${backlog_id}`);
    } catch (err) {
      console.log(err);
    }
  };

export const deleteProjectTask = (backlog_id, pt_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting project task ${pt_id}, this action cannot be undone`
    )
  ) {
    await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);

    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: pt_id,
    });
  }
};
