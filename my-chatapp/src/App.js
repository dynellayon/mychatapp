import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobbhy from './Components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Chat from './Components/Chat';
function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7262/chat")
        .configureLogging(LogLevel.Information)
        .build();
      console.log(connection);
      connection.on("ReceiveMessage", (user, message) => {
        console.log('message receive:', message);
        setMessages(messages => [...messages, { user, message }]);
      });
      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke('JoinRoom', { user, room })
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  }
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='app'>
      <h2>My Chat</h2>
      <hr className='line' />
      {!connection
        ? <Lobbhy joinRoom={joinRoom} />
        : <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />
      }
    </div>
  );
}

export default App;
