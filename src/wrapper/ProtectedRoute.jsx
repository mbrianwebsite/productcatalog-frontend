import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  if (localStorage.getItem("token") === null) {
    return useEffect(() => {
      navigate("/login");
    });
  }
  return <Outlet />;
}

export default ProtectedRoute;
