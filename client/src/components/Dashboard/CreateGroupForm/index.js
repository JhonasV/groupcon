import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import LineSeparator from '../../LineSeparator';

const CreateGroupForm = ({
  group,
  onChange,
  onSubmit,
  create,
  loading,
  checked,
  setChecked,
}) => {
  let buttonTitle = create ? "CREATE" : "UPDATE";
  
  const renderOldPasswordField = () => (
    <div className="form-group">
    <input
      type="password"
      className="form-control"
      onChange={onChange}
      name="newPassword"
      placeholder="New password"
      value={group ? group.newPassword : ""}
      disabled={loading}
    />
    </div>
  );


  const renderEditPasswordFields = (showFields) =>{
    return (
      <>
        {showFields && (
          <>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="password"
              placeholder="password"
              value={group ? group.password : ""}
              disabled={loading}
            />
          </div>
          {group.password > 0 && renderOldPasswordField()}
            <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="confirmPassword"
              placeholder="Confirm password"
              value={group ? group.confirmPassword : ""}
              disabled={loading}
            />
          </div>
          </>
        )}
      </>
    );
  }


  const renderCreatePasswordFields = () => {
    // TODO:
    // Show passwords fields in create form
    let isCreatePrivateGroup = create && checked;
    if(isCreatePrivateGroup){
      return passwordFields();
    }

    //Make group private - required: a password and password confirmation.
    // let showFieldsToMakeGroupPrivate = !create && !checked;
    // if(showFieldsToMakeGroupPrivate){
    //   return passwordFields()
    // }

     //Make private group public - required: current password and  password confirmation.
    // let showFieldsToMakeGroupPublic = !create && checked;
    // if(showFieldsToMakeGroupPublic){
    //   return passwordFields();
    // }

    //Update group private password - required: current password, new password and password confirmation.
    // let showFieldsToUpdatePassword = !create && group.is


  
  }

  const renderChangeGroupVisibility = () =>{
    let isEdit = !create;
    let text = checked ? "private" : "public";
 
    return (
      <>
        {isEdit && (   
          <div className="row p-2">
            <div className='col'>
              <span className='font-weight-bold'>Change Group Visibility</span> 
              <br/>
              This group is currently {text}
            </div>
          
            <div className='col d-flex justify-content-end'>
              <button className="btn btn-default w-75 font-weight-bold">Change Visibility</button>
            </div>
          </div>        
        )}
      </>
    )
  }

  const renderUpdatePassword = () =>{
    let showUpdatePassword = !create && checked;
    return (
      <>
        {showUpdatePassword && (    
          <div className="row p-2">
            <div className='col'>
              <span className='font-weight-bold'>Update Group Password</span> 
            </div>
            <div className='col d-flex justify-content-end'>
                <input 
                  type='button'
                  data-placement="top"
                  title="Send a email with the invite link"
                  data-toggle="modal"
                  data-target="#updatePasswordToggle"
                  data-backdrop="static"
                  data-keyboard="false"
                  value='Update Password'
                className="btn btn-default w-75 font-weight-bold"/>
            </div>
          </div>      
        )}
      </>
    )
  }

  const renderMakePrivateCheck = () =>{

    return (
      <>
      {create && (
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              checked={checked}
              id="private"
              onChange={() => setChecked(!checked)}
            />
          <label className="custom-control-label" htmlFor="private">
            Is going to be private?
          </label>
        </div>
      </div>
      )}
      </>
    )
  }

  const passwordFields= () => {
  
    return (
      <>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="password"
              placeholder="password"
              value={group ? group.password : ""}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={group ? group.newPassword : ""}
              disabled={loading}
            />
          </div>
      </>
    );
  };

  const renderUpdateGroupOptions = () =>{
    let isEdit = !create;
    if(isEdit)
      return (                 
        <div>
          <h4>Group Options</h4>
          <div style={{border: '1px solid #2196F3', borderRadius: '7px'}}>
            {renderChangeGroupVisibility()}
            <LineSeparator/>
            {renderUpdatePassword()}
          </div>
        </div>
      )
  }

  return (
    <div className="row mb-5">
      <div className="col-md-8 ml-auto mr-auto w-100">
        <Link to="/dashboard" className="btn btn-primary mb-2">
          {" "}
          <i className="fa fa-chevron-left"></i> Back to Dashboard
        </Link>

        <form onSubmit={onSubmit}>
          <div className="card">
            <div className="card-header bg-primary">
              <h3 className="text-white text-center">
                {create ? "Create a new group!" : "Update the group!"}
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="name"
                  placeholder="Group Name"
                  value={group ? group.name : ""}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="url"
                  placeholder="Group URL"
                  value={group ? group.url : ""}
                  disabled={loading}
                />
              </div>
              {renderMakePrivateCheck()}
              {renderCreatePasswordFields()}
            </div>
            <div className="card-footer">
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? <Loading /> : buttonTitle}
                </button>
              </div>
              <LineSeparator/>
              {renderUpdateGroupOptions()}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
