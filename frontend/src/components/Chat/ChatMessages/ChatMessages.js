/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import style from "./ChatMessages.module.css";
import { useParams } from "react-router";
import { serverAxios } from "../../../utils/";
import { useAuth } from "../../../contexts/AuthContext";
import profileImage from "../../../assets/images/profile.png";
import { SendFill } from "react-bootstrap-icons";

function ChatMessages({ chats, announceMessage }) {
  const { chatID } = useParams();
  const { auth } = useAuth();
  const [selectedChat, setSelectedChat] = useState({});
  const [user, setUser] = useState({});
  const messageListRef = useRef();
  const messageInputRef = useRef();
  useEffect(() => {
    if (chatID) {
      setSelectedChat(chats.find((chat) => chat._id === chatID));
    }
    fetchUser();
    async function fetchUser() {
      try {
        const response = await serverAxios("/api/account/user", {
          headers: { Authorization: `Bearer ${auth}` }
        });
        setUser(response.data);
      } catch {}
    }
  }, [chatID, chats]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  });
  const handleSend = async (e) => {
    e.preventDefault();

    if (messageInputRef.current.value === "") {
      return;
    }
    try {
      const reqBody = {
        content: messageInputRef.current.value
      };
      messageInputRef.current.value = "";
      await serverAxios.post(`api/chats/${chatID}/messages/new`, reqBody, {
        headers: { Authorization: `Bearer ${auth}` }
      });
    } catch {}
    announceMessage(chatID);
  };

  return (
    <div className={style.body}>
      {selectedChat._id !== undefined ? (
        <>
          <header>
            <h2>{selectedChat.name}</h2>
          </header>
          <ul ref={messageListRef}>
            {selectedChat.messages.map((message) => {
              return (
                <li
                  key={message._id}
                  className={message.from === user._id ? style.userMessage : style.othersMessage}>
                  <div>
                    {/* {message.from !== user._id && <img src={profileImage} />} */}
                    <p>{message.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <form className={style.sendBar} onSubmit={handleSend}>
            <input placeholder="Aa" ref={messageInputRef} />
            <button type="submit">
              <SendFill />
            </button>
          </form>
        </>
      ) : (
        <>Click on chat to start messaging</>
      )}
    </div>
  );
}

export default ChatMessages;
