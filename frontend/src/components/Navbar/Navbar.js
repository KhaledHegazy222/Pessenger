import React from "react";
import style from "./Navbar.module.css";
function Navbar() {
  return (
    <nav className={style.body}>
      <div className={style.logoContainer}>
        <h2>Pessenger</h2>
      </div>
      <ul className={style.navList}>
        <li>About</li>
        <li>Why we</li>
        <li>How it works</li>
      </ul>
      <button>Join Now</button>
    </nav>
  );
}

export default Navbar;
