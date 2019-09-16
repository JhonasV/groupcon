import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact render={props => <Home {...props} />} />
        <Route path="/login" exact render={props => <Login {...props} />} />
        <Route
          path="/register"
          exact
          render={props => <Register {...props} />}
        />
        <Route
          path="/dashboard/:email"
          exact
          render={props => <Dashboard {...props} />}
        />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
