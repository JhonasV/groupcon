import React from "react";

import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <div>
    <div>
      <Navbar />
    </div>
    <div className="container">{children}</div>
  </div>
);

export default Layout;
