import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setSelectedImage(imgURL);
    onImageUpload(imgURL);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img id="uploadedImage" src={selectedImage} alt="Selected" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default ImageUpload;
