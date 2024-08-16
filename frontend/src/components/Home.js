import React, { useState, useEffect } from 'react';
import './Home.css';
import ImageClassifier from './ImageClassifier';

function Home({ messages }) {
  // const [classificationResult, setClassificationResult] = useState(null); // 最初の画像識別結果のみを管理

  // const handleClassify = (image) => {
  //   setClassificationResult(null); // 新しい画像を識別する前に前の結果をクリア
  // };

  // const handleResult = (results) => {
  //   if (results.length > 0) {
  //     const firstResult = results[0]; // 最初の結果を取得
  //     const firstWord = firstResult.className.split(' ')[0]; // 最初の単語を抽出
  //     setClassificationResult(firstWord); // 単語のみを保存
  //   }
  // };

  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    // まずは落とし物情報を取得
    fetch('https://89f809aa-8d02-4435-a8d7-31e1374aa309.mock.pstmn.io/lost-items')
    .then(response => response.json())
    .then(liList => {
      setLostItems(liList);
    })
    .catch(error => console.error('通信に失敗しました:', error));
  }, []);

  return (
    <div className="home">
      <div className="li-list">
        {lostItems.length === 0 ? (
          <p>No messages yet. Start posting on the MessageBoard!</p>
        ) : (
          <div>
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
    // </div>
  );
}

export default Home;
