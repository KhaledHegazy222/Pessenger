import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { serverAxios } from "../utils";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

/* eslint-disable */
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    validateUser();
    async function validateUser() {
      if (auth) {
        setIsLoading(true);
        const response = await serverAxios("/api/account/user", {
          headers: {
            Authorization: `Bearer ${auth}`
          }
        });
        setUser(response.data);
        setIsLoading(false);
      } else {
        if (localStorage.getItem("token")) {
          setAuth(localStorage.getItem("token"));
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    }
  }, [auth]);

  const value = useMemo(() => {
    return { auth, setAuth, user, setUser, isLoading };
  }, [auth, setAuth, user, setUser, isLoading]);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
export { useAuth };
