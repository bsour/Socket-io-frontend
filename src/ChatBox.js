import React, { useState, useEffect, useRef } from 'react';
import { socket } from './socketConfig';

function ChatBox({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messageRef = useRef();

  useEffect(() => {
    socket.on('messageHistory', (messageHistory) => {
      setMessages(messageHistory);
    });

    socket.on('newMessage', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off('messageHistory');
      socket.off('newMessage');
    };
  }, []);

  function sendMessage() {
    if (message) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  }

  return (
    <div>
      <div ref={messageRef} style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;
