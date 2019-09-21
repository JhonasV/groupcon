import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="row mt-5">
        <div className="col-sm-12 col-md-6 col-lg-6 ml-auto mr-auto">
          <div className="card">
            <div className="card-header bg-primary">
              <h2 className="text-white text-center">404 - Page Not Found</h2>
            </div>
            <div className="card-footer bg-primary  text-center">
              <a href="/" className="text-white">
                {" "}
                <h3>Click here to go Home</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
