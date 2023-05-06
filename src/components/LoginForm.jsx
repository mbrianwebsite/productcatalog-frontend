import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function LoginForm() {
  const navigate = useNavigate();

  const goToTable = async () => {
    navigate("/table");
    closeAlert();
  };

  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const clearInput = () => {
    setFormInput({
      email: "",
      password: "",
    });
  };

  const [varAlert, setVarAlert] = useState(false);
  const [varAlertType, setVarAlertType] = useState("Error");
  const [showAlertMessage, setShowAlertMessage] = useState("");

  const closeAlert = () => {
    setVarAlert(false);
  };

  const showAlert = async (message, type) => {
    setVarAlert(true);
    setVarAlertType(type);
    setShowAlertMessage(message);
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setFormInput({ ...formInput, email: event.target.value });
    } else if (event.target.name === "password") {
      setFormInput({ ...formInput, password: event.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/login",
        {
          email: formInput.email,
          password: formInput.password,
        }
      );
      console.log(response);
      localStorage.setItem("username", response.data.data.user.username);
      localStorage.setItem("token", response.data.data.token);
      await showAlert("Login Success", "Success");
    } catch (error) {
      showAlert(error.response.data.info, "Error");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col p-5 sm:p-7 m-5 bg-white rounded-2xl shadow-xl max-w-lg mx-auto gap-4">
        <div className="font-sans font-bold text-2xl  sm:text-3xl text-[#394F87] mb-6 text-center">
          Login
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-6 gap-5 mb-5">
          <div className="flex flex-col  sm:col-span-3">
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl placeholder:text-slate-500 p-2 ring-1 ring-black rounded-md "
              type="email"
              placeholder="Your email"
              name="email"
              value={formInput.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col sm:col-span-3">
            <input
              required
              className="font-sans font-semibold text-lg sm:text-xl placeholder:text-slate-500 p-2 ring-1 ring-black rounded-md "
              type="password"
              placeholder="Your Password"
              name="password"
              value={formInput.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          {/* <div
          onClick={clearInput}
          className="px-4 py-2 ring-1 ring-[#394F87] rounded-lg hover:cursor-pointer"
        >
          <div className="font-sans font-semibold text-xl text-[#394F87]">
            Cancel
          </div>
        </div> */}
          <div
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#394F87] rounded-lg w-full text-center hover:cursor-pointer"
          >
            <div className="font-sans font-semibold text-xl text-white">
              Login
            </div>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={varAlert}
        readOnly
        className="modal-toggle"
      />
      <Alert
        showAlertMessage={showAlertMessage}
        varAlertType={varAlertType}
        goToPage={goToTable}
        closeAlert={closeAlert}
      />
    </>
  );
}

export default LoginForm;
