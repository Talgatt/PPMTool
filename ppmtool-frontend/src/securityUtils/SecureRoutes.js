import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => {
  const { validToken } = useSelector((state) => state.security);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        validToken === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

export default SecuredRoute;
