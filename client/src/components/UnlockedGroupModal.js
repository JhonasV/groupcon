import React from "react";
import GroupCard from "./Group/GroupCard/GroupCard";

const UnlockedGroupModal = ({
  loading,
  groupUnlocked,
  onModalOpen,
  setUrl
}) => {
  return (
    <div
      className="modal fade"
      id="groupUnlockedModalToggle"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content bg-primary">
          <div className="modal-header">
            <h5
              className="modal-title text-white text-weight-bold"
              id="exampleModalLongTitle"
            >
              Unlock the group
            </h5>
            <button
              type="button"
              id="closeUnlockedGroupModal"
              className="close text-white"
              data-dismiss="modal"
              aria-label="Close"
              disabled={loading}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ backgroundColor: "#ffff" }}>
            <GroupCard
              url={groupUnlocked ? groupUnlocked.group.url : ""}
              id={groupUnlocked ? groupUnlocked.group.id : ""}
              name={groupUnlocked ? groupUnlocked.group.name : ""}
              onModalOpen={onModalOpen}
              unlocked={groupUnlocked ? groupUnlocked.unlock : false}
              setUrl={setUrl}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary ml-auto"
              data-dismiss="modal"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockedGroupModal;
