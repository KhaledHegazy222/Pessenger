import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function withAuth(WrappedComponent) {
  return function NewComponent(props) {
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        navigate("/account/login");
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
