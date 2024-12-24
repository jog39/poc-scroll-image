import React from 'react';
import ImageViewer from './components/ImageViewer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-6xl font-bold tracking-tighter">B33</h1>
      </header>

      {/* Image Viewer */}
      <ImageViewer />

      {/* Scrollable Content */}
      <div className="w-full max-w-4xl mx-auto px-4 py-20">
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold">Section {index + 1}</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-400">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;