import React from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
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
      <button onClick={() => navigate("/account/signup")}>Join Now</button>
    </nav>
  );
}

export default Navbar;
