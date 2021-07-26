import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect, useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import ProjectTask from "./ProjectTasks/ProjectTask";
//import { getBacklog } from "../../actions/backlogActions";

function ProjectBoard(props) {
  const { id } = props.match.params;
  const projectTasksList = useSelector((state) => state.projectTasksList);
  const { loading, projectTasks, error } = projectTasksList;

  //const errors = useSelector((state) => state.errors);

  //   const boardAlgorithm = (error, projectTasks) => {
  //     console.log(projectTasks);
  //     if (projectTasks.length < 1) {
  //     } else {
  //       return <Backlog projectTasks={projectTasks} />;
  //     }
  //   };

  //   const BoardContent = boardAlgorithm(error, projectTasks);

  let BoardContent;

  const boardAlgorithm = (error, project_tasks) => {
    // console.log("project_takss");
    // console.log(project_tasks);
    // if (project_tasks.length < 1) {
    //   if (error.projectNotFound) {
    //     return (
    //       <div className="alert alert-danger text-center" role="alert">
    //         {error.projectNotFound}
    //       </div>
    //     );
    //   } else if (error.projectIdentifier) {
    //     return (
    //       <div className="alert alert-danger text-center" role="alert">
    //         {error.projectNotFound}
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div className="alert alert-info text-center" roler="alert">
    //         No Project Tasks on this board
    //       </div>
    //     );
    //   }
    // } else {
    //   return <Backlog project_tasks_prop={project_tasks} />;
    // }
  };

  BoardContent = boardAlgorithm(error, projectTasks);

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("here  projectTasksList" + projectTasksList);

    dispatch(getBacklog(id));
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error ...</div>
  ) : (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <Backlog projectTasks={projectTasks} />
      {/* {projectTasks.map((projectTask) => (
        <div>{projectTask.status}</div>
      ))}
      {console.log("project length")}
      {console.log(projectTasks.length)} */}
      {/* {BoardContent} */}
    </div>
  );
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ProjectBoard;
