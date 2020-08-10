import React, {Component, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
// import {Button} from "uikit-react";
// import UIKit from "uikit";

import {Button} from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabsMaterial';
import SelectMember from './SelectMember'
import SubmitButtonLarge from './SubmitButtonLarge';
const JoinBlock = ({onLogin}) => {


    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const setChat = (chatname) => {
        setRoomId(chatname) 
        console.log(roomId)
      }
    
    const setEmployee = (user) => {
        setUserName(user) 
        console.log(userName)
    }
    console.log(userName)
    const onEnter = async() => {
        if (!roomId || !userName) {
            return alert ("Choose Chat-Room & userName / Выберите наименование чата и имя пользователя")
        }
        const obj = {
            roomId,
            userName
        };
        setLoading(true);
        await axios.post('/rooms', obj)
        onLogin(obj);
    }
    
    return (
        <div className ="join-block">
            <TabPanel setChat = {setChat}/>
            
            {/* <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            /> */}

            <SelectMember setEmployee = {setEmployee}/>
            {/* <input
              type="text"
              placeholder="Ваше имя"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            /> */}
            <SubmitButtonLarge onEnter={onEnter} isloading={isLoading} />
            {/* <button 
                    disabled={isLoading} 
                    onClick={onEnter} 
                    >
              {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
            
            </button> */}
      </div>
    )
}

export default JoinBlock;
