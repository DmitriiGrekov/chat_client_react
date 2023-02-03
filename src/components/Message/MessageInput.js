import React, { Component } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Room } from '../Rooms/Room'

export function MessageInput(props) {

  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  // const token = useSelector(state => state.token);
  const roomId = useSelector(state => state.roomId);
  const messages = useSelector(state => state.messages);
  const token = localStorage.getItem('token')

  console.log(roomId);
  const handleSubmit = (e) => {
    e.preventDefault();
    const targetElement = e.target;
    const form = new FormData(targetElement);
    const textarea = targetElement.querySelector('textarea');
    textarea.value = '';

    axios.post(`${process.env.REACT_APP_SERVER_URL}/messages/send/`, { room_id: +roomId, message: form.get('text') }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
    })
    return
  }
  return (
    <div class="row mt-2">
      <form class="d-flex mt-2" role="search" onSubmit={handleSubmit}>
        <textarea name='text' id="messageText" class="form-control me-2" placeholder="Введите сообщение" aria-label="Search"></textarea>
        <input type="submit" class='btn btn-primary' value="Отправить" />
      </form>
    </div>

  )

}
