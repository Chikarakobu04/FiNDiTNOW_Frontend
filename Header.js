import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header({ onNavClick }) {
  return (
    <div>
      <div className="header">
        <button onClick={() => onNavClick('home')}>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <span>Home</span>
        </button>
        <button onClick={() => onNavClick('postList')}>
          <FontAwesomeIcon icon={faSearch} size="2x" />
          <span>Search</span>
        </button>
        <button onClick={() => onNavClick('messageBoard')}>
          <FontAwesomeIcon icon={faEdit} size="2x" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
