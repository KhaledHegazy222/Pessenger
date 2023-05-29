/* eslint-disable */
import React, { useEffect, useState } from "react";
import style from "./ChatMessages.module.css";
import { useParams } from "react-router";
function ChatMessages({ chats }) {
  const { chatID } = useParams();
  const [selectedChat, setSelectedChat] = useState({});
  useEffect(() => {
    if (chatID) {
      setSelectedChat(chats.find((chat) => chat._id === chatID));
    }
  }, [chatID, chats]);
  return (
    <div className={style.body}>
      {selectedChat._id !== undefined ? (
        <>
          <header>
            <h2>{selectedChat.name}</h2>
          </header>
          <ul>
            {selectedChat.messages.map((message) => {
              return <p key={message._id}>{message.content}</p>;
            })}
          </ul>
        </>
      ) : (
        <>Click on chat to start messaging</>
      )}
    </div>
  );
}

export default ChatMessages;
