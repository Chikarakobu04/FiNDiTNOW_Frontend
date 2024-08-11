import { useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

const ImageClassifier = ({ image, onResult }) => {
  useEffect(() => {
    const classifyImage = async () => {
      try {
        const model = await mobilenet.load();
        const img = document.getElementById(`uploadedImage-${image}`);
        if (img) {
          const predictions = await model.classify(img);
          onResult(predictions); // 結果を親コンポーネントに渡す
        } else {
          console.error('Image not found:', image);
        }
      } catch (error) {
        console.error('Classification failed:', error);
      }
    };

    if (image) {
      classifyImage();
    }
  }, [image, onResult]);

  return null; // 結果は親コンポーネントに渡すのみ
};

export default ImageClassifier;
