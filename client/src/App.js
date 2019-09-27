import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard/Dashboard";
import Create from "./containers/Dashboard/Create";
import Edit from "./containers/Dashboard/Edit";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import { getCurrentUser, initAxiosInterceptors } from "./Helpers/auth-helper";
initAxiosInterceptors();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getCurrentUserAync = async () => {
      let currentUser = await getCurrentUser();
      setCurrentUser(currentUser ? currentUser : false);
    };
    getCurrentUserAync();
  }, []);

  const validateAuthRoutes = (
    ComponentToRender, //Component itself
    pathToRender, //Component pathroute
    currentUser, //CurrentUser Authenticated
    props, // React Router props
    redirectPath = "/login"
  ) => {
    //This method validate if not exists a user connected
    //in that case we redirect the user to the Login page with
    //the path for the component that tried access, when get log in
    //the user is redirect to the path that he tried to access.
    return currentUser === false ? (
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

  const validateGuessRoutes = (ComponentToRender, currentUser, props) => {
    //This method validate if exists a connected user, in that case, while
    //the user is authenticated and tried to go to Login or Register
    //we redirect him to the Home page.

    return currentUser ? (
      <Redirect to={"/"} />
    ) : (
      <ComponentToRender {...props} />
    );
  };

  const Routes = () => (
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route
        path="/dashboard"
        exact
        render={props =>
          validateAuthRoutes(Dashboard, "/dashboard", currentUser, {
            ...props,
            currentUser
          })
        }
      />
      <Route
        path="/dashboard/create"
        exact
        render={props =>
          validateAuthRoutes(Create, "/dashboard/create", currentUser, props)
        }
      />
      <Route
        path="/dashboard/edit"
        exact
        render={props =>
          validateAuthRoutes(Edit, "/dashboard", currentUser, props)
        }
      />
      <Route
        path="/login"
        exact
        render={props => validateGuessRoutes(Login, currentUser, props)}
      />

      <Route
        path="/register"
        exact
        render={props => validateGuessRoutes(Register, currentUser, props)}
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
      <Layout currentUser={currentUser}>{renderRoutes()}</Layout>
    </BrowserRouter>
  );
}

export default App;
