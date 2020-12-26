import React from "react";

import style from "./footer.module.css";
const Footer = () => (
  // <!-- Footer -->
  <footer className={`${style.footer} text-center py-3 bg-primary mt-5`}>
    {/* <!-- Copyright --> */}
    <div className="footer-copyright ">
      <h4>
        Created by {" "}
        <a className="text-white" href="https://github.com/JhonasV">
          Jhonas Veras
        </a>
      </h4>
    </div>
    {/* <!-- Copyright --> */}
  </footer>
);

export default Footer;
