import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ setLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // すべてのフィールドが入力されているかチェック
    if (!name || !email || !password) {
      setError('すべてのフィールドを入力してください');
      return;
    }

    // ユーザーデータをバックエンドに送信するための準備
    const userData = {
      name,
      email,
      password
    };
  
    fetch('http://127.0.0.1:5000/users',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json', // JSON形式のデータのヘッダー
      },
      body: JSON.stringify(data)

    })
    .then(response => {
      if (!response.ok) {
        console.error('サーバーエラー');
      }
      // ここに成功時の処理を記述
      return response.json()
    })
    .catch(error => {
      console.error('通信に失敗しました', error);
    });
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p className="text">Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <p className="text">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <p className="text">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignUp;
