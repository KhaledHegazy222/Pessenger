/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import style from "./Chats.module.css";
import { serverAxios } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";
import ChatsList from "../../components/Chat/ChatsList/ChatsList";
import ChatMessages from "../../components/Chat/ChatMessages/ChatMessages";

const ENDPOINT = "http://localhost:3001";
import { io } from "socket.io-client";

function Chats() {
  const { auth, setAuth } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let sendMessageRef = useRef();
  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (token) setAuth(token);
        const response = await serverAxios.get("/api/chats", {
          headers: { Authorization: `Bearer ${auth}` }
        });
        setChats(response.data.chats);
        setIsLoading(false);
      } catch {}
    }
  }, [auth]);

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      query: { token: auth }
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    sendMessageRef.current = (chatID) => {
      socket.emit("chats", chatID);
    };
    socket.on("chats", (data) => {
      setChats(data.chats);
    });

    return () => {
      socket.disconnect();
    };
  }, [auth]);
  return isLoading ? (
    "Loading..."
  ) : (
    <div className={style.pageLayout}>
      <ChatsList chats={chats} />
      <ChatMessages chats={chats} announceMessage={sendMessageRef.current} />
    </div>
  );
}

export default Chats;
