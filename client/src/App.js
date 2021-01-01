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
import { fetchCurrentUser } from './store/actions/authActions';

import { useDispatch, useSelector } from 'react-redux';

initAxiosInterceptors();

function App() {

  const { isAuthenticated, currentUser } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);


  const validateAuthRoutes = (
    ComponentToRender, //Component itself
    pathToRender, //Component pathroute
    isAuthenticated, //CurrentUser Authenticated
    props, // React Router props
    redirectPath = "/login"
  ) => {
    //This method validate if not exists a user connected
    //in that case we redirect the user to the Login page with
    //the path for the component that tried access, when get log in
    //the user is redirect to the path that he tried to access.
    return !isAuthenticated ? (
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

  const validateGuessRoutes = (ComponentToRender, isAuthenticated, props) => {
    //This method validate if exists a connected user, in that case, while
    //the user is authenticated and tried to go to Login or Register
    //we redirect him to the Home page.

    return isAuthenticated ? (
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
          validateAuthRoutes(Dashboard, "/dashboard", isAuthenticated, {
            ...props,
            isAuthenticated
          })
        }
      />

      <Route
        path="/dashboard/create"
        exact
        render={props =>
          validateAuthRoutes(Create, "/dashboard/create", isAuthenticated, props)
        }
      />
      <Route
        path="/dashboard/edit"
        exact
        render={props =>
          validateAuthRoutes(Edit, "/dashboard", isAuthenticated, props)
        }
      />
      <Route
        path="/login"
        exact
        render={props => validateGuessRoutes(Login, isAuthenticated, props)}
      />

      <Route
        path="/register"
        exact
        render={props => validateGuessRoutes(Register, isAuthenticated, props)}
      />
      <Route
        path="/forgotten"
        exact
        render={props =>
          validateGuessRoutes(ForgottenPassword, isAuthenticated, props)
        }
      />

      <Route
        path="/forgotten/recover/:code/:email"
        exact
        render={props =>
          validateGuessRoutes(ForgottenChange, isAuthenticated, props)
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

export default App;
