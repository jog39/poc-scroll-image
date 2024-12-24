import React from 'react';
import { ImageViewer } from './components/ImageViewer';

// You can add your images to the public directory and reference them like this
const images = [
  '/images/image1.jpg',  // This will look for /public/images/image1.jpg
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
];

function App() {
  return (
    <div>
      <ImageViewer images={images} />
    </div>
  );
}

export default App;