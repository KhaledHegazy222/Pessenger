import React, { useEffect, useState } from "react";
import style from "./Chats.module.css";
import { serverAxios } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";
import ChatsList from "../../components/Chat/ChatsList/ChatsList";
import ChatMessages from "../../components/Chat/ChatMessages/ChatMessages";
function Chats() {
  const { auth, setAuth } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(error.toString());
      }
    }
  }, [auth]);
  return isLoading ? (
    "Loading..."
  ) : (
    <div className={style.pageLayout}>
      <ChatsList chats={chats} />
      <ChatMessages chats={chats} />
    </div>
  );
}

export default Chats;
