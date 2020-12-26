import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import CreateGroupForm from "../../components/Dashboard/CreateGroupForm";

import Alert from "../../components/Alert";
import { connect } from 'react-redux';
import { createGroup, clearCreateMessages } from '../../actions';
const Create = ({ createGroups, createSuccessMessage, createErrorMessage, clearCreateMessages }) => {
  
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
 
  useEffect(()=>{
    if(createSuccessMessage.length > 0){
      setMessage(createSuccessMessage);
      setRedirect(true);
 
    }

    if(createErrorMessage.length > 0){
      setMessage(createErrorMessage);
    }
    clearCreateMessages();
  }, [createErrorMessage, createSuccessMessage, clearCreateMessages])

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

     await createGroups(values);

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

const mapStateToProps = state =>{
  return {
    createSuccessMessage: state.groupReducer.createSuccessMessage,
    createErrorMessage: state.groupReducer.createErrorMessage
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    createGroups: (values) => createGroup(values)(dispatch),
    clearCreateMessages: () => clearCreateMessages()(dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Create);
