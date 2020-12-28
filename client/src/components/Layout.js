import React from "react";

import Navbar from "./Navbar";


const Layout = ({ children }) => (
  <>
    <header>
      <Navbar />
    </header>
    <main className="container">{children}</main>
  </>
);

export default Layout;
