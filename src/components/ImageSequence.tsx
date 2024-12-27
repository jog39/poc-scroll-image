import React, { useEffect, useRef, useState } from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';

interface ImageSequenceProps {
  totalImages: number;
}

export const ImageSequence: React.FC<ImageSequenceProps> = ({ totalImages }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastScrollY = useRef(0);
  const { getPreloadedImage, preloadImages } = useImagePreloader();
  
  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initial image load
    drawImage(currentIndex);
  }, []);

  // Preload initial images
  useEffect(() => {
    const imagesToPreload = Array.from({ length: 10 }, (_, i) => 
      getImagePath((currentIndex + i) % totalImages)
    );
    preloadImages(imagesToPreload);
  }, [currentIndex]);

  const getImagePath = (index: number) => {
    const paddedIndex = String(index + 1).padStart(3, '0');
    return `/public/images/out-${paddedIndex}.jpg`;
  };

  const drawImage = async (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const image = await getPreloadedImage(getImagePath(index));
    if (!image) return;

    // Calculate dimensions to maintain aspect ratio and cover canvas
    const scale = Math.max(
      canvas.width / image.width,
      canvas.height / image.height
    );
    const x = (canvas.width - image.width * scale) / 2;
    const y = (canvas.height - image.height * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      x,
      y,
      image.width * scale,
      image.height * scale
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollDelta = window.scrollY - lastScrollY.current;
      const threshold = 5; // Minimum scroll amount to trigger image change
      
      if (Math.abs(scrollDelta) > threshold) {
        const direction = scrollDelta > 0 ? 1 : -1;
        const newIndex = Math.min(
          Math.max(0, currentIndex + direction),
          totalImages - 1
        );
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          drawImage(newIndex);
        }
      }
      
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, totalImages]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
    />
  );
};