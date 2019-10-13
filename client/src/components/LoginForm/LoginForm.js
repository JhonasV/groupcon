import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
const LoginForm = ({ onChange, onSubmit, title, loading, setLoading }) => (
=======
import Loading from "../Loading";

const LoginForm = ({ onChange, onSubmit, title, loading }) => (
>>>>>>> 9481c23cbe416b090286dcc7f9a20b1efc458cf7
  <form className="card" onSubmit={e => onSubmit(e)}>
    <div className="card-header bg-primary text-white">
      <h3>{title ? title : "Login"}</h3>
    </div>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="login-email">
          <h4>Email</h4>
        </label>
        <input
          disabled={loading}
          name="email"
          onChange={e => onChange(e)}
          className="form-control"
          id="login-email"
          type="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">
          <h4>Password</h4>
        </label>
        <input
          disabled={loading}
          name="password"
          onChange={e => onChange(e)}
          id="login-password"
          className="form-control"
          type="password"
        />
      </div>
    </div>
    <div className="card-footer">
<<<<<<< HEAD
      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary btn-block"
            disabled={loading}
            type="submit"
          >
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
      <div className="row mt-2">
        <div className="col">
          <Link to="/forgotten" className="font-weight-bold">
            Have forgotten your password? click here
          </Link>
        </div>
      </div>
=======
      <button
        className="btn btn-primary btn-block"
        disabled={loading}
        type="submit"
      >
        {loading ? <Loading /> : "Submit"}
      </button>
>>>>>>> 9481c23cbe416b090286dcc7f9a20b1efc458cf7
    </div>
  </form>
);

export default LoginForm;
