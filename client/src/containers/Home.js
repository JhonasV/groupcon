import React, { useState, useEffect } from "react";
import SearchGroupForm from "../components/SearchGroup/SearchGroupForm";
import GroupList from "../components/Group/GroupList/GroupList";
import Axios from "axios";
import Alert from "../components/Alert";

const Home = () => {
  const [values, setValues] = useState({
    filteredGroups: [],
    latestGroups: []
  });

  const [message, setMessage] = useState("");

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
    const getAsync = async () => await getAllGroups();
    getAsync();
  }, []);

  const getAllGroups = async () => {
    let response = await Axios.get("/api/v1/group");
    if (response.status === 200) {
      setGroups({ groups: response.data.groups });
      setValues({ ...values, latestGroups: response.data.latestGroups });
    } else {
      setMessage("Error trying to load the groups, try again later");
    }

    setLoading(false);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (values.name === "") return;
    showGroups(values.name);
  };
  return (
    <main>
      <div className="row mt-3">
        <Alert message={message} />
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
            <GroupList
              groups={
                values.filteredGroups.length || groupName.length > 0
                  ? values.filteredGroups
                  : values.latestGroups
              }
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
