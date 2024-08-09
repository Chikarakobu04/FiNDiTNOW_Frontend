import React from 'react';
import './Header.css';

function Header({ onNavClick }) {
  return (
    <div className="header">
      <button onClick={() => onNavClick('home')}>Home</button>
      <button onClick={() => onNavClick('postList')}>Search</button>
      <button onClick={() => onNavClick('messageBoard')}>Edit</button>
    </div>
  );
}

export default Header;
