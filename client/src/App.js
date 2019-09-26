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
    ComponentToRender,
    pathToRender,
    currentUser,
    props,
    redirectPath = "/login"
  ) => {
    switch (currentUser) {
      case false:
        return (
          <Redirect
            {...props}
            to={{
              pathname: redirectPath,
              state: { urlRedirectAfterLogin: pathToRender }
            }}
          />
        );
      default:
        return <ComponentToRender {...props} />;
    }
  };

  const validateGuessRoutes = (ComponentToRender, currentUser, props) => {
    console.log(props);
    switch (currentUser) {
      case false:
        return <ComponentToRender {...props} />;
      default:
        return <Redirect to={"/"} />;
    }
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
          validateAuthRoutes(Edit, "/dashboard/edit", currentUser, props)
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
        return (
          <div className="d-flex justify-content-center ">
            <div className="spinner-border mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
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
