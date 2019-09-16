import React, { useEffect, useState } from "react";

import CardUserInfo from "../components/Dashboard/CardUserInfo";
import { getCurrentUser } from "../Helpers/auth-helper";
import GroupList from "../components/Group/GroupList/GroupList";

const Dashboard = ({ match }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [getGroups, setGroups] = useState({
    groups: []
  });
  useEffect(() => {
    const getCurrentUserAsync = async () => {
      let user = await getCurrentUser();
      setCurrentUser(user ? user : false);
    };

    getCurrentUserAsync();
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    let response = await fetch(
      `http://localhost:3000/api/v1/group/${match.params.email}`
    );
    let groups = await response.json();
    setGroups({ groups });
  };
  return (
    <div className="row mt-5">
      <div className="col-md-2 col-lg-2 col-sm-2  ">
        <CardUserInfo user={currentUser} />
      </div>
      <div className="col-md-10">
        <div className="alert bg-primary">
          <h3>Your groups!</h3>
        </div>
        <GroupList groups={getGroups.groups} />
      </div>
    </div>
  );
};

export default Dashboard;
