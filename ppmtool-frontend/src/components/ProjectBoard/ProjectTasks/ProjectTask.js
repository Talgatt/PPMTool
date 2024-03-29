import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions";

export default function ProjectTask(props) {
  const { projectTask } = props;
  let priorityString;
  let priorityClass;

  if (projectTask.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  }
  if (projectTask.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  }
  if (projectTask.priority === 3) {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const dispatch = useDispatch();
  const onDeleteClick = (backlog_id, pt_id) => {
    //  this.props.deleteProjectTask(backlog_id, pt_id);
    //console.log("deleting task");
    dispatch(deleteProjectTask(backlog_id, pt_id));
  };

  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority:{priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <Link
          to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>
        <button
          className="btn btn-danger ml-4"
          onClick={() => {
            onDeleteClick(
              projectTask.projectIdentifier,
              projectTask.projectSequence
            );
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};
