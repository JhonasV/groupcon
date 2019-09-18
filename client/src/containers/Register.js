import React, { useState } from "react";
import { setToken } from "../Helpers/auth-helper";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const Register = ({ history }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [getError, setError] = useState({ error: "" });
  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await signIn();
  };

  const signIn = async () => {
    let config = {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" }
    };
    try {
      let response = await fetch(
        `http://localhost:3000/api/v1/auth/register`,
        config
      );
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        setToken(data.token);
      } else {
        let messageFormatted = data.error
          .split('"')
          .join(" ")
          .toUpperCase();
        setError({ error: messageFormatted });
      }
    } catch (error) {
      setError({
        error: "Something went wrong! /n Try again in some minutes!"
      });
    }
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
          <RegisterForm onChange={onChange} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Register;
