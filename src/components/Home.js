import React, { useState } from 'react';
import './Home.css';
import ImageClassifier from './ImageClassifier';

function Home({ messages }) {
  const [classificationResult, setClassificationResult] = useState(null); // 最初の画像識別結果のみを管理

  const handleClassify = (image) => {
    setClassificationResult(null); // 新しい画像を識別する前に前の結果をクリア
  };

  const handleResult = (results) => {
    if (results.length > 0) {
      const firstResult = results[0]; // 最初の結果を取得
      const firstWord = firstResult.className.split(' ')[0]; // 最初の単語を抽出
      setClassificationResult(firstWord); // 単語のみを保存
    }
  };

  return (
    <div className="home">
      <div className="left-panel">
        <h2>メダル</h2>
        {classificationResult ? (
          <div className="classification-result">
            <div className="medal">
              <p>{classificationResult}</p> {/* メダル内に表示 */}
            </div>
          </div>
        ) : (
          <p>ここに画像識別結果が表示されます</p>
        )}
      </div>

      <div className="right-panel">
        <div className="message-list">
          {messages.length === 0 ? (
            <p>No messages yet. Start posting on the MessageBoard!</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="message-item">
                <div className="message-content">
                  <p><strong>Place:</strong> {message.place}</p>
                  <p><strong>Text:</strong> {message.text}</p>
                  {message.image && (
                    <>
                      <img
                        id={`uploadedImage-${index}`}
                        src={message.image}
                        alt="Posted"
                        className="uploaded-image"
                      />
                      <button onClick={() => handleClassify(message.image)}>
                        Classify Image
                      </button>
                    </>
                  )}
                </div>

                {/* 画像が選択されたらImageClassifierを表示 */}
                {message.image && classificationResult === null && (
                  <ImageClassifier
                    image={index} // 画像のインデックスを渡す
                    onResult={handleResult}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
