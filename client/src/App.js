import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const saveCurrentUser = async () => {
      setLoading(true);
      let currentUser = await getCurrentUser();
      setCurrentUser(currentUser ? currentUser : false);
      setLoading(false);
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
      <Route component={NotFound} />
    </Switch>
  );

  const GuessRoutes = () => (
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/register" exact render={props => <Register {...props} />} />
      <Route component={NotFound} />
    </Switch>
  );
  const correctRoutes = () => {
    return currentUser ? <AutenticatedRoutes /> : <GuessRoutes />;
  };
  return (
    <BrowserRouter>
      <Layout currentUser={currentUser}>
        {loading ? (
          <div className="d-flex justify-content-center ">
            <div className="spinner-border mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          correctRoutes()
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
