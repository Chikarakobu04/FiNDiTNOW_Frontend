import React, { useState } from 'react';
import './Post.css';

function Post({ messages, addMessage }) {
  const [place, setPlace] = useState('');
  const [lostitem, setLostitem] = useState('');
  //const [newMessage,setNewMessage] = useState('');
  const [image, setImage] = useState(null); // 画像の状態を管理するステート

  const handleSubmit = (event) => {
    event.preventDefault();
    if (lostitem.trim() !== '' || image) {
      const messageObject = {
        place: place,
        text: lostitem,
        image: URL.createObjectURL(image) // 画像を表示するためにBlob URLを作成
      };
      addMessage(messageObject);
      setPlace('');
      setLostitem('');
      setImage(null); // 送信後に画像フィールドをリセット
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // 選択された画像をステートに保存
  };

  return (
    <div className="message-board">
      <div className='making-post'>
        <h2>落とし物投稿の作成</h2>
        <form onSubmit={handleSubmit}>

          <p class="text">画像を投稿</p>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <br></br>

          <p class="text">拾った場所</p>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="場所を入力"
          />

          <p class="text">拾ったモノ</p>
          <input
            type="text"
            value={lostitem}
            onChange={(e) => setLostitem(e.target.value)}
            placeholder="例）ハンカチ、イヤホン、家の鍵..."
          />

          <br></br>
          <br></br>
          <button type="submit">投稿</button>
        </form>
        
        {/* <div className='posted'>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.image && (
                <img src={message.image} alt="投稿された画像" className="uploaded-image" />
              )}
              <p><strong>場所:</strong> {message.place}</p>
              <p><strong>モノ:</strong> {message.text}</p>
            </li>
          ))}
        </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Post;