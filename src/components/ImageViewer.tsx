import React from 'react';
import { useScrollImage } from '../hooks/useScrollImage';
import { useImagePreload } from '../hooks/useImagePreload';

interface ImageViewerProps {
  images: string[];
}

export function ImageViewer({ images }: ImageViewerProps) {
  const { currentImage, currentIndex } = useScrollImage(images);
  useImagePreload(images, currentIndex);

  return (
    <div className="relative min-h-[200vh]">
      <div className="fixed inset-0 flex items-center justify-center bg-black/90">
        <div className="relative max-w-4xl w-full mx-auto px-4">
          {/* Image container */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <img
              src={currentImage}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}