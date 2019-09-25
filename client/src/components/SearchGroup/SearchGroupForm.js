import React from "react";

const SearchGroupForm = ({ onChange, onSubmit }) => {
  return (
    <div
      className="card"
      style={{
        height: "auto",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
      }}
    >
      <div
        className="card-header bg-primary h-50"
        style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      >
        <div className="row pt-4">
          <div className="card-header-content col-sm-12 col-md-6 col-lg-6">
            <h2 className="text-white">Social groups directory</h2>
            <h4 className="text-white mt-3">
              Find the group you are looking for!
            </h4>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 text-white ml-auto mr-auto">
            <div className="row">
              <div
                className="w-80 text-center mr-auto ml-auto"
                style={{ fontSize: "45px" }}
              >
                <i className="fa fa-whatsapp mr-4"></i>
                <i className="fa fa-telegram mr-4"></i>
                <i className="fa fa-facebook mr-4"></i>
                <i className="fa fa-slack mr-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="card-body pt-3" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            autoComplete={"off"}
            className="form-control form-control-lg "
            placeholder="Search..."
            name="name"
            id="nameInput"
            onChange={e => onChange(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchGroupForm;
