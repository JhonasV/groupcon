import React, { useEffect, useState } from "react";
import GroupList from "../../components/Group/GroupList/GroupList";
import { Link } from "react-router-dom";
import Axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../../components/Alert";

import * as action from "../../actions";
import { connect } from "react-redux";

const Dashboard = ({
  location,
  history,
  currentUser,
  deleteGroup,
  getUserGroups,
  pending,
  removed,
  userGroups
}) => {
  const [getGroups, setGroups] = useState({
    groups: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ details: "", type: "" });
  useEffect(() => {
    const getGroups = async () => {
      await getAllGroups(currentUser ? currentUser.id : null);
    };

    getGroups();

    if (message.details === "") {
      setMessage({
        details: location.state ? location.state.message : "",
        type: "success"
      });
    } else {
      history.replace();
    }
  }, [location.state, history, message.details, currentUser]);

  const getAllGroups = async currentUserId => {
    if (currentUserId === null) return;
    setLoading(true);
    let response = await Axios(`/api/v1/${currentUserId}/groups`);
    if (response.status === 200) setGroups({ groups: response.data });
    setLoading(false);
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card">
            <div className="card-header bg-warning">
              <h3 className="text-white">
                <i className="fa fa-warning"></i> Delete Warning!
              </h3>
            </div>
            <div className="card-body">
              <h4>Are you sure to do this?</h4>
            </div>
            <div className="card-footer bg-warning">
              <button
                disabled={loading}
                className="btn btn-secondary"
                onClick={onClose}
              >
                No
              </button>{" "}
              <button
                disabled={loading}
                className="btn btn-primary"
                onClick={() => {
                  deleteGroupHandle(id);
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
  const deleteGroupHandle = id => {
    setLoading(pending);

    deleteGroup(id);
    if (removed) {
      let groupsFiltered = getGroups.groups.filter(g => g._id !== id);
      setGroups({ groups: groupsFiltered });
      setMessage({ details: "Group deleted succesfully!", type: "success" });
    }

    setLoading(pending);
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
        <Alert message={message.details} type={message.type} />
      </div>
      <div className="row mt-2">
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
const mapStateToProps = state => {
  return {
    removed: state.groupReducer.deleted,
    pending: state.groupReducer.pending,
    userGroups: state.groupReducer.userGroups
  };
};

export default connect(
  mapStateToProps,
  action
)(Dashboard);
