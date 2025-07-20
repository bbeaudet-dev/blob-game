import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/sound';

interface GameCompletionProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const GameCompletion: React.FC<GameCompletionProps> = ({ isVisible, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showGif, setShowGif] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Play completion sound
    playSound('evolve');

    // Animation sequence
    const sequence = async () => {
      // Phase 1: Show GIF immediately
      setShowGif(true);
      setAnimationPhase(1);

      // Phase 2: Play GIF for 6 seconds
      await new Promise(resolve => setTimeout(resolve, 6000));
      setAnimationPhase(2);

      // Phase 3: Fade to black
      setFadeToBlack(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Phase 4: Complete
      onComplete();
    };

    sequence();
  }, [isVisible, onComplete]);

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
        pointerEvents: 'none',
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
          backgroundColor: animationPhase >= 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
          transition: 'background-color 1s ease-in-out',
        }}
      />

      {/* Completion GIF */}
      {showGif && (
        <div
          className="completion-gif"
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
          <img
            src="/assets/images/completion-animation.gif"
            alt="Cosmic Slime Takeover"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      {/* Fade to black overlay */}
      {fadeToBlack && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 2,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      )}

      <style>{`
        /* Completion animation styles */
        .completion-gif {
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