import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function GuestRoute() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return useEffect(() => {
      navigate("/table");
    });
  }
  return <Outlet />;
}

export default GuestRoute;
