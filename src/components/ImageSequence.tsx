import React, { useState, useCallback, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
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
    if (!canvas || isLoading) return;
    
    setCurrentIndex(newIndex);
    onIndexChange(newIndex);
    drawImage(canvas, newIndex);
  });

  // Preload all images on mount
  useEffect(() => {
    const loadAllImages = async () => {
      setIsLoading(true);
      const imagePaths = Array.from(
        { length: totalImages }, 
        (_, i) => getImagePath(i)
      );
      
      await preloadImages(imagePaths);
      setIsLoading(false);
      
      const canvas = canvasRef.current;
      if (canvas) {
        drawImage(canvas, 0);
      }
    };

    loadAllImages();
  }, [totalImages, preloadImages, drawImage]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen object-cover"
      />
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading images...</div>
        </div>
      )}
    </>
  );
};