import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECT_TASK_SUCCESS,
} from "../constants/backlogConstants";
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  DELETE_PROJECT,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
} from "../constants/projectConstants";

export const getProjects = () => async (dispatch) => {
  dispatch({
    type: GET_PROJECTS_REQUEST,
  });
  try {
    const res = await axios.get("/api/project/all");
    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROJECTS_FAIL,
      payload: err,
    });
  }
};

export const getProject = (projectId, history) => async (dispatch) => {
  dispatch({
    type: GET_PROJECT_REQUEST,
  });
  try {
    const res = await axios.get(`/api/project/${projectId}`);

    dispatch({
      type: GET_PROJECT_SUCCESS,
      payload: res.data,
    });
  } catch {
    history.push("/dashboard");
  }
};

export const createProject = (project, history) => async (dispatch) => {
  try {
    console.log("project is " + project.projectName);
    await axios.post("/api/project", project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it."
    )
  ) {
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
