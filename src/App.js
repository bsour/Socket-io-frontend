import React, { useState } from 'react';
import ChatBox from './ChatBox';
import { socket } from './socketConfig';

function App() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  function joinRoom() {
    if (roomId && username) {
      socket.emit('joinRoom', { roomId, username });
      setJoined(true);
    }
  }

  if (joined) {
    return <ChatBox username={username} />;
  }

  return (
    <div className="App">
      <input 
        value={roomId} 
        onChange={e => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <input 
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter Your Name"
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

export default App;
