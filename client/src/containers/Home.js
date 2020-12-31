import React, { useState, useEffect } from "react";
// components
import SearchGroupForm from "../components/SearchGroup/SearchGroupForm";
import GroupList from "../components/Group/GroupList/GroupList";
import Loading from "../components/Loading";

import * as action from "../actions";
import { connect } from "react-redux";
const Home = ({ groups, fetchGroups, pending, latestGroups }) => {
  const [values, setValues] = useState({
    filteredGroups: [],
    latestGroups: []
  });

  const [groupName, setGroupName] = useState("");


  useEffect(() => {
    fetchGroups();
  }, [] )

  const onChange = e => {
    setGroupName(e.target.value);
    showGroups(e.target.value);
  };

  const showGroups = name => {
    let filteredGroups = name !== "" ? getFilteredList(name) : [];
    setValues({ ...values, filteredGroups });
  };

  const getFilteredList = query => {
    return groups.filter(e =>
      e.name.toUpperCase().includes(query.toUpperCase())
    );
  };



  const onSubmit = e => {
    e.preventDefault();

    if (values.name === "") return;
    showGroups(values.name);
  };
  return (
    <main>
      <div className="row mt-3">
        <div className="col">
          <SearchGroupForm
            setGroupName={setGroupName}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mr-auto ml-auto">
          <h3 className="font-weight-bold mt-2">
            {values.filteredGroups.length || groupName.length > 0
              ? `Search results: ${values.filteredGroups.length}`
              : "Latest groups added"}
          </h3>
          {pending ? (
            <Loading className="d-flex justify-content-center" />
          ) : (
            <GroupList
              groups={
                values.filteredGroups.length || groupName.length > 0
                  ? values.filteredGroups
                  : latestGroups
              }
            />
          )}
        </div>
      </div>
    </main>
  );
};
const mapStateToProps = state => {
  return {
    pending: state.groupReducer.pending,
    groups: state.groupReducer.groups,
    latestGroups: state.groupReducer.latestGroups
  };
};

export default connect(
  mapStateToProps,
  action
)(Home);
