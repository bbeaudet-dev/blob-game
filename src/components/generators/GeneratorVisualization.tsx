import React, { useEffect, useMemo, useState } from 'react';
import { calculateBlobPosition } from '../../game/systems/calculations';
import type { GameState } from '../../game/types';
import { Colors } from '../../styles/colors';

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

// Generator emoji mapping - only for actual generators in the game
const GENERATOR_EMOJIS: Record<string, string> = {
  'tutorial-generator': '',
  'microscopic-cloner': '🦠',
  'colony-expander': '🔍',
  'centrifuge-sorter': '🧪',
  'bioreactor-tank': '🧪',
  'backyard-colonizer': '🏘️',
  'garden-infester': '🏘️',
  'humanoid-slimes': '🏙️',
  'sewer-colonies': '🏙️',
  'national-highway-system': '🗺️',
  'railway-network': '🗺️',
  'cargo-ship-infestors': '🌍',
  'airplane-spore-units': '🌍',
  'terraforming-ooze': '🚀',
  'asteroid-seeder': '🚀',
};

// Simple color mapping
const getGeneratorColor = (generatorId: string): string => {
  return '#4ade80'; // Green for all generators
};

export const GeneratorVisualization: React.FC<GeneratorVisualizationProps> = ({ gameState, blobSize = 0 }) => {
  const [time, setTime] = useState(0);
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
    
    // Get active generators (with levels > 0)
    const activeGenerators = Object.values(gameState.generators).filter(gen => gen.level > 0);
    
    if (activeGenerators.length === 0) return emojis;
    
    // Calculate total emojis to determine ring spacing and speed
    const totalEmojis = activeGenerators.reduce((sum, gen) => sum + gen.level, 0);
    const baseSpeed = Math.min(1.0, 0.2 + (totalEmojis * 0.005)); // Much faster speed scaling
    
    // Create dynamic rings based on number of generator types
    const ringSpacing = 25; // Bigger spacing between rings
    const rings = activeGenerators.map((generator, index) => {
      const radius = 100 + (index * ringSpacing);
      
      // Speed scales with actual generator level (not limited emoji count)
      const emojiSpeedFactor = Math.min(3.0, 0.3 + (generator.level / 50)); // Cap at 3x speed, more gradual scaling
      const ringSpeed = baseSpeed * (0.5 + (index * 0.3)) * emojiSpeedFactor;
      
      return {
        radius,
        speed: ringSpeed,
        generator: generator
      };
    });
    
    rings.forEach((ring, ringIndex) => {
      const generator = ring.generator;
      
      // Create emojis for this generator, scaling max emojis with ring radius for consistent density
      const baseMaxEmojis = 30; // Base for smallest ring (100px radius)
      const maxEmojisPerGenerator = Math.floor((ring.radius / 100) * baseMaxEmojis);
      const emojiCount = Math.min(generator.level, maxEmojisPerGenerator);
      
      for (let i = 0; i < emojiCount; i++) {
        // Spread multiple emojis from the same generator around the ring
        const emojiAngle = (i / emojiCount) * 2 * Math.PI;
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
  }, [gameState.generators, blobPosition, time, blobSize]);



    
  // Render generator emojis around the blob
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 80 }}>
      {generatorEmojis.map((emoji) => (
        <div
          key={emoji.generatorId}
          style={{
            position: 'absolute',
            left: emoji.position.x - 15,
            top: emoji.position.y - 15,
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            opacity: 0.8,
            textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          title={`${emoji.emoji} ${emoji.count} (Level ${emoji.level})`}
        >
          {emoji.emoji}
        </div>
      ))}
      
      
    </div>
  );
}; 