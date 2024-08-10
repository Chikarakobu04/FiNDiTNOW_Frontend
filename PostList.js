import React, { useState } from 'react';
import './PostList.css';

function PostList({ messages }) {
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリのステート

  // 検索クエリに基づいてメッセージをフィルタリング
  const filteredMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="post-list">
      
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
        />
      </div>
      <ul>
        {filteredMessages.map((message, index) => (
          <li key={index} className="post-item">
            <div className="post-content">
              <div className="message-text">
                <p>{message.text}</p>
              </div>
              {message.image && (
                <div className="image-container">
                  <img src={message.image} alt="投稿された画像" className="uploaded-image" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
