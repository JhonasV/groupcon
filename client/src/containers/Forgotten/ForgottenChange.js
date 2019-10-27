import React, { useState, useEffect } from "react";
import Axios from "axios";
import ForgottenChangeForm from "../../components/ForgottenPassword/ForgottenChangeForm";

import { Redirect, Link } from "react-router-dom";

const ForgottenPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ details: "", type: "" });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!match.params.code) setRedirect(true);

    const verifyRecoverCode = () => {
      setLoading(true);
      Axios.post("/api/v1/auth/verifyCode", {
        code: match.params.code,
        email: match.params.email
      })
        .then(res => {
          if (res.status === 200)
            setMessage({ details: res.data.message, type: "warning" });
          else setRedirect(true);
        })
        .catch(err => setRedirect(true));
      setLoading(false);
    };
    verifyRecoverCode();
  }, [match.params.code, match.params.email]);

  const submitChangePassword = async e => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage({ details: "The passwords doesn't match", type: "warning" });
      return;
    }

    setLoading(true);
    try {
      let response = await Axios.post("/api/v1/user/updatePassword", {
        email: match.params.email,
        password
      });
      if (response.status === 200) {
        setMessage({ details: response.data.message, type: "success" });
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-5">
        {message !== "" ? (
          <div className={`alert alert-${message.type}`}>
            <h4 className="font-weight-bold">{message.details}</h4>
          </div>
        ) : null}

        {loading ? (
          <div className="d-flex justify-content-center ">
            <div className="spinner-border mt-5" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : showForm ? (
          <ForgottenChangeForm
            loading={loading}
            setPassword={setPassword}
            password={password}
            setPasswordConfirm={setPasswordConfirm}
            passwordConfirm={passwordConfirm}
            submitChangePassword={submitChangePassword}
          />
        ) : (
          <div className="card p-3">
            <Link
              to={"/login"}
              className="font-weight-bold"
              style={{ fontSize: "20px" }}
            >
              Login now, click here!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgottenPassword;
