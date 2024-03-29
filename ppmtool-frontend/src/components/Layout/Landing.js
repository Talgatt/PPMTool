import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Landing(props) {
  const { validToken } = useSelector((state) => state.security);

  useEffect(() => {
    if (validToken) {
      props.history.push("/dashboard");
    }
  });
  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">
                Personal Project Management Tool
              </h1>
              <p className="lead">
                Create your account to join active projects or start you own
              </p>
              <hr />
              <Link className="btn btn-lg btn-primary mr-2" to="/register">
                Sign Up
              </Link>
              <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  security: PropTypes.object.isRequired,
};
