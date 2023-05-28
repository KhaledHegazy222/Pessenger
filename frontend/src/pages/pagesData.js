import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Landing-Page/Hero";
import Account from "../components/Account";

const pagesData = [
  {
    name: "Home",
    path: "/",
    element: (
      <>
        <Navbar />
        <Hero />
      </>
    )
  },
  {
    name: "Login Account",
    path: "/account/login",
    element: (
      <>
        <Navbar />
        <Account login={true} />
      </>
    )
  },
  {
    name: "Signup Account",
    path: "/account/signup",
    element: (
      <>
        <Navbar />
        <Account login={false} />
      </>
    )
  }
];

export default pagesData;
