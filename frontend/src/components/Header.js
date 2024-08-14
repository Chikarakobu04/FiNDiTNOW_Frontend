import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEdit, faSignInAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header({ onNavClick }) {
  return (
    <div>
      <div className="header">
        <button onClick={() => onNavClick('home')}>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <span>ホーム</span>
        </button>
        <button onClick={() => onNavClick('')}>
          <FontAwesomeIcon icon={faSearch} size="2x" />
          <span>探す</span>
        </button>
        <button onClick={() => onNavClick('messageBoard')}>
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
          <span>投稿</span>
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
