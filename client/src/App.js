import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard/Dashboard";
import Create from "./containers/Dashboard/Create";
import Edit from "./containers/Dashboard/Edit";
import NotFound from "./components/NotFound";
import ForgottenPassword from "./containers/Forgotten/ForgottenPassword";
import ForgottenChange from "./containers/Forgotten/ForgottenChange";

import { initAxiosInterceptors } from "./Helpers/auth-helper";
import Loading from "./components/Loading";

// actions
import { fetchCurrentUser } from './actions/authActions';

import { connect } from "react-redux";

initAxiosInterceptors();

function App({ fetchCurrentUser, currentUser, isAuthenticanted }) {


  useEffect(() => {

    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const validateAuthRoutes = (
    ComponentToRender, //Component itself
    pathToRender, //Component pathroute
    isAuthenticanted, //CurrentUser Authenticated
    props, // React Router props
    redirectPath = "/login"
  ) => {
    //This method validate if not exists a user connected
    //in that case we redirect the user to the Login page with
    //the path for the component that tried access, when get log in
    //the user is redirect to the path that he tried to access.
    return !isAuthenticanted ? (
      <Redirect
        {...props}
        to={{
          pathname: redirectPath,
          state: { urlRedirectAfterLogin: pathToRender }
        }}
      />
    ) : (
      <ComponentToRender {...props} />
    );
  };

  const validateGuessRoutes = (ComponentToRender, isAuthenticanted, props) => {
    //This method validate if exists a connected user, in that case, while
    //the user is authenticated and tried to go to Login or Register
    //we redirect him to the Home page.

    return isAuthenticanted ? (
      <Redirect to={"/"} />
    ) : (
      <ComponentToRender {...props} />
    );
  };

  const Routes = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/dashboard"
        exact
        render={props =>
          validateAuthRoutes(Dashboard, "/dashboard", isAuthenticanted, {
            ...props,
            isAuthenticanted
          })
        }
      />

      <Route
        path="/dashboard/create"
        exact
        render={props =>
          validateAuthRoutes(Create, "/dashboard/create", isAuthenticanted, props)
        }
      />
      <Route
        path="/dashboard/edit"
        exact
        render={props =>
          validateAuthRoutes(Edit, "/dashboard", isAuthenticanted, props)
        }
      />
      <Route
        path="/login"
        exact
        render={props => validateGuessRoutes(Login, isAuthenticanted, props)}
      />

      <Route
        path="/register"
        exact
        render={props => validateGuessRoutes(Register, isAuthenticanted, props)}
      />
      <Route
        path="/forgotten"
        exact
        render={props =>
          validateGuessRoutes(ForgottenPassword, isAuthenticanted, props)
        }
      />

      <Route
        path="/forgotten/recover/:code/:email"
        exact
        render={props =>
          validateGuessRoutes(ForgottenChange, isAuthenticanted, props)
        }
      />

      <Route component={NotFound} />
    </Switch>
  );

  const renderRoutes = () => {
    switch (currentUser) {
      case null:
        return <Loading className="d-flex justify-content-center mt-5" />;
      default:
        return <Routes />;
    }
  };

  return (
    <BrowserRouter>
      <Layout >{renderRoutes()}</Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {

    currentUser: state.authReducer.currentUser,
    isAuthenticanted: state.authReducer.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: () => fetchCurrentUser()(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
