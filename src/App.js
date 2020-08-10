import React, {Component, useReducer, useEffect, useState} from 'react';
import socket from "./components/socket"
import axios from "axios";
import JoinBlock from './components/JoinBlock';
import reducer from "./components/reducer";
import Chat from './components/Chat';
import messages from './components/initmessages';


function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined : false,
    roomId: null,
    userName: null,
    users: [],
    messages
  });


  const [roomId, setRoomId] = useState('');
console.log(state.messages, "INIT_MESSAGES")

state.messages.forEach(item => console.log(item))


const onLogin = async (obj) => {
    dispatch({
        type: "JOINED",
        payload: obj
    });
    socket.emit("ROOM:JOIN", obj);
    const {data} = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users)
};

const setUsers = (users) => {
  dispatch({
    type: "SET_USERS",
    payload: users,
  })
};

const addMessage = (message) => {
  dispatch({
    type: "NEW_MESSAGE",
    payload: message
  })
  console.log(message, "MESSAGE")
}



useEffect(() => {
  socket.on("ROOM:SET_USERS", setUsers);
  socket.on("ROOM:NEW_MESSAGE", addMessage);
}, []);

window.socket = socket;


   return (
    <div className="App">
      {!state.joined ? <JoinBlock onLogin = {onLogin} /> : <Chat {...state} onAddMessage = {addMessage}/>}
    </div>
  );
}

export default App;
