import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import Dashboard from "./components/Dashboard";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import Landing from "./components/Layout/Landing";
import Header from "./components/Layout/Header";
import SecuredRoute from "./securityUtils/SecureRoutes";
import setJWTToken from "./securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./constants/securityConstants";
import store from "./store";
import { logout } from "./actions/securityActions";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* Public Routes */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        {/* Private Routes */}
        <Switch>
          <SecuredRoute exact path="/dashboard" component={Dashboard} />
          <SecuredRoute exact path="/addProject" component={AddProject} />
          <SecuredRoute
            exact
            path="/updateProject/:projectId"
            component={UpdateProject}
          />
          <SecuredRoute
            exact
            path="/projectBoard/:id"
            component={ProjectBoard}
          />
          <SecuredRoute
            exact
            path="/addProjectTask/:id"
            component={AddProjectTask}
          />
          <SecuredRoute
            exact
            path="/updateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
