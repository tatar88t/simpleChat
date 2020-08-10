import React from 'react';
import socket from './socket';
import stl from './style.modules/Chat.module.css'
import { List, ListItem, ListItemText, Button, Chip, Avatar } from '@material-ui/core';
import cn from 'classnames';

function Chat({users, messages, userName, roomId, onAddMessage, outcome}) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

console.log(messages)
  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
      
    });
    onAddMessage({ userName, text: messageValue});
    // console.log(outcome)
    setMessageValue('');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <>
    <div className={stl.chatHeader}>
        Комната: <b>{roomId}</b>
    </div>
    <hr />
    <div className={stl.chat}>
        
      <div className = {stl.netStatus}>
            <b>Онлайн ({users.length}):</b>
            <List > 
                {users.map((name, index) => (
                    <ListItem divider key = {index + name}> 
                        <ListItemText primary={name} />
                    </ListItem>
                ))}

            </List>
      </div>
        
        <div>
            <div className={stl.chatBlock}>
                  <div ref = {messagesRef} className={stl.messagesWindow}>
                      {messages.map((message, index) => (
                          <div key = {index + "_" + Math.random()} 
                        //   className={stl.messageItem}
                          className = {cn({[stl.messageItemOutcome]: message.userName == userName,
                            [stl.messageItem]: message.outcome != message.userName})}>
                          {/* <p>{message.text}</p> */}
                          <Chip label={message.text} 
                          style = {{padding: "28px 8px 28px 4px"}}
                          
                        //   avatar={<Avatar>{message.userName.slice(0,1)}</Avatar>} 
                          onDelete={handleDelete} 
                          color="primary" />
                          <div>
                            <span style = {{color: "grey", fontSize: "11px", marginLeft: "10px"}}>{message.userName}</span>
                          </div>
                        </div>
                          ))
                      }
                  </div>
                  <form className={stl.messageInput}>
                    <textarea
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                      className={stl.textArea}
                      rows="3"></textarea>
                    <div className={stl.btn}>
                        <Button 
                        onClick={onSendMessage} 
                        variant="contained" color="primary"
                        type="button" 
                        >
                          Отправить
                        </Button>
                    </div>
                    
                  </form>
            </div>
        </div>        
    </div>
    </>
  );
}

export default Chat;