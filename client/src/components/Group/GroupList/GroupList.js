import React, { useState } from "react";
import Axios from "axios";
import EmailModal from "../../EmailModal";
import GroupCard from "../GroupCard/GroupCard";
// import { CSSTransition } from "react-transition-group";

const GroupList = ({ groups, currentUserId, onDelete }) => {
  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const sendInviteLinkEmail = async (e, name, url) => {
    e.preventDefault();
    setEmailResponse({ message: "", type: "" });
    if (email === "") return;
    setLoading(true);
    try {
      let response = await Axios.post("/api/v1/group/mail", {
        toEmail: email,
        inviteUrl: url,
        groupName: name
      });

      if (response.status === 200) {
        setEmailResponse({ message: response.data, type: "success" });
      } else {
        setEmailResponse({ message: response.data.error, type: "warning" });
      }
    } catch (error) {
      setEmailResponse({ message: error.response.data.error, type: "danger" });
    }

    setLoading(false);
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
        />
        <EmailModal
          setEmail={setEmail}
          loading={loading}
          onSubmit={e => sendInviteLinkEmail(e, group.name, group.url)}
          emailSendResponse={emailResponse}
        />
      </div>
    );
  };
  return (
    <div className="row mt-3 mb-5">
      {groups ? groups.map(group => renderGroupList(group)) : null}
    </div>
  );
};

export default GroupList;
