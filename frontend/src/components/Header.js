import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEdit, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header({ onNavClick }) {
  return (
    <div>
      <div className="header">
        <button onClick={() => onNavClick('home')}>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <span>ホーム</span>
        </button>
        <button onClick={() => onNavClick('login')}>
          <FontAwesomeIcon icon={faSignInAlt} size="2x" />
          <span>ログイン</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
