import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({
  name,
  url,
  id,
  password,
  editable,
  onDelete,
  onModalOpen,
  setUrl
}) => {
  const groupCardColor = url => {
    let color = url.includes("chat.whatsapp.com") ? "bg-success" : "bg-primary";
    return color;
  };

  const groupCardIcon = url => {
    let icon = url.includes("chat.whatsapp.com") ? "fa-whatsapp" : "";
    return icon;
  };

  return (
    <div
      className={`card ${groupCardColor(url)}`}
      style={{ height: "auto", maxHeight: "205px" }}
    >
      <div className={`card-header`}>
        <div className="row">
          <div className="col-sm-10">
            <h3 className="text-white card-title">{name}</h3>
          </div>

          <div className="col-sm-2">
            <h3 className="text-white">
              {password ? <i className="fa fa-lock"></i> : ""}
              <i className={`fa ${groupCardIcon(url)}`}></i>
            </h3>
          </div>
        </div>
      </div>

      <div className={`card-body`}>
        <div className="row">
          <div className="col">
            {editable && onDelete ? (
              <Link
                className="btn btn-warning btn-block"
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
            {editable && onDelete ? (
              <button
                className="btn btn-danger btn-block"
                onClick={e => onDelete(e, id)}
              >
                <i className="fa fa-trash"></i> Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="text-white text-nowrap btn-block font-weight-bold btn btn-secundary"
            >
              <i className="fa fa-arrow-circle-right"></i> Direct Link
            </a>
          </div>
          <div className="col">
            <button
              className="btn btn-secundary btn-block text-white font-weight-bold text-nowrap"
              data-placement="top"
              title="Send a email with the invite link"
              data-toggle="modal"
              data-target="#emailmodaltoggle"
              data-backdrop="static"
              data-keyboard="false"
              onClick={e => onModalOpen(id)}
            >
              <i className="fa fa-envelope"></i>
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-secundary btn-block text-nowrap text-white font-weight-bold"
              data-toggle="modal"
              data-target="#qrModalToggle"
              data-backdrop="static"
              data-keyboard="false"
              onClick={e => setUrl(url)}
            >
              <i className="fa fa-qrcode"></i> QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
