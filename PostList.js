import React from 'react';
import './PostList.css';

function PostList({ messages }) {
  return (
    <div className="post-list">
      <h1>投稿一覧</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <h2>投稿 {index + 1}</h2>
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

export default PostList;
