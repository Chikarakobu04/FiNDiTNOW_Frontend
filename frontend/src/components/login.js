import React, { useState } from 'react';
import './login.css';

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // const params = {q : "嫌われる勇気"};
    // const query = new URLSearchParams(params);

    // fetch('http://127.0.0.1:5000/users/'{
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json' // JSON形式のデータのヘッダー
    //   },
    //   body: JSON.stringify(data)

    // })
    // .then(response => {
    //   return response.json()
    // })
    // .then(data => {
    //   console.log(data);
    // })

    // フロントエンドでの簡易的な認証
    if (email === 'a@example.com' && password === '123') {
      setLoggedIn(true);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Value"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Value"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}

      {/* Forgot password link */}
      <div className="forgot-password">
        <a href="#forgot-password">Forgot password?</a>
      </div>
    </div>
  );
}

export default Login;