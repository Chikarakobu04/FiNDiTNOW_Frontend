import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';

function Header({ onNavClick }) {
  const [selectedItem, setSelectedItem] = useState('');
  const [location, setLocation] = useState('');

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePost = () => {
    console.log('Posting:', { selectedItem, location });
  };

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

      <div className="upload-section">
        <p className="upload-title">画像を投稿</p>
        <button className="upload-button">
          <FontAwesomeIcon icon={faUpload} size="2x" />
          <span>Upload Image</span>
        </button>
        <p className="upload-description">モノ</p>
        <select className="item-select" value={selectedItem} onChange={handleSelectChange}>
          <option value="">Value</option>
          <option value="item1">財布</option>
          <option value="item2">鍵</option>
          <option value="item3">筆記用具</option>
          <option value="item4">イヤホン</option>
        </select>

        <p className="location-label">場所</p>
        <input 
          type="text" 
          className="location-input" 
          value={location} 
          onChange={handleLocationChange} 
          placeholder="Value"
        />

        <button className="post-button" onClick={handlePost}>
          投稿
        </button>
      </div>
    </div>
  );
}

export default Header;