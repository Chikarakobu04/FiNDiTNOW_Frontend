import React, { useState } from 'react';
import './SignUp.css';

function SignUp({ setLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // 簡易的なユーザー作成ロジック
    if (name && email && password) {

      let data = {
        "user_name":name,
        "user_email":email,
        "user_password":password
      }
  
      fetch('http://127.0.0.1:5000/users',{
        method: 'post',
        headers: {
          'Content-Type': 'application/json', // JSON形式のデータのヘッダー
        },
        body: JSON.stringify(data)
  
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
      })

      // 仮にアカウント作成成功とする
      console.log('Account created:', { name, email, password });
      setLoggedIn(true);
    } else {
      setError('All fields are required');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p class="text">Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <p class="text">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <p class="text">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignUp;
