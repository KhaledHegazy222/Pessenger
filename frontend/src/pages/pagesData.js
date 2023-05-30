import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Account from "../components/Account";
import Chats from "./Chats";

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
  },
  {
    name: "Chats",
    path: "/chats/:chatID?",
    element: (
      <>
        <Navbar />
        <Chats />
      </>
    )
  }
];

export default pagesData;
