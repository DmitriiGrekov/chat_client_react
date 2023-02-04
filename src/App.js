import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useEffect } from "react";
import { MessageList } from "./components/Message/MessageList";
import { useDispatch, useSelector } from "react-redux";
import { RoomList } from "../src/components/Rooms/RoomsList";
import { MessageInput } from "../src/components/Message/MessageInput";
import { ModalComponent } from "./components/Modal/ModalComponent";
import { CheckUserLogin } from "./components/Common/CheckUserLogin";
import { redirect, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  const handleExit = (e) => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  if (!token) navigate("/");

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.data);
  const currentRoomId = useSelector((state) => state.roomId);
  let currentRoomName = "";
  if (currentRoomId)
    currentRoomName =
      rooms.find((room) => room.id === currentRoomId).name ?? "";

  useEffect(() => {
    let socket = io(`${process.env.REACT_APP_SOCKET_URL}/chat`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", function() {
      console.log('connect site')
    });
    socket.on("chatsUnreadedMessage", function(data) {
      console.log(data)
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/rooms/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({ type: "LOAD_ROOM", payload: res.data });
        });
    });

    socket.on("disconnect", function() {
      console.log('disconnect site')
    });
    return () => {
      socket.disconnect(true);
    };
  }, [rooms, token, dispatch]);

  return (
    <div class="container">
      <div class="row">
        <div class="col-xl-4">
          <div class="container mt-3 rooms">
            <ModalComponent />
            <span class="" style={{ marginLeft: "10px" }}>
              {localStorage.getItem("userLogin")}{" "}
              <a class="btn btn-secondary" onClick={handleExit}>
                Выйти
              </a>
            </span>
            <RoomList />
          </div>
        </div>

        <div class="col-xl-8">
          <h5 class="mt-3">{currentRoomName}</h5>
          <div class="chat">
            <MessageList />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default App;
