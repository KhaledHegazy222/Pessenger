import React, { useRef } from "react";
import PropTypes from "prop-types";
import style from "./Account.module.css";
import googleIcon from "../../assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import axios from "axios";

function Account({ login }) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const firstNameSignup = useRef();
  const lastNameSignup = useRef();
  const emailSignup = useRef();
  const passwordSignup = useRef();
  const confirmedPassword = useRef();
  const emailLogin = useRef();
  const passwordLogin = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        const reqBody = {
          email: emailLogin.current.value,
          password: passwordLogin.current.value
        };

        const response = await axios.post("http://localhost:3001/api/account/login/", reqBody);
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

        const response = await axios.post("http://localhost:3001/api/account/signup/", reqBody);
        const token = response.data.token;
        setAuth(token);
        localStorage.setItem("token", token);
        navigate("/chats");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };
  return (
    <main className={style.body}>
      <div className={style.bodyContent}>
        <h2>{login ? "Login to your account" : "Create Account"}</h2>
        <h2></h2>
        <div className={style.signupWithGoogle}>
          <img src={googleIcon} />
          <h3>Continue with Google</h3>
        </div>
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
                <input placeholder="Email" ref={emailLogin} />
                <input placeholder="Password" type="password" ref={passwordLogin} />
              </div>
              <button>Login</button>
            </>
          ) : (
            <>
              <div className={style.questionLine}>
                <input type="text" placeholder="First Name" ref={firstNameSignup} />
                <input type="text" placeholder="Last Name" ref={lastNameSignup} />
              </div>
              <div className={style.questionLine}>
                <input placeholder="Email" ref={emailSignup} />
              </div>

              <div className={style.questionLine}>
                <input placeholder="Password" type="password" ref={passwordSignup} />
                <input placeholder="Confirm Password" type="password" ref={confirmedPassword} />
              </div>
              <div></div>
              <button>Sign Up</button>
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
