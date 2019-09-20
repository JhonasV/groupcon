import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard/Dashboard";
import Create from "./containers/Dashboard/Create";
import Edit from "./containers/Dashboard/Edit";
import { getCurrentUser, initAxiosInterceptors } from "./Helpers/auth-helper";
initAxiosInterceptors();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const saveCurrentUser = async () => {
      let currentUser = await getCurrentUser();
      setCurrentUser(currentUser ? currentUser : false);
    };
    saveCurrentUser();
  }, []);

  const AutenticatedRoutes = () => (
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />

      <Route
        path="/dashboard"
        exact
        render={props => <Dashboard {...props} />}
      />
      <Route
        path="/dashboard/create"
        exact
        render={props => <Create {...props} />}
      />
      <Route
        path="/dashboard/edit"
        exact
        render={props => <Edit {...props} />}
      />
    </Switch>
  );

  const GuessRoutes = () => (
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/register" exact render={props => <Register {...props} />} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <Layout currentUser={currentUser}>
        {currentUser ? <AutenticatedRoutes /> : <GuessRoutes />}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
