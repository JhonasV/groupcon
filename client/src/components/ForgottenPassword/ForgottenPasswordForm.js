import React from "react";

const ForgottenPasswordForm = ({ setEmail, email, loading, submitEmail }) => {
  return (
    <form onSubmit={e => submitEmail(e)}>
      <div className="card ">
        <div className="card-header bg-primary">
          <h4 className="card-title font-weight-bold text-white">
            Has forgotten your password?
          </h4>
        </div>
        <div className="card-body">
          <div className="form-group d-flex">
            <i
              style={{ fontSize: "24px" }}
              className="fa fa-envelope pt-3 pr-3"
            ></i>

            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              className="form-control"
              placeholder="EMAIL"
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
              " Retrieve password"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgottenPasswordForm;
