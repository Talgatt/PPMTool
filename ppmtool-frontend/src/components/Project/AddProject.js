import classnames from "classnames";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import CreateProjectButton from "./CreateProjectButton";
import { createProject } from "../../actions/projectActions";

export default function AddProject(props) {
  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");

  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newProject = {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };
    dispatch(createProject(newProject, props.history));
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    onChange={(e) => setProjectIdentifier(e.target.value)}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={start_date}
                    onChange={(e) => setStart_Date(e.target.value)}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={end_date}
                    onChange={(e) => setEnd_Date(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
