import React from "react";
import QRCode from "qrcode.react";
const QRModal = ({ url }) => {
  return (
    <div
      className="modal fade"
      id="qrModalToggle"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content bg-primary">
          <div className="modal-header">
            <h5
              className="modal-title text-white text-weight-bold"
              id="exampleModalLongTitle"
            >
              QR CODE
            </h5>
            <button
              type="button"
              className="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            className="modal-body text-center text-white"
            style={{ backgroundColor: "#fff" }}
          >
            <QRCode size={260} value={url} />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secundary ml-auto text-white"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
