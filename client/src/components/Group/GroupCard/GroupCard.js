import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({
  name,
  url,
  id,
  groupCreator = null,

  editable = false,
  onDelete,
  onModalOpen,
  setUrl,
  privateGroup,
  currentUserId = null,
  unlocked
}) => {
  const groupCardColor = url => {
    let color = url.includes("chat.whatsapp.com") ? "bg-success" : "bg-primary";
    return color;
  };

  const groupCardIcon = url => {
    let icon = url.includes("chat.whatsapp.com") ? "fa-whatsapp" : "";
    return icon;
  };

  const renderCardButtons = isPrivate => {
    if (currentUserId === groupCreator || unlocked || !isPrivate) {
      return (
        <>
          <div className="col  pb-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="text-white text-nowrap btn-block font-weight-bold btn btn-secundary"
            >
              <i className="fa fa-arrow-circle-right"></i> Direct Link
            </a>
          </div>
          <div className="col  pb-3">
            <button
              className="btn btn-secundary btn-block text-white font-weight-bold text-nowrap"
              data-placement="top"
              title="Send a email with the invite link"
              data-toggle="modal"
              data-target="#emailmodaltoggle"
              data-backdrop="static"
              data-keyboard="false"
              onClick={e => {
                onModalOpen(id);
                // if (document.querySelector("#closeUnlockedGroupModal")) {
                //   document.querySelector("#closeUnlockedGroupModal").click();
                // }
              }}
            >
              <i className="fa fa-envelope"></i>
            </button>
          </div>
          <div className="col  pb-3">
            <button
              className="btn btn-secundary btn-block text-nowrap text-white font-weight-bold"
              data-toggle="modal"
              data-target="#qrModalToggle"
              data-backdrop="static"
              data-keyboard="false"
              onClick={e => {
                setUrl(url);
                // if (document.querySelector("#closeUnlockedGroupModal")) {
                //   document.querySelector("#closeUnlockedGroupModal").click();
                // }
              }}
            >
              <i className="fa fa-qrcode"></i> QR
            </button>
          </div>
        </>
      );
    }

    if (isPrivate) {
      return (
        <div className="col">
          <button
            className="btn btn-secundary btn-block text-white font-weight-bold text-nowrap"
            data-toggle="modal"
            data-target="#passwordModalToggle"
            data-backdrop="static"
            data-keyboard="false"
            onClick={() => onModalOpen(id)}
          >
            <i className="fa fa-lock"></i> Private Group, unlock.
          </button>
        </div>
      );
    }
  };

  return (
    <div
      className={`card ${groupCardColor(url)} mb-2`}
      style={{ height: "auto", maxHeight: "260px" }}
    >
      <div className={`card-header`}>
        <div className="row">
          <div className="col">
            <h3 className="text-white card-title">
              {name}
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
          <div className="col ">
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
        <div className="row mt-2">{renderCardButtons(privateGroup)}</div>
      </div>
    </div>
  );
};

export default GroupCard;
