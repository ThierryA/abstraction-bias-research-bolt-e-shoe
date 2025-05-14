import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={images[selectedIndex]}
          alt={`${name} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-md overflow-hidden ${
                selectedIndex === index
                  ? 'ring-2 ring-offset-1 ring-black'
                  : 'hover:ring-1 hover:ring-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;