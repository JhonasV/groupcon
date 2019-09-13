import React, { useState, useEffect } from "react";
import SearchGroupForm from "../components/SearchGroup/SearchGroupForm";
import GroupList from "../components/Group/GroupList/GroupList";

const Home = () => {
  const [values, setValues] = useState({ name: "", groups: [] });
  const [getGroups, setGroups] = useState({ groups: [] });
  const onChange = e => {
    setValues({ [e.target.name]: e.target.value });
  };
  const getAllGroups = async () => {
    let response = await fetch(`http://localhost:3000/api/v1/group`);

    let groups = await response.json();
    console.log(groups);
    // setValues({ ...values, groups });
    setGroups({ groups });
  };
  useEffect(() => {
    console.log("values ", values);
    getAllGroups();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    if (values.name === "") return;
    let groupToShow = getGroups.groups.find(
      g => g.name.toUpperCase() === values.name.toUpperCase()
    );
    let newArray = [];

    newArray.push(groupToShow);
    setValues({ ...values, groups: newArray });
  };

  return (
    <main>
      <div className="row">
        <div className="col-12">
          <SearchGroupForm onChange={onChange} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-12">
          <GroupList groups={values.groups} />
        </div>
      </div>
    </main>
  );
};

export default Home;
