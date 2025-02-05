import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="mb-4 relative pb-[100%] overflow-hidden">
        <img
          src={images[selectedImage] || '/api/placeholder/600/600'}
          alt="Product"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex space-x-2 mt-4">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`w-16 h-16 border-2 rounded cursor-pointer ${
              selectedImage === index ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;