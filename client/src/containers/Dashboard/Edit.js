import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Alert from "../../components/Alert";

const Edit = (props) => {
  const [group, setGroup] = useState({
    name: "",
    url: "",
    _id: "",
    user: "",
    password: "",
    confirmPassword: "",
    newPassword: "",
  });
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let groupId = props.location.state.id;
    const fetchGroupAsync = async (groupId) => await fetchGroup(groupId);
    fetchGroupAsync(groupId);
  }, [props.location.state.id]);

  const fetchGroup = async (id) => {
    setLoading(true);
    let response = await Axios.get(`/api/v1/${id}/group`);
    if (response.status === 200) {
      setGroup(response.data);
      setChecked(response.data.private);
    } else {
    }
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card">
            <div className="card-header bg-warning">
              <h3 className="text-white">
                <i className="fa fa-warning"></i>Update Warning!
              </h3>
            </div>
            <div className="card-body">
              <h4>Are you sure to do this?</h4>
            </div>
            <div className="card-footer bg-warning">
              <button className="btn btn-secondary" onClick={onClose}>
                No
              </button>{" "}
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await updateGroup();
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const onChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const updateGroup = async () => {
    setLoading(true);
    console.log(group);
    console.log(group.password, group.oldPassword, group.confirmPassword);
    try {
      setMessage("");

      if (group.passoword && group.confirmPassword && group.oldPassword) {
        if (
          group.password.length > 0 &&
          group.confirmPassword.length > 0 &&
          group.oldPassword.length === 0
        ) {
          setMessage("The old password field is required");
        }

        if (group.password !== group.confirmPassword) {
          setMessage("The password and confirm group does'nt match");
          return;
        }

        if (group.confirmPassword.length > 0 && group.password.length === 0) {
          setMessage("The confirm password field is required");
          return;
        }
      }

      let response = await Axios.put(`/api/v1/${group._id}/group`, {
        name: group.name,
        url: group.url,
        _id: group._id,
        password: group.password ? group.password : "",
      });

      if (response.status === 200) {
        setRedirect(true);
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error);
    }
    setLoading(false);
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { message: `Group modified succesfully` },
        }}
      />
    );
  }

  return (
    <div className="row mt-1">
      <div className="col-md-8 ml-auto mr-auto">
        <Alert message={message} />
      </div>
      <div className="col-md-12">
        <CreateGroupForm
          group={group}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={loading}
          checked={checked}
          setChecked={setChecked}
        />
      </div>
    </div>
  );
};

export default Edit;
