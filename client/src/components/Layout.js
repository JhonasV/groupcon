import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div>
    <div>
      <Navbar />
    </div>
    <div className="container">{children}</div>
    <div className="fixed-bottom">
      <Footer />
    </div>
  </div>
);

export default Layout;
