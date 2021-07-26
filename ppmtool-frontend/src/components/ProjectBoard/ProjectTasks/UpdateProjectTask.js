import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";

export default function UpdateProjectTask(props) {
  const { backlog_id, pt_id } = props.match.params;

  const projectTaskDetails = useSelector((state) => state.projectTaskDetails);

  console.log("projectDetails" + projectTaskDetails);
  const { loading, projectTask } = projectTaskDetails;
  const [id, setId] = useState("");
  const [projectSequence, setProjectSequence] = useState("");
  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [create_At, setCreate_At] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!projectTask) {
      dispatch(getProjectTask(backlog_id, pt_id, props.history));
    }
    dispatch(getProjectTask(backlog_id, pt_id, props.history));
    if (loading === false && projectTask) {
      setId(projectTask.id);
      setProjectSequence(projectTask.projectSequence);
      setSummary(projectTask.summary);
      setAcceptanceCriteria(projectTask.acceptanceCriteria);
      setStatus(projectTask.status);
      setPriority(projectTask.priority);
      setDueDate(projectTask.dueDate);
      setProjectIdentifier(projectTask.projectIdentifier);
      setCreate_At(projectTask.create_At);
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedProjectTask = {
      id,
      projectSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
      create_At,
    };
    dispatch(
      updateProjectTask(
        projectIdentifier,
        projectSequence,
        updatedProjectTask,
        props.history
      )
    );
  };
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to={`/projectBoard/${projectIdentifier}`}
              className="btn btn-light"
            >
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">
              Project Name: {projectIdentifier} | + Project Task ID:{" "}
              {projectSequence}{" "}
            </p>
            <form onSubmit={onSubmitHandler}>
              <div className="form-group"></div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={(e) => setAcceptanceCriteria(e.target.value)}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
