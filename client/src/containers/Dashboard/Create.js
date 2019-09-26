import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm";
import Axios from "axios";
import Alert from "../../components/Alert";
const Create = () => {
  const [values, setValues] = useState({ name: "", url: "", password: "" });
  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
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
        let errorMessage = response.data.error
          ? response.data.error
          : response.data;
        setMessage(errorMessage);
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setLoading(false);
  };

  if (isRedirect) {
    return <Redirect to={{ pathname: "/dashboard", state: { message } }} />;
  }

  return (
    <div className="row mt-1">
      <div className="col-md-8 ml-auto mr-auto">
        <Alert message={message} />
      </div>
      <div className="col-md-12 ">
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
  );
};

export default Create;
