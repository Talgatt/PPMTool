import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProjectTask } from "../../../actions/backlogActions";

export default function AddProjectTask(props) {
  const { id } = props.match.params;

  const [summary, setSummary] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("0");
  const [dueDate, setDueDate] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState(id);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newProjectTask = {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
    };
    dispatch(addProjectTask(projectIdentifier, newProjectTask, props.history));
  };
  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="leayad text-center">Project Name + Project Code</p>
            <form onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={classNames("form-control form-control-lg", {
                    "is-invalid": errors.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={(e) => setAcceptanceCriteria(e.target.value)}
                />
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
