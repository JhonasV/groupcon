import React, { useState } from "react";
import { setToken } from "../Helpers/auth-helper";
import LoginForm from "../components/LoginForm/LoginForm";
import Axios from "axios";
const Login = ({ history }) => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [getError, setError] = useState({ error: "" });
  const [loading, setLoading] = useState(false);
  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError({ error: "" });
    setLoading(true);
    await signIn();
  };

  const signIn = async () => {
    // let config = {
    //   method: "POST",
    //   body: ,
    //   headers: { "Content-Type": "application/json" }
    // };
    try {
      let response = await Axios.post(`/api/v1/auth/login`, formValues);

      if (response.status === 200) {
        setToken(response.data.token);
      } else {
        let messageFormatted = response.data.error
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
    setLoading(false);
  };

  return (
    <div>
      <div className="row">
        {getError.error !== "" ? (
          <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-3 alert alert-danger">
            {getError.error}
          </div>
        ) : null}
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-5">
          <LoginForm
            loading={loading}
            setLoading={setLoading}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
