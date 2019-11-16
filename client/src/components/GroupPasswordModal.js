import React from "react";

const GroupPasswordModal = ({
  onSubmit,
  setPassword,
  loading,
  passwordResponse,
  password,
  setPasswordResponse,
  setGroupUnlock,
  setUrl,
  setLoading
}) => {
  const submit = async e => {
    setLoading(!loading);
    await onSubmit(e, unlockGroup => {
      if (unlockGroup) {
        setGroupUnlock(unlockGroup);
        document.querySelector("#closeGroupPasswordModal").click();
        document.querySelector("#openUnlockModal").click();
        setUrl(unlockGroup.group.url);
      }
      setLoading(!loading);
    });
  };
  return (
    <>
      <button
        className="btn btn-secundary btn-block text-white font-weight-bold text-nowrap"
        data-placement="top"
        style={{ display: "none" }}
        title="Send a email with the invite link"
        data-toggle="modal"
        data-target="#groupUnlockedModalToggle"
        data-backdrop="static"
        data-keyboard="false"
        id="openUnlockModal"
      ></button>
      <div
        className="modal fade"
        id="passwordModalToggle"
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
                Unlock the group
              </h5>
              <button
                type="button"
                id="closeGroupPasswordModal"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
                disabled={loading}
                onClick={e =>
                  setPasswordResponse({
                    message: "",
                    type: ""
                  })
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "#ffff" }}>
              <form onSubmit={submit}>
                {passwordResponse !== "" ? (
                  <div
                    className={`text-white text-weight-bold alert alert-${passwordResponse.type} w-100 text-weight-bold`}
                  >
                    {passwordResponse.message.toUpperCase()}
                  </div>
                ) : null}

                <div className="form-group">
                  <input
                    disabled={loading}
                    type="password"
                    className="form-control"
                    placeholder="Group Password..."
                    onChange={e => setPassword(e.target.value)}
                    required={true}
                    value={password}
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
                      "Unlock"
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
                onClick={e =>
                  setPasswordResponse({
                    message: "",
                    type: ""
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupPasswordModal;
