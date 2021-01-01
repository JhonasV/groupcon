import React, { useEffect, useState } from "react";
import GroupList from "../../components/Group/GroupList/GroupList";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Alert from "../../components/Alert";

import * as groupsActions from "../../store/actions/groupsActions";

import { useDispatch, useSelector } from 'react-redux';

const Dashboard = ({
  location,
  history,
}) => {
  const [message, setMessage] = useState({ details: "", type: "" });
 
  const dispatch = useDispatch();
  const { authReducer, groupReducer } = useSelector(state => state);
  const { currentUser } = authReducer;
  const { userGroups, pendingUserGroups } = groupReducer;
  const { getUserGroups, deleteGroup } = groupsActions;

  useEffect(() => {

    dispatch(getUserGroups(currentUser.id));

    if (message.details === "") {
      setMessage({
        details: location.state ? location.state.message : "",
        type: "success"
      });
    } else {
      history.replace();
    }
  }, [location.state, history, message.details, currentUser, getUserGroups, dispatch]);

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
                disabled={pendingUserGroups}
                className="btn btn-secondary"
                onClick={onClose}
              >
                No
              </button>{" "}
              <button
                disabled={pendingUserGroups}
                className="btn btn-primary"
                onClick={() => {
                  deleteGroupHandle(id);
                  onClose();
                }}
              >
                {pendingUserGroups ? (
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
    dispatch(deleteGroup(id));
  };

  const renderGroups = () => {
    return userGroups.length !== 0 ? (
      <GroupList
        groups={userGroups}
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
          {pendingUserGroups ? (
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
