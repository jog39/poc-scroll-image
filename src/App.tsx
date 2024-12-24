import React from 'react';
import { ImageViewer } from './components/ImageViewer';

const buildImageUrl = index => {
  if (index < 10) {
    return `/images/out-00{index + 1}.jpg`
  }
  if (index >= 10 && index < 100) {
    return `/images/out-0{index + 1}.jpg`
  }
  return `/images/out-{index + 1}.jpg`
}

const images = Array.from(Array(239).keys()).map(buildImageUrl)

function App() {
  return (
    <div>
      <ImageViewer images={images} />
    </div>
  );
}

export default App;