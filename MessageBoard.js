import React, { useState } from 'react';
import './MessageBoard.css';

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMsg = { text: newMessage };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="message-board">
      <h1>掲示板</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="メッセージを入力"
        />
        <button type="submit">送信</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessageBoard;
