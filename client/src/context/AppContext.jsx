import React, { createContext, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const appContext = createContext();

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    api
      .get("/auth/logout")
      .then(() => {
        console.log("logged out");
        navigate("/login");
      })
      .catch((e) => console.error(e));
  };

  const value = {
    user,
    setUser,
    logout,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContext;
export { appContext };
