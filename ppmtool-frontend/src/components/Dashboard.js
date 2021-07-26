import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../actions/projectActions";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";

export default function Dashboard() {
  const projectList = useSelector((state) => state.projectList);
  const { loading, projects, error } = projectList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Error ...</div>
  ) : (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
