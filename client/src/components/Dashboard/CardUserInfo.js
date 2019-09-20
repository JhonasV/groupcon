import React from "react";

const CardUserInfo = ({ user }) => {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4>User Information</h4>
      </div>
      <div className="card-body">
        <p>Email: {user ? user.email : "loading"}</p>
        <br />
        <p>NickName: {user ? user.nickname : "loading"}</p>
      </div>
    </div>
  );
};

export default CardUserInfo;
