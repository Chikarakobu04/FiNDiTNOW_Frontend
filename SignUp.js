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

    try {
      // バックエンドAPIにデータを送信
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // 認証が成功した場合
        setLoggedIn(true); // ログイン状態にする
      } else {
        // 認証が失敗した場合、エラーメッセージを表示
        setError(data.message || 'サインアップに失敗しました');
      }
    } catch (error) {
      // サーバーエラーが発生した場合
      setError('サーバーに接続できませんでした');
    }
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
