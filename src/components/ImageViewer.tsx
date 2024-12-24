import React, { useState, useEffect } from 'react';

const ImageViewer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const totalImages = 240;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / documentHeight;
      
      // Calculate the image index based on scroll position
      const newIndex = Math.max(1, Math.min(
        Math.ceil(scrollPercentage * totalImages),
        totalImages
      ));
      
      setCurrentImageIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format the index to have leading zeros (001, 002, etc.)
  const formattedIndex = String(currentImageIndex).padStart(3, '0');
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <img
        src={`/images/out-${formattedIndex}.jpg`}
        alt="Sequence frame"
        className="w-full h-auto"
      />
    </div>
  );
};

export default ImageViewer;