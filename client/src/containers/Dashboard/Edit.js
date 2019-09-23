import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm/CreateGroupForm";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Edit = props => {
  const [group, setGroup] = useState({ name: "", url: "", _id: "", user: "" });
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let groupId = props.location.state.id;

    const fetchGroupAsync = async groupId => await fetchGroup(groupId);
    fetchGroupAsync(groupId);
  }, [props.location.state.id]);

  const fetchGroup = async id => {
    setLoading(true);
    let response = await Axios.get(`/api/v1/${id}/group`);
    if (response.status === 200) {
      setGroup(response.data);
    } else {
    }
    setLoading(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card">
            <div className="card-header">
              <h1>Update Warning!</h1>
            </div>
            <div className="card-body">
              <p>Are you sure to do this?</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                No
              </button>
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
      }
    });
  };

  const onChange = e => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const updateGroup = async () => {
    setLoading(true);
    try {
      let response = await Axios.put(`/api/v1/${group._id}/group`, {
        name: group.name,
        url: group.url,
        _id: group._id
      });
      if (response.status === 200) {
        setRedirect(true);
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setLoading(false);
  };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { message: `Group modified succesfully` }
        }}
      />
    );
  }

  return (
    <div className="row mt-1">
      <div className="col-md-8 ml-auto mr-auto">
        {message !== "" ? (
          <div className={"alert alert-danger"}>
            <h4>{message.toUpperCase()}</h4>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="col-md-12">
        <CreateGroupForm
          group={group}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Edit;
