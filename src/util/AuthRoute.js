import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
// const AuthRoute = ({ element: Component, authenticated, ...rest }) => (
//     <Routes>

//         <Route {...rest} render={(props) => (authenticated === true ? <Navigate to="/" /> : <Component {...props} />)} />
//     </Routes>
// );

const AuthRoute = ({ authenticated }) => {
  return authenticated === true ? <Navigate replace to="/" /> : <Outlet />;
};

// const mapStateToProps = connect(state => ({
//     isAuthenticated: state.user.isAuthenticated
// }))(AuthRoute);
// export default mapStateToProps;

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
