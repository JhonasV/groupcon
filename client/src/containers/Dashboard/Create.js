import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm/CreateGroupForm";
import { getCurrentUser } from "../../Helpers/auth-helper";
import Axios from "axios";

const Create = () => {
  const [values, setValues] = useState(null);
  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    // Send data here
    setLoading(true);
    setMessage("");
    await createGroup();
  };

  const createGroup = async () => {
    try {
      let response = await Axios.post("/api/v1/group", values);
      if (response.status === 200) {
        setMessage(`Group '${response.data.name}' created succesfully!`);
        setRedirect(true);
      } else {
        let errorMessage = response.data ? response.data.error : response.data;
        setMessage(errorMessage.toUpperCase());
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.error);
      setLoading(false);
    }
  };

  if (isRedirect) {
    return <Redirect to={{ pathname: "/dashboard", state: { message } }} />;
  }

  return (
    <div>
      <div className="row mt-1 container">
        <div className="col-md-12 ">
          {message !== "" ? (
            <div className={"alert alert-danger"}>
              <h4>{message}</h4>
            </div>
          ) : (
            ""
          )}
          <CreateGroupForm
            create={true}
            onChange={onChange}
            onSubmit={onSubmit}
            group={values}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
