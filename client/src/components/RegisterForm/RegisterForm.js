import React from "react";

const RegisterForm = ({ onChange, onSubmit, title }) => (
  <form className="card" onSubmit={e => onSubmit(e)}>
    <div className="card-header bg-primary text-white">
      <h3>Register</h3>
    </div>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="login-email">
          <h4>Email</h4>
        </label>
        <input
          name="email"
          onChange={e => onChange(e)}
          className="form-control"
          id="login-email"
          type="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-nickname">
          <h4>NickName</h4>
        </label>
        <input
          name="text"
          onChange={e => onChange(e)}
          className="form-control"
          id="login-nickname"
          type="nickname"
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">
          <h4>Password</h4>
        </label>
        <input
          name="password"
          onChange={e => onChange(e)}
          id="login-password"
          className="form-control"
          type="password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">
          <h4>Password Confirm</h4>
        </label>
        <input
          name="password"
          onChange={e => onChange(e)}
          id="login-password"
          className="form-control"
          type="password"
        />
      </div>
    </div>
    <div className="card-footer">
      <button className="btn btn-primary btn-block" type="submit">
        Submit
      </button>
    </div>
  </form>
);

export default RegisterForm;
