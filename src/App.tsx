import React, { useState } from 'react';
import { ImageSequence } from './components/ImageSequence';

export default function App() {
  const totalImages = 147;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="h-[300vh]">
      <ImageSequence 
        totalImages={totalImages} 
        onIndexChange={setCurrentIndex}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference pointer-events-none">
        <p className="text-xl font-medium">
          {currentIndex === 0 ? 'Scroll to animate' : `Frame ${currentIndex + 1}/${totalImages}`}
        </p>
      </div>
    </div>
  );
}