import React, { useState, useEffect, useMemo } from 'react';
import { calculateBlobPosition } from '../../game/systems/calculations';
import type { GameState } from '../../game/types';

interface GeneratorVisualizationProps {
  gameState: GameState;
  blobSize?: number;
}

interface GeneratorEmoji {
  generatorId: string;
  emoji: string;
  position: { x: number; y: number };
  count: number;
  level: number;
}

// Generator emoji mapping - only for actual generators in the game (excluding tutorial generator)
const GENERATOR_EMOJIS: Record<string, string> = {
  'microscopic-cloner': '🦠',
  'colony-expander': '🧪',
  'centrifuge-sorter': '⚗️',
  'bioreactor-tank': '🛢',
  'backyard-colonizer': '🌳',
  'garden-infester': '🏘️',
  'humanoid-slimes': '👱🏼',
  'sewer-colonies': '🚽',
  'national-highway-system': '🚓',
  'railway-network': '🚇',
  'cargo-ship-infestors': '🚢',
  'airplane-spore-units': '✈️',
  'terraforming-ooze': '🚀',
  'asteroid-seeder': '☄️',
  'starship-incubator': '🛸',
};

export const GeneratorVisualization: React.FC<GeneratorVisualizationProps> = ({ gameState, blobSize = 0 }) => {
  const [time, setTime] = useState(0);
  const [outerRingsFaster, setOuterRingsFaster] = useState(false);
  const [equalNumbers, setEqualNumbers] = useState(false);
  const blobPosition = useMemo(() => calculateBlobPosition(), []);

  // Update time for rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev: number) => prev + 0.016); // ~60fps
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Calculate generator emoji positions in multiple revolving rings around the blob
  const generatorEmojis = useMemo((): GeneratorEmoji[] => {
    const emojis: GeneratorEmoji[] = [];

    // Get active generators (with levels > 0), excluding tutorial generator
    const activeGenerators = Object.values(gameState.generators).filter(gen => gen.level > 0 && gen.id !== 'tutorial-generator');

    if (activeGenerators.length === 0) return emojis;

    // Create dynamic rings based on number of generator types
    const ringSpacing = 25; // Bigger spacing between rings
    
    // REVERSED ORDER: New generators get inner rings, old generators get pushed outward
    const rings = activeGenerators.map((generator, index) => {
      // Reverse the ring assignment - newest generators get smaller radii
      const reversedIndex = activeGenerators.length - 1 - index;
      const radius = 100 + (reversedIndex * ringSpacing);

      // All rings have the same translational (linear) speed
      const baseLinearSpeed = 180; // pixels per second at max speed (increased from 60)
      const emojiSpeedFactor = Math.min(1.0, generator.level / 50); // max at level 50
      const linearSpeed = baseLinearSpeed * emojiSpeedFactor;
      
      // Toggle between inner rings faster vs outer rings faster
      let ringSpeed;
      if (outerRingsFaster) {
        // Outer rings spin faster - use a fixed base speed and multiply by radius
        const baseSpeed = linearSpeed / 300; // Slower base speed for smallest ring
        ringSpeed = baseSpeed * (1 + (reversedIndex * 0.1)); // Outer rings get moderately faster
      } else {
        // Inner rings spin faster (current setup)
        ringSpeed = linearSpeed / radius; // radians per second
      }
      
      return {
        radius,
        speed: ringSpeed,
        generator: generator
      };
    });
    
    rings.forEach((ring) => {
      const generator = ring.generator;
      
      // Calculate emoji count for this generator
      const baseMaxEmojis = 12; // 12 emojis max per generator
      let maxEmojisPerGenerator;
      
      if (equalNumbers) {
        // Equal numbers: same max emojis for all rings
        maxEmojisPerGenerator = baseMaxEmojis;
      } else {
        // Equal spacing: more emojis for larger rings
        maxEmojisPerGenerator = Math.floor((ring.radius / 100) * baseMaxEmojis);
      }
      
      const emojiCount = Math.min(generator.level, maxEmojisPerGenerator);
      
      // Use the calculated emoji count
      const performanceCap = emojiCount;
      
      for (let i = 0; i < performanceCap; i++) {
        // Spread multiple emojis from the same generator around the ring
        const emojiAngle = (i / performanceCap) * 2 * Math.PI;
        const emojiCurrentAngle = emojiAngle - (time * ring.speed);
        
        const emojiPosition = {
          x: blobPosition.x + Math.cos(emojiCurrentAngle) * ring.radius,
          y: blobPosition.y + Math.sin(emojiCurrentAngle) * ring.radius,
        };
        
        emojis.push({
          generatorId: `${generator.id}-${i}`,
          emoji: GENERATOR_EMOJIS[generator.id] || '🦠',
          position: emojiPosition,
          count: 1,
          level: generator.level,
        });
      }
    });
    
    return emojis;
  }, [gameState.generators, blobPosition, time, blobSize, outerRingsFaster, equalNumbers]);

  // Render generator emojis around the blob
  return (
    <>
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 80 }}>
        {generatorEmojis.map((emoji) => (
          <div
            key={emoji.generatorId}
            style={{
              position: 'absolute',
              left: emoji.position.x - 12,
              top: emoji.position.y - 12,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              opacity: 0.8,
              textShadow: '0 0 8px rgba(0, 0, 0, 0.8)',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            title={`${emoji.emoji} ${emoji.count} (Level ${emoji.level})`}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>
      
      {/* Speed Direction Toggle Button */}
      <button
        onClick={() => {
          console.log('Speed toggle clicked! Current state:', outerRingsFaster);
          setOuterRingsFaster(!outerRingsFaster);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#4ade80',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 15px rgba(74, 222, 128, 0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#22c55e';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 222, 128, 0.6)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4ade80';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.4)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {outerRingsFaster ? 'Inner Faster' : 'Outer Faster'}
      </button>
      
      {/* Emoji Distribution Toggle Button */}
      <button
        onClick={() => {
          console.log('Distribution toggle clicked! Current state:', equalNumbers);
          setEqualNumbers(!equalNumbers);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: 'calc(50% + 120px)',
          zIndex: 1000,
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#4ade80',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 15px rgba(74, 222, 128, 0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#22c55e';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 222, 128, 0.6)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#4ade80';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(74, 222, 128, 0.4)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {equalNumbers ? 'Equal Spacing' : 'Equal Numbers'}
      </button>
    </>
  );
}; 