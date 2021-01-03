import React, { useEffect, useState } from "react";
import Axios from "axios";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import UpdatePasswordModal from "../../components/UpdatePasswordModal";
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
    private: false
  });

  

  const [updateModalLoading, setUpdateModalLoading] = useState(false);
  const [updateModalMessage, setUpdateModalMessage] = useState({message: '', type: ''});

  const [groupOldInfo, setGroupOldInfo] = useState({
    name: "",
    url: "",
    _id: "",
    user: "",
    password: "",
    private: false
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
      setGroupOldInfo(response.data);
      setChecked(response.data.private);
    } else {
    }
    setLoading(false);
  };

  const onSubmitPasswordUpdate = async (e) =>{
    e.preventDefault();
    if( group.password && group.password.length === 0){
      setUpdateModalMessage({message: 'Current password is required!'});
      return;
    }

    if(group.password !== groupOldInfo.password){
      setUpdateModalMessage({message:'The current password is wrong!'});
      return;
    }

    if(group.newPassword && group.newPassword.length === 0){
      setUpdateModalMessage({message:'The new password is required!'});
      return;
    }

    if(group.confirmPassword && group.confirmPassword.length === 0){
      setUpdateModalMessage({message:'The confirmation password is required!'});
      return;
    }

    if(group.confirmPassword !== group.newPassword){
      setUpdateModalMessage({message:"The new password confirmation doesn't match"});
      return;
    }

    setUpdateModalLoading(true);
    
    try {
      let response = await Axios.put(`/api/v1/${group._id}/group`, {
        name: group.name,
        url: group.url,
        _id: group._id,
        password: group.password ? group.password : "",
      });

      if (response.status === 200) {
        // setRedirect(true);
        setUpdateModalMessage({message:"The password was updated succesfully!"});
      } else {
        setUpdateModalMessage(response.data.error);
      }
    } catch (error) {
      setUpdateModalMessage(error.response.data.error);
    }
    setUpdateModalLoading(false);
    
  }

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
    console.log([e.target.name], e.target.value);
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const updateGroup = async () => {
    setLoading(true);
    console.log(group);
    console.log(group.password, group.oldPassword, group.confirmPassword);
    try {
      setMessage("");
      if(group.private && checked){
        //Validate current password, new password and confirm new password

        //Validate if password field is empty
          if(group.password && group.password.length === 0){
            setMessage("The old password is required");
            return;
          }
          
          //Validate if the current password field value is the correct
          if(groupOldInfo.password !== group.password){
            setMessage("The current password is incorrect");
            return;
          }
          
          //Validate if new password field is empty
          if(group.newPassword && group.newPassword.length === 0){
            setMessage("The new password is required");
            return;
          }

          //Validate if current password and the new password are different
          if(groupOldInfo.password === group.newPassword){
            setMessage("The new password and the current password must be different");
            return;
          }

          //Validate if confirm password field is empty
          if(group.confirmPassword && group.confirmPassword.length === 0){
            setMessage("The confirmation password is required");
            return;
          }

          //Validate if confirm password field value and new password field value are the same
          if(group.confirmPassword !== group.newPassword){
            setMessage("The confirmation password and new password doesn't match");
            return;
          }
      }else{
        
      }
      console.log('Group with new data', group);
      console.log('Group all data', groupOldInfo);
      return;
      // if (group.passoword && group.confirmPassword && group.oldPassword) {
      //   if (
      //     group.password.length > 0 &&
      //     group.confirmPassword.length > 0 &&
      //     group.oldPassword.length === 0
      //   ) {
      //     setMessage("The old password field is required");
      //   }

      //   if (group.password !== group.confirmPassword) {
      //     setMessage("The password and confirm group does'nt match");
      //     return;
      //   }

      //   if (group.confirmPassword.length > 0 && group.password.length === 0) {
      //     setMessage("The confirm password field is required");
      //     return;
      //   }
      // }

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
      <UpdatePasswordModal 
        onChange={onChange} 
        group={group} 
        loading={updateModalLoading}
        onSubmit={onSubmitPasswordUpdate}
        modalMessage={updateModalMessage}
      />
    </div>
  );
};

export default Edit;
