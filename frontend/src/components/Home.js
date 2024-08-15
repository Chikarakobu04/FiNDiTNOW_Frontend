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
      setLostItems(liList); // ここの処理いらないかも

      console.log(liList)
      // // 各lostItemに対して、画像URLを取得
      // liList.forEach((liData, index) => {
      //   console.log(liData.img_id);
      //   if (liData.img_id) {
      //     fetch(`https://89f809aa-8d02-4435-a8d7-31e1374aa309.mock.pstmn.io/images/${liData.img_id}`)
      //     .then(response => response.json())
      //     .then(imgData => {
      //       setLostItems(prevItems => {
      //         const updatedItems = [...prevItems];
      //         console.log(imgData.img_url);
      //         updatedItems[index] = { ...updatedItems[index], img_url: imgData.img_url };
      //         return updatedItems;
      //       });
      //     })
      //     .catch(error => console.error('画像の取得に失敗しました:', error));
      //   }
      // });
    })
    .catch(error => console.error('通信に失敗しました:', error));
  }, []);

  return (
    <div className="home">
      {/* <div className="left-panel">
        <h2>メダル</h2>
        {classificationResult ? (
          <div className="classification-result">
            <div className="medal">
              <p>{classificationResult}</p> {/* メダル内に表示 */}
            {/* </div>
          </div>
        ) : (
          <p>ここに画像識別結果が表示されます</p>
        )}
      </div> */}

      {/* <div className="right-panel"> */}
      <div className="message-list">
        {lostItems.length === 0 ? (
          <p>No messages yet. Start posting on the MessageBoard!</p>
        ) : (
          <ul>
            {lostItems.map((lostItem, index) => (
              <li key={index}>
                <img src={lostItem.img_url} alt="落とし物の画像" className="uploaded-image" />
                <p><strong>場所:</strong> {lostItem.li_place}</p>
                <p><strong>モノ:</strong> {lostItem.li_name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    // </div>
  );
}

export default Home;
