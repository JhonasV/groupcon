import React from "react";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
const GroupCard = ({ name, url, id, password, editable, onDelete }) => {
  const groupCardColor = url => {
    let color = url.includes("chat.whatsapp.com") ? "bg-success" : "bg-primary";
    return color;
  };

  const groupCardIcon = url => {
    let icon = url.includes("chat.whatsapp.com") ? "fa-whatsapp" : "";
    return icon;
  };

  return (
    <div className="card " style={{ height: "460px" }}>
      <div className={`card-header ${groupCardColor(url)}`}>
        <div className="row">
          <div className="col-sm-10">
            <h3 className="text-white">{name}</h3>
          </div>
          <div className="col-sm-2">
            <h3 className="text-white">
              {password !== "" ? <i className="fa fa-lock"></i> : ""}
              <i className={`fa ${groupCardIcon(url)}`}></i>
            </h3>
          </div>
        </div>
      </div>
      <div className="card-body text-center">
        <QRCode size={230} value={url} />
      </div>
      <div className={`card-footer ${groupCardColor(url)}`}>
        <div className="row">
          <div className="col">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url ? url : "#"}
              className="text-white font-weight-bold btn btn-secundary"
            >
              Direct Link
            </a>
          </div>
          <div className="col">
            {editable ? (
              <Link
                className="btn btn-warning"
                to={{
                  pathname: `/dashboard/edit`,
                  state: { id }
                }}
              >
                <i className="fa fa-edit"></i>
                Edit
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="col">
            {editable ? (
              <button className="btn btn-danger" onClick={e => onDelete(e, id)}>
                <i className="fa fa-trash"></i> Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
