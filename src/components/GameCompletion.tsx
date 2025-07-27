import React, { useState, useEffect } from 'react';
import { pauseBackgroundMusic, playBackgroundMusic } from '../utils/sound';

interface GameCompletionProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const GameCompletion: React.FC<GameCompletionProps> = ({ isVisible, onComplete }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  // Reset hasClosed when isVisible becomes true (new game completion)
  useEffect(() => {
    if (isVisible && hasClosed) {
      setHasClosed(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Only show video if we haven't closed it yet
    if (!hasClosed) {
      // Pause background music when video starts
      pauseBackgroundMusic();

      // Show video immediately (user already clicked evolve button)
      setShowVideo(true);
    }
  }, [isVisible, hasClosed]);

  const handleCloseVideo = () => {
    if (hasClosed) return; // Prevent multiple closes
    
    setHasClosed(true);
    setShowVideo(false);
    onComplete();
    // Resume background music when video ends
    playBackgroundMusic(0.24);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (showVideo && (event.key === 'Escape' || event.key === ' ' || event.key === 'Enter')) {
      handleCloseVideo();
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    if (showVideo) {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [showVideo]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none', // Block interactions while video is playing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: showVideo ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0)',
          transition: 'background-color 1s ease-in-out',
        }}
      />

      {/* YouTube Video Embed */}
      {showVideo && (
        <div
          className="video-container"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/qy6Xl-xRuKU?autoplay=1&muted=0&controls=0&rel=0&modestbranding=1&showinfo=0&fs=0&enablejsapi=1"
            style={{
              width: '90vw',
              height: '90vh',
              border: 'none',
              maxWidth: 'none',
              maxHeight: 'none',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          
          {/* Close button */}
          <button
            onClick={handleCloseVideo}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif',
              pointerEvents: 'auto', // Enable interactions for close button only
            }}
            title="Close video (or press ESC/Space/Enter)"
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        /* Video container animation styles */
        .video-container {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}; 