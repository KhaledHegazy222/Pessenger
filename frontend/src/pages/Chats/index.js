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
import { Spinner } from "react-bootstrap";
const ENDPOINT = process.env.REACT_APP_API_URL;

function Chats() {
  const { auth, setAuth } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connected, setConnected] = useState(true);
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
    try {
      const socket = io(ENDPOINT, {
        transports: ["websocket"],
        query: { token: auth }
      });
      sendMessageRef.current = (chatID, refresh = false) => {
        socket.emit("chats", { chatID, refresh });
      };

      socket.on("connect", () => {
        console.log("Connected to server");
        setConnected(true);
      });
      socket.on("connect_error", (err) => {
        console.log("Can't connect");
        setConnected(false);
      });
      socket.on("chats", (data) => {
        setChats(data.chats);
      });
    } catch (error) {
      // console.log(error);
    }

    return () => {};
  }, [auth]);
  return isLoading ? (
    <div className={style.spinnerBody}>
      <Spinner />
    </div>
  ) : (
    <div className={style.pageLayout}>
      <ChatsList chats={chats} announceMessage={sendMessageRef.current} />
      <ChatMessages
        chats={chats}
        setChats={setChats}
        announceMessage={sendMessageRef.current}
        connected={connected}
      />
    </div>
  );
}

export default withAuth(Chats);
