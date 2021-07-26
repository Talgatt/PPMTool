import {
  GET_BACKLOG_FAIL,
  GET_BACKLOG_REQUEST,
  GET_BACKLOG_SUCCESS,
  GET_PROJECT_TASK_SUCCESS,
} from "../constants/backlogConstants";

const initalState = {
  loading: true,
  projectTasks: [],
  projectTask: {},
};
export const backlogReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_BACKLOG_REQUEST:
      return { loading: true };
    case GET_BACKLOG_SUCCESS:
      return { loading: false, projectTasks: action.payload };
    case GET_BACKLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectTaskReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_PROJECT_TASK_SUCCESS:
      return { loading: false, projectTask: action.payload };
    default:
      return state;
  }
};
