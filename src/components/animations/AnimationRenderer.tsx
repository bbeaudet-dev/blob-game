import React, { useEffect, useState } from 'react';
import { animationManager, animationLoop, type FloatingNumberConfig, type RippleConfig } from '../../utils/animation';
import { NumberFormatter } from '../../utils/numberFormat';
import type { GameState } from '../../game/types';

interface AnimationRendererProps {
  gameState: GameState;
}

export const AnimationRenderer: React.FC<AnimationRendererProps> = ({ gameState }) => {
  const [animations, setAnimations] = useState<any[]>([]);



  // Subscribe to animation updates
  useEffect(() => {
    const updateAnimations = () => {
      const activeAnimations = animationManager.getActiveAnimations();
      setAnimations(activeAnimations);

      // Clean up completed animations
      activeAnimations.forEach(anim => {
        if (animationManager.isComplete(anim.id)) {
          anim.onComplete?.();
          animationManager.removeAnimation(anim.id);
        }
      });
    };

    // Start the animation loop if it's not running
    if (!animationLoop.getIsRunning()) {
      animationLoop.start();
    }
    animationLoop.addCallback(updateAnimations);
    return () => animationLoop.removeCallback(updateAnimations);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {/* Render floating number animations */}
      {animations
        .filter(anim => anim.type === 'floatingNumber')
        .map(anim => {
          const progress = animationManager.getProgress(anim.id);
          const config = anim.config as FloatingNumberConfig;
          
          // Calculate animation values
          const opacity = 1 - progress;
          const yOffset = -50 * progress; // Float up 50px
          
          return (
            <div
              key={anim.id}
              style={{
                position: 'absolute',
                left: config.position.x,
                top: config.position.y + yOffset,
                transform: 'translate(-50%, -50%)',
                fontSize: '20px',
                fontWeight: 'bold',
                color: config.color || '#4ade80',
                textShadow: `0 0 10px ${config.color || '#4ade80'}`,
                opacity,
                pointerEvents: 'none',
                userSelect: 'none',
                fontFamily: 'monospace',
              }}
            >
              {NumberFormatter.rate(config.value, gameState)}
              {config.emoji && ` ${config.emoji}`}
            </div>
          );
        })}

      {/* Render ripple animations */}
      {animations
        .filter(anim => anim.type === 'ripple')
        .map(anim => {
          const progress = animationManager.getProgress(anim.id);
          const config = anim.config as RippleConfig;
          
          // Calculate ripple values
          const size = (config.size || 20) * (1 + progress * 2); // Grow from base size
          const opacity = 1 - progress;
          
          return (
            <div
              key={anim.id}
              style={{
                position: 'absolute',
                left: config.position.x - size,
                top: config.position.y - size,
                width: size * 2,
                height: size * 2,
                borderRadius: '50%',
                border: `2px solid ${config.color || '#ffffff'}`,
                backgroundColor: `${config.color || '#ffffff'}15`,
                opacity,
                boxShadow: `0 0 ${size * 0.6}px ${config.color || '#ffffff'}66`,
                pointerEvents: 'none',
              }}
            />
          );
        })}
    </div>
  );
}; 