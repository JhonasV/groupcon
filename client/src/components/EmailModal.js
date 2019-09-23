import React from "react";

const EmailModal = ({ onSubmit, setEmail, loading, emailSendResponse }) => {
  return (
    <div
      className="modal fade"
      id="emailmodaltoggle"
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
              SEND INVITE LINK
            </h5>
            <button
              type="button"
              className="close text-white"
              data-dismiss="modal"
              aria-label="Close"
              disabled={loading}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#ffff" }}>
            <form onSubmit={onSubmit}>
              {emailSendResponse !== "" ? (
                <span
                  className={`text-white alert alert-${emailSendResponse.type} w-100 text-weight-bold`}
                >
                  {emailSendResponse.message}
                </span>
              ) : null}

              <div className="form-group">
                <input
                  disabled={loading}
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  onChange={e => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Send Email"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary ml-auto"
              data-dismiss="modal"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
