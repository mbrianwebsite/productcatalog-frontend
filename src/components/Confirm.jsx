import React from "react";

function Confirm({ showConfirmMessage, closeConfirm, handleDelete }) {
  return (
    <div className="modal modal-bottom sm:modal-middle">
      <div className={"modal-box ring-8 ring-error"}>
        <h3 className="font-bold text-lg">Delete Item</h3>
        <p className="py-4">{showConfirmMessage}</p>
        <div className="modal-action">
          <label onClick={closeConfirm} className={"btn btn-outline btn-error"}>
            Cancel
          </label>
          <label onClick={handleDelete} className={"btn btn-error"}>
            Delete
          </label>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
