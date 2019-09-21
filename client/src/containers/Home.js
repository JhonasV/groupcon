import React, { useState, useEffect } from "react";
import SearchGroupForm from "../components/SearchGroup/SearchGroupForm";
import GroupList from "../components/Group/GroupList/GroupList";
import Axios from "axios";
const Home = () => {
  const [values, setValues] = useState({ name: "", filteredGroups: [] });
  const [getGroups, setGroups] = useState({
    groups: [{ _id: "", name: "", url: "" }]
  });
  const onChange = e => {
    setValues({ [e.target.name]: e.target.value });
    showGroups(e.target.value);
  };

  const showGroups = name => {
    let filteredGroups = name !== "" ? getFilteredList(name) : [];
    setValues({ ...values, filteredGroups });
  };

  const getFilteredList = query => {
    return getGroups.groups.filter(e =>
      e.name.toUpperCase().includes(query.toUpperCase())
    );
  };

  useEffect(() => {
    const getGroupsAsync = async () => await getAllGroups();
    getGroupsAsync();
  }, []);

  const getAllGroups = async () => {
    let response = await Axios.get(`/api/v1/group`);
    console.log(response);
    setGroups({ groups: response.data });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (values.name === "") return;

    showGroups(values.name);
  };

  return (
    <main>
      <div className="row mt-3">
        <div className="col-12">
          <SearchGroupForm onChange={onChange} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <GroupList groups={values.filteredGroups} />
        </div>
      </div>
    </main>
  );
};

export default Home;
