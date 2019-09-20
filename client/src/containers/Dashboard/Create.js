import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm/CreateGroupForm";
import { getCurrentUser } from "../../Helpers/auth-helper";
const Create = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [values, setValues] = useState({ name: "", url: "", id: "" });
  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const getCurrentUserAsync = async () => {
      let user = await getCurrentUser();
      setCurrentUser(user ? user : false);
    };

    getCurrentUserAsync();
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    // Send data here
    await createGroup();
  };

  const createGroup = async () => {
    let config = {
      body: JSON.stringify({ ...values, id: currentUser.id }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    };
    try {
      let response = await fetch(`http://localhost:3000/api/v1/group`, config);
      let data = await response.json();
      if (response.ok) {
        setMessage(`Group '${data.name}' created succesfully!`);
        setRedirect(true);
      } else {
        setMessage(data.error.toUpperCase());
        console.log(data);
      }
    } catch (error) {
      setMessage(error.error);
      console.log(error);
    }
  };

  if (isRedirect) {
    return <Redirect to={{ pathname: "/dashboard", state: { message } }} />;
  }

  return (
    <div>
      <div className="row mt-2">
        {message !== "" ? (
          <span className={"alert alert-success mr-auto ml-auto"}>
            {message}
          </span>
        ) : (
          ""
        )}
        <div className="col-md-12">
          <CreateGroupForm
            onChange={onChange}
            onSubmit={onSubmit}
            group={values}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
