/* eslint-disable */
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { serverAxios } from "../../utils";
function Google() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async (responseCredentials) => {
          const token = responseCredentials.credential;
          const response = await serverAxios.post(
            "/api/account/google-login",
            {},
            {
              headers: { Authorization: token }
            }
          );
          setAuth(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/chats");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default Google;
