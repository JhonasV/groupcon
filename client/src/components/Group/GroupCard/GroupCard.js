import React from "react";
import QRCode from "qrcode.react";
const GroupCard = ({ name, url }) => {
  const groupCardColor = url => {
    let color = url.includes("chat.whatsapp.com") ? "bg-success" : "bg-primary";
    return color;
  };

  const groupCardIcon = url => {
    let icon = url.includes("chat.whatsapp.com") ? "fa-whatsapp" : "";
    return icon;
  };
  return (
    <div className="card">
      <div className={`card-header ${groupCardColor(url)}`}>
        <h3 className="text-white">
          {name} <i className={`fa ${groupCardIcon(url)}`}></i>
        </h3>
      </div>
      <div className="card-body text-center">
        <QRCode size={230} value={url} />
      </div>
      <div className={`card-footer ${groupCardColor(url)}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={url ? url : "#"}
          className="text-white font-weight-bold"
        >
          Direct Link
        </a>
      </div>
    </div>
  );
};

export default GroupCard;
