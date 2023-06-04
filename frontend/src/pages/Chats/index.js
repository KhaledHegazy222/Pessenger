/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import style from "./Chats.module.css";
import { serverAxios } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";
import ChatsList from "../../components/Chat/ChatsList/ChatsList";
import ChatMessages from "../../components/Chat/ChatMessages/ChatMessages";
import { io } from "socket.io-client";
import withAuth from "../../HOC/withAuth";
import { toast } from "react-toastify";

const ENDPOINT = process.env.REACT_APP_API_URL;

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
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  }, [auth]);

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ["websocket"],
      query: { token: auth }
    });
    sendMessageRef.current = (chatID, refresh = false) => {
      socket.emit("chats", { chatID, refresh });
    };
    socket.on("chats", (data) => {
      setChats(data.chats);
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });
    return () => {
      socket.disconnect();
    };
  }, [auth]);
  return isLoading ? (
    "Loading..."
  ) : (
    <div className={style.pageLayout}>
      <ChatsList chats={chats} announceMessage={sendMessageRef.current} />
      <ChatMessages chats={chats} setChats={setChats} announceMessage={sendMessageRef.current} />
    </div>
  );
}

export default withAuth(Chats);
