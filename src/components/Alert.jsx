import React from "react";

function Alert({ varAlertType, showAlertMessage, closeAlert, goToPage }) {
  return (
    <div className="modal modal-bottom sm:modal-middle">
      <div
        className={
          varAlertType === "Error"
            ? "modal-box ring-8 ring-error"
            : "modal-box ring-8 ring-success"
        }
      >
        <h3 className="font-bold text-lg">{varAlertType}</h3>
        <p className="py-4">{showAlertMessage}</p>
        <div className="modal-action">
          <label
            onClick={varAlertType === "Error" ? closeAlert : goToPage}
            className={
              varAlertType === "Error" ? "btn btn-error" : "btn btn-success"
            }
          >
            {varAlertType === "Error" ? "Try Again" : "Ok"}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Alert;
