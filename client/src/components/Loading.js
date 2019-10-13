import React from "react";

const Loading = props => (
  <div {...props}>
    <div className={`spinner-border`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loading;
