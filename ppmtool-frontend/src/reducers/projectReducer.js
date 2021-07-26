import {
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
} from "../constants/projectConstants";

const initialState = {
  loading: true,
  projects: [],
  project: {},
};
export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return { loading: true };
    case GET_PROJECTS_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_PROJECTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return { loading: true };
    case GET_PROJECT_SUCCESS:
      return { loading: false, project: action.payload };
    default:
      return state;
  }
};
