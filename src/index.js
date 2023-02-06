import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth } from './components/Auth/Auth'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Register } from './components/Register/Register';


const defaultState = {
  token: '',
  data: [],
  messages: [],
  userId: null,
  roomId: null,
  modalShow: false,
  findUsers: [],
  errorLoginMessage: '',
  errorLoginMessageVisible: 'none'
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOAD_ROOM":
      return { ...state, data: action.payload }
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload.data, roomId: action.payload.room_id }
    case "SEND_MESSAGE":
      return { ...state, messages: [action.payload] }
    case "GET_SOCKET_MESSAGE":
      return { ...state, messages: [...state.messages, ...action.payload] }
    case "SET_TOKEN":
      return { ...state, token: action.payload.access_token };
    case "MODAL_SHOW":
      return { ...state, modalShow: action.payload }
    case "FIND_USERS_ADD":
      return { ...state, findUsers: [...action.payload] }
    case "ADD_NEW_ROOM":
      return { ...state, data: [...action.payload, ...state.data] }
    case "GET_MESSAGE_NEW_ROOM":
      return { ...state, roomId: action.payload }
    case "SET_ERROR_MESSAGE_LOGIN":
      return { ...state, errorLoginMessage: action.payload.errorLoginMessage, errorLoginMessageVisible: action.payload.errorLoginMessageVisible }
    default:
      return state;
  }

}
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Provider store={store}>
          <Auth />
        </Provider>
      }></Route>
      <Route path="/register" element={
        <Provider store={store}>
          <Register />
        </Provider>
      }></Route>
      <Route path="/main" element={
        <div>
          <Provider store={store}>
            < App />
          </Provider>
        </div>

      }></Route>
    </Routes>
  </BrowserRouter>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
