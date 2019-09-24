import React, { useState } from "react";
import Axios from "axios";
import EmailModal from "../../EmailModal";
import QRModal from "../../QRModal";
import GroupCard from "../GroupCard/GroupCard";

const GroupList = ({ groups, currentUserId, onDelete }) => {
  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState({ message: "", type: "" });
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
    setEmail("");
  };

  const renderGroupList = group => {
    let editable = group.user === currentUserId;
    return (
      <div key={group._id} className="col-md-6 col-sm-12 col-lg-4 mb-5">
        <GroupCard
          onDelete={onDelete}
          key={group._id}
          id={group._id}
          password={group.password}
          name={group.name}
          url={group.url}
          editable={editable}
          onModalOpen={onModalOpen}
          setUrl={setUrl}
        />
      </div>
    );
  };
  return (
    <div className="row mt-3 mb-5">
      {groups ? groups.map(group => renderGroupList(group)) : null}
      <EmailModal
        setEmail={setEmail}
        loading={loading}
        onSubmit={sendInviteLinkEmail}
        emailSendResponse={emailResponse}
      />
      <QRModal url={url} />
    </div>
  );
};

export default GroupList;
