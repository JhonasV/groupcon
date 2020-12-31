import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
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

  const renderEditPasswordFields = () =>{
    return (
      <>
        {checked && (
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


  const renderPasswordFields= () => {
    return (
      <>
        {checked ? (
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
        ) : null}
      </>
    );
  };

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
              {create ? renderPasswordFields() : renderEditPasswordFields()}
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
