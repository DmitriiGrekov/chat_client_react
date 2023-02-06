import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Room } from "./Room";
// axios.get('http://localhost:8000/rooms/list', { headers: { Authorization: `Bearer ${this.state.token}` } }).then(res => {
import { io } from "socket.io-client";

export function RoomList(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  // const token = useSelector(state => state.token);
  const token = localStorage.getItem("token");
  const roomId = useSelector((state) => state.roomId);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/rooms/list?sort={"created_at": "desc"}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: "LOAD_ROOM", payload: res.data });
      });

    const url = `${process.env.REACT_APP_SOCKET_URL}/rooms`;
    const socket = io(url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.on("connect", function() { });

    socket.on("addUserRoom", function(data) {
      dispatch({ type: "ADD_NEW_ROOM", payload: [data] });
    });

    return () => {
      socket.disconnect(true);
    };
  }, [roomId, token, dispatch]);

  return data.map((room) => {
    return (
      <div class="mt-3">
        <Room room={room} />
      </div>
    );
  });
}
