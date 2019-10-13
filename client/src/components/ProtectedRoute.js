import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ Component, path, currentUser }) => {
  const renderRoute = () => {
    switch (currentUser) {
      case null:
        console.log("[ProtectedRoute.js null case]", currentUser);
        return;
      case false:
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { urlRedirectAfterLogin: path }
            }}
          />
        );
      default:
        return (
          <Route path={path} exact render={props => <Component {...props} />} />
        );
    }
  };

  return renderRoute();
};
export default ProtectedRoute;
