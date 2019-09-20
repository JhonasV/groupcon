import React from "react";

const CreateGroupForm = ({ group, onChange, onSubmit }) => {
  return (
    <div className="row mt-5">
      <div className="col-md-8 ml-auto mr-auto">
        <form className="container" onSubmit={onSubmit}>
          <div className="card">
            <div className="card-header bg-primary">
              <h3 className="text-white text-center">Create a new group!</h3>
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
            </div>
            <div className="card-footer">
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control btn btn-primary btn-block"
                  value="Create"
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
