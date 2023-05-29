/* eslint-disable */
import React from "react";
import style from "./ChatsList.module.css";
import profileImage from "../../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
function ChatsList({ chats }) {
  const navigate = useNavigate();
  return (
    <div className={style.body}>
      <header>
        <h2>Messages</h2>
      </header>
      <ul>
        {chats.map((chat) => {
          return (
            <li
              key={chat._id}
              onClick={() => {
                navigate(`/chats/${chat._id}`);
              }}>
              <img src={profileImage} />
              <p>{chat.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatsList;
