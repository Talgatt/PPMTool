import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProject } from "../../actions/projectActions";

export default function UpdateProject(props) {
  const { projectId } = props.match.params;
  const [id, setId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const [errors, setErrors] = useState("");
  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, project } = projectDetails;

  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    const updatedProject = {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };

    dispatch(createProject(updatedProject, props.history));
  };

  useEffect(() => {
    if (!project) {
      dispatch(getProject(projectId, props.history));
    }
    dispatch(getProject(projectId, props.history));
    console.log(project);
    if (loading === false && project) {
      setId(project.id);
      setProjectName(project.projectName);
      setProjectIdentifier(project.projectIdentifier);
      setDescription(project.setDescription);
      setStart_date(project.start_date);
      setEnd_date(project.end_date);
    }
  }, []);

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
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
                  disabled
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
                    "is-invalid": errors.description,
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
                  onChange={(e) => setStart_date(e.target.value)}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={(e) => setEnd_date(e.target.value)}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
