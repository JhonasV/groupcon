import React, { useState } from "react";
import Axios from "axios";
import EmailModal from "../../EmailModal";
import GroupPasswordModal from "../../GroupPasswordModal";
import QRModal from "../../QRModal";
import GroupCard from "../GroupCard/GroupCard";
import UnlockedGroupModal from "../../UnlockedGroupModal";

const GroupList = ({ groups, currentUserId, onDelete }) => {
  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState({
    message: "",
    type: ""
  });
  const [password, setPassword] = useState("");
  const [passwordResponse, setPasswordResponse] = useState({
    message: "",
    type: ""
  });
  const [groupUnlock, setGroupUnlock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const onModalOpen = id => {
    localStorage.setItem("GROUP", id);
  };

  const sendInviteLinkEmail = async e => {
    e.preventDefault();

    let groupId = localStorage.getItem("GROUP");
    if (!groupId) {
      setEmailResponse({
        message: "We couldn't send the mail, try later.",
        type: "danger"
      });
      return;
    }

    setEmailResponse({ message: "", type: "" });
    if (email === "") return;
    setLoading(true);
    try {
      let response = await Axios.post("/api/v1/group/mail", {
        groupId,
        toEmail: email
      });

      if (response.status === 200) {
        setEmailResponse({ message: response.data, type: "success" });
        setEmail("");
      } else {
        setEmailResponse({ message: response.data.error, type: "warning" });
      }
    } catch (error) {
      setEmailResponse({
        message: "We couldn't send the mail, try later.",
        type: "danger"
      });
    }
    localStorage.removeItem("GROUP");
    setLoading(false);
  };

  const unlockGroup = async (e, cb) => {
    e.preventDefault();

    //1. Create request object
    //...
    let groupId = localStorage.getItem("GROUP");
    if (!groupId) return;
    let passwordRequest = {
      groupId,
      password
    };
    //2. Send request
    //...
    try {
      let response = await Axios.post("/api/v1/group/unlock", passwordRequest);
      //3. Manage response
      //...
      if (response.status === 200) {
        cb(response.data);
      } else {
        setPasswordResponse({ message: "Password wrong", type: "warning" });
        cb(null);
      }
    } catch (error) {
      setPasswordResponse({
        message: "We couldn't send the request, try later.",
        type: "danger"
      });
      cb(null);
    }
    setPassword("");
    setLoading(false);
  };

  const renderGroupList = group => {
    let editable = group.user === currentUserId;
    return (
      <div key={group._id} className="col-md-6 col-sm-12 col-lg-4 mb-3 ">
        <GroupCard
          currentUserId={currentUserId}
          groupCreator={group.user}
          onDelete={onDelete}
          key={group._id}
          id={group._id}
          password={group.password}
          name={group.name}
          url={group.url}
          editable={editable}
          onModalOpen={onModalOpen}
          setUrl={setUrl}
          privateGroup={group.private}
        />
      </div>
    );
  };
  return (
    <div className="row mt-3 mb-5">
      {groups ? groups.map(group => renderGroupList(group)) : null}
      <EmailModal
        email={email}
        setEmail={setEmail}
        loading={loading}
        onSubmit={sendInviteLinkEmail}
        emailSendResponse={emailResponse}
        setEmailResponse={setEmailResponse}
      />
      <QRModal url={url} />

      <GroupPasswordModal
        password={password}
        setPassword={setPassword}
        loading={loading}
        onSubmit={unlockGroup}
        passwordResponse={passwordResponse}
        setPasswordResponse={setPasswordResponse}
        setGroupUnlock={setGroupUnlock}
        setUrl={setUrl}
        setLoading={setLoading}
      />

      <UnlockedGroupModal
        groupUnlocked={groupUnlock}
        onModalOpen={onModalOpen}
        setUrl={setUrl}
      />
    </div>
  );
};

export default GroupList;
