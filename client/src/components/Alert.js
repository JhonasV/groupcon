import React from "react";

const Alert = ({ message, type = "danger" }) => {
  return (
    <>
      {message !== "" ? (
        <div className={`w-100 alert alert-${type}`}>
          <h4 className="text-bold">{message.toUpperCase()}</h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Alert;
