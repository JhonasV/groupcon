import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./containers/Home";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact render={props => <Home {...props} />} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
