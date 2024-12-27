import React, { useState, useCallback } from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useCanvas } from '../hooks/useCanvas';
import { useCanvasDrawing } from '../hooks/useCanvasDrawing';
import { useImageSequence } from '../hooks/useImageSequence';
import { getImagePath } from '../utils/imageUtils';

interface ImageSequenceProps {
  totalImages: number;
  onIndexChange: (index: number) => void;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({ 
  totalImages,
  onIndexChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getPreloadedImage, preloadImages } = useImagePreloader();
  const { drawImage } = useCanvasDrawing(getPreloadedImage);

  const handleCanvasResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawImage(canvas, currentIndex);
  }, [currentIndex, drawImage]);

  const canvasRef = useCanvas({ onResize: handleCanvasResize });

  // Handle image sequence updates
  useImageSequence(totalImages, currentIndex, (newIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
    drawImage(canvas, newIndex);
  });

  // Initial image draw and preload
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    drawImage(canvas, currentIndex);
    
    const imagesToPreload = Array.from({ length: 10 }, (_, i) => 
      getImagePath((currentIndex + i) % totalImages)
    );
    preloadImages(imagesToPreload);
  }, [currentIndex, drawImage, preloadImages, totalImages]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
    />
  );
};