import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { backlogReducer, projectTaskReducer } from "./reducers/backlogReducer";
import { projectReducer, projectsReducer } from "./reducers/projectReducer";
import { securityReducer } from "./reducers/securityReducer";

const initialState = {};
const reducer = combineReducers({
  projectTasksList: backlogReducer,
  projectTaskDetails: projectTaskReducer,
  projectList: projectsReducer,
  projectDetails: projectReducer,
  security: securityReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
