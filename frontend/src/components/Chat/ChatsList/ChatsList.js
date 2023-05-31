/* eslint-disable */
import React, { useEffect, useState } from "react";
import style from "./ChatsList.module.css";
import Popup from "../../Popup";
import profileImage from "../../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../../../contexts/AuthContext";
import { serverAxios } from "../../../utils";

function ChatsList({ chats, announceMessage }) {
  const navigate = useNavigate();
  const { auth, user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
    async function fetchUsers() {
      const response = await serverAxios.get("/api/account/");

      setUsers(
        response.data
          .filter((element) => element._id !== user._id)
          .map((user) => {
            return { value: user._id, label: `${user.first_name} ${user.last_name}` };
          })
      );
    }
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedUsers(selectedOption);
  };

  const handleAddChat = async (e) => {
    e.preventDefault();
    const reqBody = {
      name: chatName,
      members: selectedUsers.map((user) => user.value)
    };
    const response = await serverAxios.post("/api/chats/new", reqBody, {
      headers: { Authorization: `Bearer ${auth}` }
    });

    setChatName("");
    setSelectedUsers([]);

    announceMessage(response.data.chat._id, true);

    setShowDialog(false);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "300px"
    })
  };
  return (
    <>
      <Popup trigger={showDialog}>
        <div className={style.popupBody}>
          <h2>Create Chat</h2>
          <form onSubmit={handleAddChat}>
            <div>
              <label>Chat Name</label>
              <input
                type="text"
                required={true}
                value={chatName}
                onChange={(e) => {
                  setChatName(e.target.value);
                }}
              />
            </div>
            <div>
              <Select
                options={users}
                isSearchable
                isMulti
                value={selectedUsers}
                onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Members"
              />
            </div>
            <div>
              <button type="submit">Create</button>
              <button
                type="button"
                onClick={() => {
                  setShowDialog(false);
                }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Popup>
      <div className={style.body}>
        <header>
          <h2>Messages</h2>
          <div>
            <button onClick={() => setShowDialog(true)}>Add Chat</button>
          </div>
        </header>
        <ul>
          {chats
            .sort((a, b) => {
              const a_date = new Date(a.last_updated);
              const b_date = new Date(b.last_updated);
              return b_date - a_date;
            })
            .map((chat) => {
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
    </>
  );
}

export default ChatsList;
