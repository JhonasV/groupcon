import React from "react";
import { Link } from "react-router-dom";
const CreateGroupForm = ({ group, onChange, onSubmit, create }) => {
  return (
    <div className="row mt-5">
      <div className="col-md-8 ml-auto mr-auto">
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
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="password"
                  placeholder="Group password (empty for public groups)"
                  value={group ? group.password : ""}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control btn btn-primary btn-block"
                  value={create ? "CREATE" : "UPDATE"}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
