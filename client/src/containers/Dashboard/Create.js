import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm";

import Alert from "../../components/Alert";
import { connect } from 'react-redux';
import { createGroup } from '../../actions';
const Create = ({ createGroups }) => {
  
  const [values, setValues] = useState({
    name: "",
    url: "",
    password: "",
    oldPassword: "",
    confirmPassword: "",
    private: false,
  });
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    await createGroupAsync();
  };

  const createGroupAsync = async () => {
    console.log(values);
    values.private = checked;
    // try {
      createGroups(values);
    //   if (response.status === 200) {
    //     setMessage(`Group '${response.data.name}' created succesfully!`);
    //     setRedirect(true);
    //   } else {
    //     let errorMessage = response.data.error
    //       ? response.data.error
    //       : response.data;
    //     setMessage(errorMessage);
    //   }
    // } catch (error) {
    //   setMessage(error.response.data.error);
    // }
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
          checked={checked}
          setChecked={setChecked}
          group={values}
          loading={loading}
        />
      </div>
    </div>
  );
};



const mapDispatchToProps = dispatch =>{
  return {
    createGroups: (values) => createGroup(values)(dispatch)
  };
}

export default connect(mapDispatchToProps)(Create);
