import React from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function Navbar() {
  const navigate = useNavigate();
  const { user, setAuth } = useAuth();
  const logout = () => {
    localStorage.clear("token");
    setAuth(null);
  };
  return (
    <nav className={style.body}>
      <Link to="/" className={style.logoContainer}>
        <h2>Pessenger</h2>
      </Link>
      <ul className={style.navList}>
        <li>About</li>
        <li>Why we</li>
        <li>How it works</li>
      </ul>
      {user === null ? (
        <button onClick={() => navigate("/account/signup")}>Join Now</button>
      ) : (
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
