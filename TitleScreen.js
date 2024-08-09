import React from 'react';
import './TitleScreen.css';

function TitleScreen({ onLoginClick, onSignUpClick }) {
  return (
    <div className="title-screen">
      <img src="/logo.png" alt="Logo" className="logo" />
    
      <div className="buttons">
        <button onClick={onLoginClick}>Login</button>
        <button onClick={onSignUpClick}>Sign Up</button>
      </div>
    </div>
  );
}

export default TitleScreen;
