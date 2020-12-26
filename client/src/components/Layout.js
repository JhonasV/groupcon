import React from "react";

import Navbar from "./Navbar";


const Layout = ({ children, currentUser }) => (
  <>
    <header>
      <Navbar currentUser={currentUser} />
    </header>
    <main className="container">{children}</main>
  </>
);

export default Layout;
