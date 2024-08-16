import React, { useState, useEffect } from 'react';
import './Search.css';

function Search({ }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [itemName, setItemName] = useState('');
    const [locationName, setLocationName] = useState('');

    const handleBoxClick = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleSearch = (event) => {
        event.preventDefault();  // フォーム送信のデフォルト動作を防ぐ
        console.log('Searching for:', itemName, locationName);
        
        // 検索処理を行った後、検索ボックスを元に戻す
        setIsExpanded(false);
    };

    return (
        <div className="search-screen">
            {isExpanded && <div className="overlay" onClick={handleClose}></div>}
            <div 
                className={`search-box ${isExpanded ? 'expanded' : ''}`}
                onClick={handleBoxClick}
            >
                {isExpanded ? (
                    <div className="expanded-content">
                        <form onSubmit={handleSearch}>
                            <input 
                                type="text" 
                                placeholder="Item name" 
                                value={itemName} 
                                onChange={(e) => setItemName(e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Location" 
                                value={locationName} 
                                onChange={(e) => setLocationName(e.target.value)} 
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                ) : (
                    <span>Click to search</span>
                )}
            </div>
        </div>
    );
}

export default Search;
