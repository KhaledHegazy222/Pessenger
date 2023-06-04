/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import style from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { serverAxios } from "../../utils";
import Google from "./Google";

function Account({ login }) {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const firstNameSignup = useRef(null);
  const lastNameSignup = useRef(null);
  const emailSignup = useRef(null);
  const passwordSignup = useRef(null);
  const confirmedPassword = useRef(null);
  const emailLogin = useRef(null);
  const passwordLogin = useRef(null);
  useEffect(() => {
    if (auth) {
      navigate("/chats");
    }

    if (firstNameSignup.current) {
      firstNameSignup.current.value = "";
    }
    if (lastNameSignup.current) {
      lastNameSignup.current.value = "";
    }
    if (emailSignup.current) {
      emailSignup.current.value = "";
    }
    if (passwordSignup.current) {
      passwordSignup.current.value = "";
    }
    if (confirmedPassword.current) {
      confirmedPassword.current.value = "";
    }
    if (emailLogin.current) {
      emailLogin.current.value = "";
    }
    if (passwordLogin.current) {
      passwordLogin.current.value = "";
    }
  }, [auth, login]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        const reqBody = {
          email: emailLogin.current.value,
          password: passwordLogin.current.value
        };

        const response = await serverAxios.post("/api/account/login/", reqBody);
        const token = response.data.token;
        setAuth(token);
        localStorage.setItem("token", token);
        navigate("/chats");
      } else {
        if (
          passwordSignup.current.value &&
          passwordSignup.current.value !== confirmedPassword.current.value
        ) {
          return;
        }
        const reqBody = {
          first_name: firstNameSignup.current.value,
          last_name: lastNameSignup.current.value,
          email: emailSignup.current.value,
          password: passwordSignup.current.value
        };

        const response = await serverAxios.post("/api/account/signup/", reqBody);
        const token = response.data.token;
        setAuth(token);
        localStorage.setItem("token", token);
      }
    } catch {}
  };
  return (
    <main className={style.body}>
      <div className={style.bodyContent}>
        <h2>{login ? "Login to your account" : "Create Account"}</h2>
        <Google />
        <div className={style.orContainer}>
          <div></div>
          <p>or</p>
          <div></div>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className={style.sectionTitle}>Use Email</h2>
          {login ? (
            <>
              <div className={style.questionLine}>
                <input placeholder="Email" required={true} ref={emailLogin} />
                <input placeholder="Password" required={true} type="password" ref={passwordLogin} />
              </div>
              <button type="submit">Login</button>
            </>
          ) : (
            <>
              <div className={style.questionLine}>
                <input
                  id="first_name"
                  type="text"
                  required={true}
                  placeholder="First Name"
                  ref={firstNameSignup}
                />
                <input
                  id="last_name"
                  type="text"
                  required={true}
                  placeholder="Last Name"
                  ref={lastNameSignup}
                />
              </div>
              <div className={style.questionLine}>
                <input id="email" placeholder="Email" required={true} ref={emailSignup} />
              </div>

              <div className={style.questionLine}>
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  minLength={8}
                  required={true}
                  ref={passwordSignup}
                />
                <input
                  id="confirm_password"
                  placeholder="Confirm Password"
                  type="password"
                  minLength={8}
                  required={true}
                  ref={confirmedPassword}
                />
              </div>
              <div></div>
              <button type="submit">Sign Up</button>
            </>
          )}
        </form>
      </div>
      <div className={style.imageSection}>
        {login ? (
          <>
            <h3>Welcome!</h3>
            <p>Enter your details and start journey with us</p>
            <button onClick={() => navigate("/account/signup")}>Signup</button>
          </>
        ) : (
          <>
            <h3>Welcome Back!</h3>
            <p>Already have an account </p>
            <button onClick={() => navigate("/account/login")}>Login</button>
          </>
        )}
      </div>
    </main>
  );
}

Account.propTypes = {
  login: PropTypes.bool.isRequired
  // Other prop types...
};

export default Account;
