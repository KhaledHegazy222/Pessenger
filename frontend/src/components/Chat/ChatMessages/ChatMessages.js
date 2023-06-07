/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import style from "./ChatMessages.module.css";
import { useParams } from "react-router";
import { serverAxios } from "../../../utils/";
import { useAuth } from "../../../contexts/AuthContext";
import profileImage from "../../../assets/images/profile.png";
import messageImage from "../../../assets/gifs/message.gif";
import { Check, SendFill } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function ChatMessages({ chats, setChats, announceMessage, connected }) {
  const { chatID } = useParams();
  const { auth, user } = useAuth();
  const [selectedChat, setSelectedChat] = useState({});

  const messageListRef = useRef();
  const messageInputRef = useRef();

  useEffect(() => {
    if (chatID) {
      const chat = chats.find((chat) => chat._id === chatID);
      if (chat) setSelectedChat(chat);
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
      const content = messageInputRef.current.value;
      setChats((prev) => {
        const copy = structuredClone(prev);
        let chatIndex = copy.findIndex((chat) => chat._id === chatID);
        copy[chatIndex].last_updated = Date.now();

        chatIndex = copy.findIndex((chat) => chat._id === chatID);
        copy[chatIndex].messages.push({
          _id: uuidv4(),
          content,
          from: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name
          },
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
      setChats((prev) => {
        const copy = structuredClone(prev);

        let chatIndex = copy.findIndex((chat) => chat._id === chatID);
        copy[chatIndex].last_updated = Date.now();

        chatIndex = copy.findIndex((chat) => chat._id === chatID);
        copy[chatIndex].messages[copy[chatIndex].messages.length - 1] = {
          _id: uuidv4(),
          content,
          from: {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name
          },
          pending: false
        };
        return copy;
      });
      announceMessage(chatID);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={style.body}>
      {selectedChat._id !== undefined ? (
        <>
          <header>
            <h2>{selectedChat.name}</h2>
            {connected ? (
              <p className={style.connected}>Connected</p>
            ) : (
              <p className={style.disconnected}>
                Disconnected
                <Spinner className={style.spinner} />
              </p>
            )}
          </header>

          <ul ref={messageListRef}>
            {selectedChat.messages.map((message) => {
              return (
                <li
                  key={message._id}
                  className={
                    message.from._id === user._id ? style.userMessage : style.othersMessage
                  }>
                  <div className={style.messageBody}>
                    {user._id !== message.from._id && (
                      <h2>{`${message.from.first_name} ${message.from.last_name}`}</h2>
                    )}
                    {message.content}
                  </div>
                  <div className={message.pending ? style.messagePending : style.messageSent}>
                    {!message.pending && message.from._id === user._id && <Check />}
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
