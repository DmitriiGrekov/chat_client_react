import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useEffect } from 'react';
import { MessageList } from './components/Message/MessageList';
import { useDispatch, useSelector } from 'react-redux';
import { RoomList } from '../src/components/Rooms/RoomsList';
import { MessageInput } from '../src/components/Message/MessageInput';
import { ModalComponent } from './components/Modal/ModalComponent';
import { CheckUserLogin } from './components/Common/CheckUserLogin';
import { redirect, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const handleExit = (e) => {
    localStorage.setItem('token', '')
    navigate('/')
  }

  const token = localStorage.getItem('token');
  if (!token)
    navigate('/')

  return (
    <div class='container'>
      <div class='row'>
        <div class='col-xl-4'>

          <div class="container mt-3 rooms">
            <ModalComponent />
            <span class='' style={{ marginLeft: '10px' }}>{localStorage.getItem('userLogin')} <a class='btn btn-secondary' onClick={handleExit}>Выйти</a></span>
            <RoomList />
          </div>
        </div>

        <div class='col-xl-8'>
          <div class='chat'>

            <MessageList />
          </div >
          <MessageInput />
        </div >


      </div>
    </div>
  )
}

export default App;
