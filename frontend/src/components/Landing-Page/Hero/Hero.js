import React from "react";
import style from "./Hero.module.css";
import heroImage from "../../../assets/images/hero.jpg";
import { ChatLeftTextFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section className={style.body}>
      <div className={style.sectionContent}>
        <h1>Stay Connected with your friends and family</h1>
        <p>
          Stay connected with your friends, family, or coworkers wherever you are for free and
          quickly
        </p>
        <button onClick={() => navigate("/account/login")}>
          <ChatLeftTextFill /> <span>Start Messaging</span>
        </button>
      </div>
      <div className={style.imageContainer}>
        <img src={heroImage} />
      </div>
    </section>
  );
}

export default Hero;
