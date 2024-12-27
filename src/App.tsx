import React, { useState } from 'react';
import { ImageSequence } from './components/ImageSequence';

function App() {
  const totalImages = 240;
  const [currentIndex, setCurrentIndex] = useState(0);
  const showContent = currentIndex === totalImages - 1;

  return (
    <div className="relative">
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-6xl font-bold mt-8 mb-4 text-white mix-blend-difference z-10">
          B33
        </h1>
        <ImageSequence 
          totalImages={totalImages} 
          onIndexChange={setCurrentIndex}
        />
      </div>
      
      {/* Content only shows after last image */}
      <div 
        className={`bg-white min-h-screen px-8 py-16 transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">About B33</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-12">
              <h3 className="text-2xl font-semibold mb-4">Section {i + 1}</h3>
              <p className="text-lg mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;