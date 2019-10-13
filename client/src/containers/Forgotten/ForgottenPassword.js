import React, { useState } from "react";
import Axios from "axios";
import ForgottenPasswordForm from "../../components/ForgottenPassword/ForgottenPasswordForm";

// import ForgottenPasswordForm from "../components/ForgottenPassword/ForgottenPasswordForm";
const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const sendEmail = async e => {
    e.preventDefault();

    if (email === "") return;
    setLoading(true);

    try {
      let response = await Axios.post("/api/v1/auth/forgotten", { email });
      if (response.status === 200) {
        setShow(true);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-8 ml-auto mr-auto mt-5">
        {show ? (
          <div className="alert alert-success">
            <h4 className="font-weight-bold">
              If the email that you introduced exists, you will receive the
              instructions to recover your password
            </h4>
          </div>
        ) : null}
        <ForgottenPasswordForm
          loading={loading}
          submitEmail={sendEmail}
          setEmail={setEmail}
          email={email}
        />
      </div>
    </div>
  );
};

export default ForgottenPassword;
