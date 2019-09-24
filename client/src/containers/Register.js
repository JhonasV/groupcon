import React, { useState } from "react";
import { setToken } from "../Helpers/auth-helper";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Axios from "axios";

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    nickname: "",
    confirmPassword: ""
  });
  const [getError, setError] = useState({ error: "" });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const verifyPasswordMatch = () => {
    if (!(formValues.password === formValues.confirmPassword)) {
      setPasswordMatch(!passwordMatch);
      setError({ error: "Password and Password confirmation not match" });
      return !passwordMatch;
    }
    setPasswordMatch(true);
    return true;
  };
  const onSubmit = async e => {
    e.preventDefault();
    let match = verifyPasswordMatch();
    if (!match) return;
    setLoading(true);

    setError({ error: "" });
    await signIn();
  };

  const signIn = async () => {
    try {
      let { email, password, nickname } = formValues;
      let response = await Axios.post(`/api/v1/auth/register`, {
        email,
        password,
        nickname
      });
      if (response.status === 200) {
        setToken(response.data.token);
      } else {
        let error = response.data.error;
        let messageFormatted = error
          .split('"')
          .join(" ")
          .toUpperCase();
        setError({ error: messageFormatted });
      }
    } catch (error) {
      setError({
        error: error.response.data.error
          ? error.response.data.error
          : error.response.data
      });
    }
    setLoading(false);
  };

  return (
    <div className="mb-5">
      <div className="row ">
        {getError.error !== "" ? (
          <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-1 alert alert-danger">
            {getError.error}
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-2">
          <RegisterForm
            passwordMatch={passwordMatch}
            onChange={onChange}
            onSubmit={onSubmit}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
