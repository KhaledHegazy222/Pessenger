import React, { createContext, useContext, useMemo, useState } from "react";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

/* eslint-disable */
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  const value = useMemo(() => {
    return { auth, setAuth };
  }, [auth, setAuth]);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
export { useAuth };
