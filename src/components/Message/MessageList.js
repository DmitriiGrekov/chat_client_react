import React, { useEffect } from 'react';
import { Message } from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export function MessageList(props) {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  // const userId = useSelector(state => state.userId);
  const userId = localStorage.getItem('userId')
  let flag = false;
  const roomId = useSelector(state => state.roomId);
  const token = localStorage.getItem('token')
  console.log(messages);

  useEffect(() => {
    const chatBlock = document.querySelector('.chat');
    chatBlock.scrollTop = chatBlock.scrollHeight;
    let socket = io(`${process.env.REACT_APP_SOCKET_URL}/message?room_id=${roomId}`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.on('connect', function() {
      console.log('Connected Message');
    });
    socket.on('message', function(data) {
      dispatch({ type: "GET_SOCKET_MESSAGE", payload: [data] })
    });

    socket.on('disconnect', function() {
      console.log('Disconnected');
    });
    return () => {
      socket.disconnect(true);
    }
  }, [messages, dispatch, roomId]
  )

  return (
    messages.map((message) => {
      const userPrefix = +userId === message.user_id ? 'user-2' : 'user-1';
      return (
        <Message message={message} userPrefix={userPrefix} />
      )
    })
  )
}

