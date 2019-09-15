import React from "react";

import GroupCard from "../GroupCard/GroupCard";
import { CSSTransition } from "react-transition-group";

const GroupList = ({ groups }) => {
  const renderGroupList = group => {
    return (
      <CSSTransition
        key={group._id}
        in={true}
        appear={true}
        timeout={600}
        classNames="fade"
      >
        <div key={group._id} className="col-md-6 col-sm-1 col-lg-4 mb-3">
          <GroupCard key={group._id} name={group.name} url={group.url} />
        </div>
      </CSSTransition>
    );
  };
  return (
    <div className="row mt-3 mb-5">
      {groups ? groups.map(group => renderGroupList(group)) : null}
    </div>
  );
};

export default GroupList;
