import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MannequinViewerProps {
  images: string[];
  alt: string;
}

const MannequinViewer: React.FC<MannequinViewerProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const goToNext = () => {
    setIsRotating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsRotating(false), 500);
  };

  const goToPrevious = () => {
    setIsRotating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-100 to-white rounded-lg overflow-hidden">
      <div className="aspect-[4/5] w-full relative">
        {/* Mannequin Image */}
        <div className={`w-full h-full flex items-center justify-center ${isRotating ? 'transition-opacity duration-300 opacity-0' : 'opacity-100'}`}>
          <img
            src={images[currentIndex]}
            alt={`${alt} - View ${currentIndex + 1}`}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* 360° Label */}
        <div className="absolute top-3 left-3 bg-black/80 text-white text-xs py-1 px-2 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>360° View</span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Previous view"
            >
              <ChevronLeft size={20} className="text-gray-800" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Next view"
            >
              <ChevronRight size={20} className="text-gray-800" />
            </button>
          </>
        )}

        {/* Progress Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsRotating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsRotating(false), 500);
                }}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? 'bg-black' : 'bg-gray-400'
                }`}
                aria-label={`View ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MannequinViewer;