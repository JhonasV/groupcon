import React from "react";
// loading={loading}
//             setPassword={setPassword}
//             password={password}
//             setPasswordConfirm={setPasswordConfirm}
//             passwordConfirm={passwordConfirm}
//             submitChangePassword={submitChangePassword}
const ForgottenChangeForm = ({
  loading,
  setPassword,
  password,
  setPasswordConfirm,
  passwordConfirm,
  submitChangePassword
}) => {
  return (
    <form autoComplete="off" onSubmit={e => submitChangePassword(e)}>
      <div className="card ">
        <div className="card-header bg-primary">
          <h4 className="card-title font-weight-bold text-white">
            Insert your new password.
          </h4>
        </div>
        <div className="card-body">
          <div className="form-group d-flex">
            <i
              style={{ fontSize: "24px" }}
              className="fa fa-lock pt-3 pr-3"
            ></i>

            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              className="form-control"
              placeholder="Password"
              disabled={loading}
            />
          </div>
          <div className="form-group d-flex">
            <i
              style={{ fontSize: "24px" }}
              className="fa fa-lock pt-3 pr-3"
            ></i>

            <input
              onChange={e => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              type="password"
              className="form-control"
              placeholder="Password Confirmation"
              disabled={loading}
            />
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-block btn-primary">
            {loading ? (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgottenChangeForm;
