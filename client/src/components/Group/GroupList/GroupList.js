import React from "react";

import GroupCard from "../GroupCard/GroupCard";

const GroupList = ({ groups }) => {
  const groupList = [
    {
      name: "React Dominicana",
      url: "https://chat.whatsapp.com/ErGzklqgz8Q1Wjj9BaJTvk"
    },
    {
      name: "Angular Dominicana",
      url: "https://chat.whatsapp.com/ErGzklqgz8Q1Wjj9BaJTvk"
    }
  ];

  return (
    <div className="row mt-5">
      {groups
        ? groups.map(group => {
            return (
              <div key={group._id} className="col-md-6 col-lg-4">
                <GroupCard name={group.name} url={group.url} />{" "}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default GroupList;
