import React, { useState } from "react";
import { setToken } from "../Helpers/auth-helper";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    nickname: ""
  });
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [getError, setError] = useState({ error: "" });
  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    // isSamePassword();
  };

  const onSubmit = async e => {
    e.preventDefault();
    // if (!confirmPassword) return;
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
        let error = data.error ? data.error : data;
        let messageFormatted = error
          .split('"')
          .join(" ")
          .toUpperCase();
        setError({ error: messageFormatted });
      }
    } catch (error) {
      setError({
        error: "Something went wrong!"
      });
    }
  };

  const isSamePassword = () => {
    if (formValues.password === "") return;
    if (formValues.confirm === "") return;
    setConfirmPassword(formValues.password === formValues.confirm);
    // console.log(formValues.password === formValues.confirm);
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
            onConfirm={confirmPassword}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
