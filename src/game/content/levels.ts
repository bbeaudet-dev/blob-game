import type { Level } from '../types';

export type { Level };

export const LEVELS: Level[] = [
  {
    id: 0,
    name: 'intro',
    displayName: '⚪ Intro',
    biomassThreshold: 0,
    biomassDisplayFormat: 'decimal',
    background: 'intro-bg',
    foodTypes: [],
    description: 'Welcome to the beginning of your journey',
    blobSizeStart: 50,
    blobSizeEnd: 120
  },
  {
    id: 1,
    name: 'microscopic',
    displayName: '🦠 Microscopic',
    biomassThreshold: 1,
    biomassDisplayFormat: 'decimal',
    background: 'microscopic-bg',
    foodTypes: [],
    description: 'Begin as a single cell.',
    blobSizeStart: 80,
    blobSizeEnd: 1200
  },
  {
    id: 2,
    name: 'petri-dish',
    displayName: '🧪 Petri Dish',
    biomassThreshold: 1000,
    biomassDisplayFormat: 'whole',
    background: 'petri-bg',
    foodTypes: [],
    description: 'Grow into a visible slime.',
    blobSizeStart: 120,
    blobSizeEnd: 1200
  },
  {
    id: 3,
    name: 'lab',
    displayName: '⚗️ Lab',
    biomassThreshold: 25000,
    biomassDisplayFormat: 'whole',
    background: 'lab-bg',
    foodTypes: [],
    description: 'Experiment in a high-tech lab.',
    blobSizeStart: 120,
    blobSizeEnd: 1200
  },
  {
    id: 4,
    name: 'neighborhood',
    displayName: '🌳 Neighborhood',
    biomassThreshold: 500000,
    biomassDisplayFormat: 'whole',
    background: 'neighborhood-bg',
    foodTypes: [],
    description: 'Spread through the neighborhood.',
    blobSizeStart: 180,
    blobSizeEnd: 1200
  },
  {
    id: 5,
    name: 'city',
    displayName: '👱🏼 City',
    biomassThreshold: 20000000, // Reduced from 40M
    biomassDisplayFormat: 'whole',
    background: 'city-bg',
    foodTypes: [],
    description: 'Infiltrate throughout the city.',
    blobSizeStart: 240,
    blobSizeEnd: 1200
  },
  {
    id: 6,
    name: 'continent',
    displayName: '🚓 Continent',
    biomassThreshold: 3000000000, // 3B
    biomassDisplayFormat: 'whole',
    background: 'continent-bg',
    foodTypes: [],
    description: 'Expand across the continent.',
    blobSizeStart: 260,
    blobSizeEnd: 1200
  },
  {
    id: 7,
    name: 'earth',
    displayName: '🌍 Earth',
    biomassThreshold: 5000000000000, // Reduced to 5T (much more reasonable)
    biomassDisplayFormat: 'whole',
    background: 'earth-bg',
    foodTypes: [],
    description: 'Spread your biomass across the planet.',
    blobSizeStart: 260,
    blobSizeEnd: 1200
  },
  {
    id: 8,
    name: 'solar-system',
    displayName: '🚀 Solar System',
    biomassThreshold: 1000000000000000, // Reduced to 1Q
    biomassDisplayFormat: 'scientific',
    background: 'solar-system-bg',
    foodTypes: [],
    description: 'Expand your reach to the solar system.',
    blobSizeStart: 260,
    blobSizeEnd: 1200
  },
  {
    id: 9,
    name: 'galaxy',
    displayName: '🌌 Galaxy',
    biomassThreshold: 1000000000000000000, // 1Qi threshold for completion
    biomassDisplayFormat: 'scientific',
    background: 'solar-system-bg', // Reuse solar system background for now
    foodTypes: [],
    description: 'You have consumed the entire galaxy. The universe is yours.',
    blobSizeStart: 260,
    blobSizeEnd: 1200
  }
];

export function getNextLevel(currentLevel: Level): Level | null {
  const currentIndex = LEVELS.findIndex(level => level.id === currentLevel.id);
  if (currentIndex >= LEVELS.length - 1) {
    return null; // Already at max level
  }
  return LEVELS[currentIndex + 1];
}




