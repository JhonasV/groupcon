import React from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, currentUser }) => (
  <>
    <header>
      <Navbar currentUser={currentUser} />
    </header>
    <main className="container">{children}</main>
    <div className="fixed-bottom">
      <Footer />
    </div>
  </>
);

export default Layout;
