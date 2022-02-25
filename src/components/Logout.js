import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { SetPopupContext } from "../App";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;