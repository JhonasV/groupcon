import React, { useEffect, useState } from "react";

// import CardUserInfo from "../../components/Dashboard/CardUserInfo";
import { getCurrentUser } from "../../Helpers/auth-helper";
import GroupList from "../../components/Group/GroupList/GroupList";
import { Link } from "react-router-dom";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../../components/Alert";

const Dashboard = ({ location, history }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [getGroups, setGroups] = useState({
    groups: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getCurrentUserAsync = async () => {
      setLoading(true);
      let user = await getCurrentUser();
      setCurrentUser(user ? user : false);
      await getAllGroups(user ? user.id : null);
      setLoading(false);
    };

    getCurrentUserAsync();
    if (message === "") {
      setMessage(location.state ? location.state.message : "");
    } else {
      history.replace();
    }
  }, [location.state, history, message]);

  const getAllGroups = async currentUserId => {
    if (currentUserId === null) return;
    let response = await Axios(`/api/v1/${currentUserId}/groups`);
    if (response.status === 200) setGroups({ groups: response.data });
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card">
            <div className="card-header bg-warning">
              <h1 className="text-white">Delete Warning!</h1>
            </div>
            <div className="card-body">
              <p>Are you sure to do this?</p>
            </div>
            <div className="card-footer bg-warning">
              <button
                disabled={loading}
                className="btn btn-secondary"
                onClick={onClose}
              >
                No
              </button>
              <button
                disabled={loading}
                className="btn btn-primary"
                onClick={async () => {
                  await deleteGroup(id);
                  onClose();
                }}
              >
                {loading ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        );
      }
    });
  };
  const deleteGroup = async id => {
    setLoading(true);
    let response = await Axios.delete(`/api/v1/group/${id}`);
    if (response.status === 200) {
      setMessage("Group deleted succesfully!");
      await getAllGroups(currentUser ? currentUser.id : null);
    } else {
      setMessage(response.data);
    }
    setLoading(false);
  };

  const renderGroups = () => {
    return getGroups.groups.length !== 0 ? (
      <GroupList
        groups={getGroups.groups}
        onDelete={onDelete}
        currentUserId={currentUser ? currentUser.id : ""}
      />
    ) : (
      <div className="card col-sm-12 col-md-6 col-lg-6 bg-secondary ml-auto mr-auto">
        <div className="card-body">
          <h3 className="text-primary text-center">
            You don't have any group created yet!
          </h3>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div className="row mt-2">
        <Alert message={message} type={"success"} />
      </div>
      <div className="row mt-2">
        {/* <div className="col-md-2 col-lg-2 col-sm-2  ">
          <CardUserInfo user={currentUser} />
        </div> */}
        <div className="col-md-12 col-sm-12">
          <Link to="/dashboard/create" className="btn btn-primary mb-2">
            {" "}
            <i className="fa fa-plus"></i> New
          </Link>

          <div className="alert bg-primary">
            <h3>Your groups!</h3>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center ">
              <div className="spinner-border mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            renderGroups()
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
