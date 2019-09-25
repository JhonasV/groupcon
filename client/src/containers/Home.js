import React, { useState, useEffect } from "react";
import SearchGroupForm from "../components/SearchGroup/SearchGroupForm";
import GroupList from "../components/Group/GroupList/GroupList";
import Axios from "axios";
const Home = () => {
  const [values, setValues] = useState({
    filteredGroups: [],
    latestGroups: []
  });

  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState("");

  const [getGroups, setGroups] = useState({
    groups: [{ _id: "", name: "", url: "" }]
  });

  const onChange = e => {
    setGroupName(e.target.value);
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
    getAllGroups();
    getLatestGroups();
  }, []);

  const getLatestGroups = () => {
    setLoading(true);
    Axios.get("/api/v1/groups/latest")
      .then(res => setValues({ ...values, latestGroups: res.data }))
      .catch(err => console.error(err));
    setLoading(false);
  };

  const getAllGroups = () => {
    Axios.get(`/api/v1/group`)
      .then(res => setGroups({ groups: res.data }))
      .catch(err => console.error(err));
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
          {loading ? (
            <div className="d-flex justify-content-center ">
              <div className="spinner-border mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <GroupList
                groups={
                  values.filteredGroups.length || groupName.length > 0
                    ? values.filteredGroups
                    : values.latestGroups
                }
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
