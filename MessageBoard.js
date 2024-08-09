import React, { useState } from 'react';
import './MessageBoard.css';

function MessageBoard({ messages, addMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState(null); // 画像の状態を管理するステート

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '' || image) {
      const messageObject = {
        text: newMessage,
        image: URL.createObjectURL(image) // 画像を表示するためにBlob URLを作成
      };
      addMessage(messageObject);
      setNewMessage('');
      setImage(null); // 送信後に画像フィールドをリセット
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // 選択された画像をステートに保存
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
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">送信</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.image && (
              <img src={message.image} alt="投稿された画像" className="uploaded-image" />
            )}
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageBoard;
