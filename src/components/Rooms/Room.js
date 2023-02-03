import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export function Room(props) {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const messages = useSelector(state => state.messages);

  const loadMessage = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/messages/rooms/${props.room.id}/list`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
      dispatch({ type: "LOAD_MESSAGES", payload: { data: res.data, room_id: props.room.id } })
    })
    return;
  }

  return (
    <div class="row mb-3 room">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{props.room.name} {props.room.unreadMessage > 0 ? <span style={{ color: 'red' }}>({props.room.unreadMessage})</span> : ""}</h5>
            <a href="#" onClick={loadMessage} class="getRoom btn btn-primary">Читать сообщения</a>
          </div>
        </div>
      </div>
    </div>
  )
}
