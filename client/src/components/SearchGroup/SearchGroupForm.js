import React from "react";

const SearchGroupForm = ({ onChange, onSubmit }) => {
  return (
    <div
      className="mt-5 card"
      style={{
        height: "50vh"
      }}
    >
      <div className="card-header bg-primary">
        <h3 style={{ color: "#fff" }}>Find the group you are looking for!</h3>
      </div>
      <form className="card-body" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            autoFocus={true}
            type="text"
            className="form-control"
            placeholder="Search your group name..."
            name="name"
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Search!"
            className="btn btn-primary btn-lg btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchGroupForm;
