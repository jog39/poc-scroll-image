import React from 'react';
import { useScrollImage } from '../hooks/useScrollImage';
import { useImagePreload } from '../hooks/useImagePreload';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

          {/* Navigation indicators */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-white">
            {currentIndex > 0 && (
              <div className="animate-bounce">
                <ChevronUp className="w-6 h-6" />
              </div>
            )}
            <div className="text-center">
              <span className="text-lg font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            {currentIndex < images.length - 1 && (
              <div className="animate-bounce">
                <ChevronDown className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}