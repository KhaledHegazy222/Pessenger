/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import style from "./ChatMessages.module.css";
import { useParams } from "react-router";
import { serverAxios } from "../../../utils/";
import { useAuth } from "../../../contexts/AuthContext";
import profileImage from "../../../assets/images/profile.png";
import messageImage from "../../../assets/gifs/message.gif";
import { SendFill } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";

function ChatMessages({ chats, setChats, announceMessage }) {
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
      setChats((prev) => {
        const copy = structuredClone(prev);
        const chatIndex = copy.findIndex((chat) => chat._id === chatID);

        copy[chatIndex].messages.push({
          _id: uuidv4(),
          content: messageInputRef.current.value,
          from: user._id,
          pending: true
        });
        return copy;
      });
      const reqBody = {
        content: messageInputRef.current.value
      };
      messageInputRef.current.value = "";
      await serverAxios.post(`api/chats/${chatID}/messages/new`, reqBody, {
        headers: { Authorization: `Bearer ${auth}` }
      });

      announceMessage(chatID);
    } catch {}
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
                    <div>{message.pending ? "Pending" : "Sent"}</div>
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
        <>
          <div className={style.noChatContainer}>
            <img src={messageImage} />
            <h2>Start chatting now!</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatMessages;
