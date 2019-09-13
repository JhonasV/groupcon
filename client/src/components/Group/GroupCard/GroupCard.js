import React from "react";
import QRCode from "qrcode.react";
const GroupCard = ({ name, url, qr }) => (
  <div className="card">
    <div className="card-header">
      <h3>{name ? name : "Loading"}</h3>
    </div>
    <div className="card-body">
      {url ? <QRCode size="220" value={url} /> : "Loading"}
    </div>
    <div className="card-footer">
      <a href={url ? url : "#"}>{url ? "Direct Link" : "Loading"}</a>
    </div>
  </div>
);

export default GroupCard;
