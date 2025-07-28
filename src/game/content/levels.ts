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
    biomassThreshold: 2, // Increased from 1 to be above generator cost
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
    biomassThreshold: 2000, // Increased from 500 to be above upgrade costs
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
    biomassThreshold: 100000, // Increased from 25K to be above upgrade costs
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
    biomassThreshold: 5000000, // Increased from 2.5M to be above upgrade costs
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
    biomassThreshold: 200000000, // Increased from 500M to be above upgrade costs
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
    biomassThreshold: 10000000000, // Increased from 7.5B to be above generator costs
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
    biomassThreshold: 10000000000000, // Increased from 100B to be above generator costs
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
    biomassThreshold: 5000000000000000, // 1 Quintillion - Increased from 50T to be above generator costs
    biomassDisplayFormat: 'whole',
    background: 'solar-system-bg',
    foodTypes: [],
    description: 'Expand beyond Earth into the solar system.',
    blobSizeStart: 280,
    blobSizeEnd: 1200
  },
  {
    id: 9,
    name: 'galaxy',
    displayName: '🌌 Galaxy',
    biomassThreshold: 2500000000000000000000, // 2.5 Sextillion - final threshold
    biomassDisplayFormat: 'whole',
    background: 'galaxy-bg',
    foodTypes: [],
    description: 'Spread across the entire galaxy.',
    blobSizeStart: 300,
    blobSizeEnd: 1200
  }
];

// Helper function to get the next level
export function getNextLevel(currentLevel: Level): Level | null {
  const currentIndex = LEVELS.findIndex(level => level.id === currentLevel.id);
  if (currentIndex === -1 || currentIndex === LEVELS.length - 1) {
    return null;
  }
  return LEVELS[currentIndex + 1];
}

// Helper function to get the previous level
export function getPreviousLevel(currentLevel: Level): Level | null {
  const currentIndex = LEVELS.findIndex(level => level.id === currentLevel.id);
  if (currentIndex <= 0) {
    return null;
  }
  return LEVELS[currentIndex - 1];
}

// Helper function to get level by name
export function getLevelByName(name: string): Level | null {
  return LEVELS.find(level => level.name === name) || null;
}

// Helper function to get level by id
export function getLevelById(id: number): Level | null {
  return LEVELS.find(level => level.id === id) || null;
}




