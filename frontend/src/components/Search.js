import React, { useState, useEffect } from 'react';
import './Search.css';

function Search({ }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [liName, setLiName] = useState('');
    const [liPlace, setLiPlace] = useState('');
    const [lostItems, setLostItems] = useState('');
    const [error, setError] = useState('');

    const handleBoxClick = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleSearch = (event) => {
        event.preventDefault();  // フォーム送信のデフォルト動作を防ぐ
        console.log('Searching for:', liName, liPlace);
        
        // すべてのフィールドが入力されているかチェック
        if (!liName || !liPlace) {
            setError('すべてのフィールドを入力してください');
            return;
        }

        // const params = {liName : liName, liPlace: liPlace};
        // const query = new URLSearchParams(params);

        fetch('https://89f809aa-8d02-4435-a8d7-31e1374aa309.mock.pstmn.io/search?li-name=${liName}&li-place=${liPlace}')
        .then(response => response.json())
        .then(liListData => {
          console.log(liListData);
          setLostItems(liListData);
        })
        .catch(error => console.error('通信に失敗しました:', error));

        // 検索処理を行った後、検索ボックスを元に戻す
        setIsExpanded(false);
    };

    return (
        <div className="search">
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
                                    placeholder="落としたモノ" 
                                    value={liName} 
                                    onChange={(e) => setLiName(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="落とした場所" 
                                    value={liPlace} 
                                    onChange={(e) => setLiPlace(e.target.value)} 
                                />
                                <button type="submit">Search</button>
                                {error && <p className="error">{error}</p>}
                            </form>
                        </div>
                    ) : (
                        <span>Click to search</span>
                    )}
                </div>
            </div>
            <div className="li-list">
                {lostItems.length === 0 ? (
                <p>No messages yet. Start posting on the MessageBoard!</p>
                ) : (
                <div>
                    <p class="text">検索結果</p>
                    {lostItems.map((lostItem, index) => (
                    <div className="li-container">
                        <img src={lostItem.img_url} alt="落とし物の画像" className="li-img" />
                        <div className="text-container">
                        <p className='li-place'><strong>場所:</strong> {lostItem.li_place}</p>
                        <p className='li-name'><strong>モノ:</strong> {lostItem.li_name}</p>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default Search;
