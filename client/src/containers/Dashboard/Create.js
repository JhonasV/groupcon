import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm/CreateGroupForm";
import { getCurrentUser } from "../../Helpers/auth-helper";
import Axios from "axios";

const Create = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [values, setValues] = useState(null);
  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // const getCurrentUserAsync = async () => {
    //   let user = await getCurrentUser();
    //   setCurrentUser(user ? user : false);
    // };
    // getCurrentUserAsync();
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    // Send data here
    await createGroup();
  };

  const createGroup = async () => {
    // let config = {
    //   body: JSON.stringify({ ...values, id: currentUser.id }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST"
    // };
    try {
      // let response = await fetch(`http://localhost:3000/api/v1/group`, config);
      console.log(values);
      let response = await Axios.post("/api/v1/group", values);
      // let data = await response.json();
      console.log(response);
      if (response.status === 200) {
        setMessage(`Group '${response.data.name}' created succesfully!`);
        setRedirect(true);
      } else {
        let errorMessage = response.data ? response.data.error : response.data;
        setMessage(errorMessage.toUpperCase());
      }
    } catch (error) {
      setMessage(error.response.data.error);
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
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
