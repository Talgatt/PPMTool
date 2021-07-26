import React, { useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { login } from "../../actions/securityActions";
import { useDispatch, useSelector } from "react-redux";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const { validToken } = useSelector((state) => state.security);

  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const loginRequest = {
      username,
      password,
    };
    dispatch(login(loginRequest));
  };

  useEffect(() => {
    if (validToken) {
      props.history.push("/dashboard");
    }
  }, [validToken]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username,
                  })}
                  placeholder="Email Address"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};
