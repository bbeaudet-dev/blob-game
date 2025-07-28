import type { GeneratorState } from '../types';

export const GENERATORS: Record<string, Omit<GeneratorState, 'level'>> = {
  // Microscopic Level
  'microscopic-cloner': {
    id: 'microscopic-cloner',
    name: '🦠 Microscopic Cloner',
    baseCost: 10,
    description: 'Clones basic slime cells',
    growthPerTick: 2,
    // growthPerTick: 2000000000000000,
    costMultiplier: 1.08, // Reduced from 1.20 to prevent fast scaling
    unlockedAtLevel: 'microscopic'
  },

  // Petri Dish Level
  'colony-expander': {
    id: 'colony-expander',
    name: '🧪 Colony Expansion',
    baseCost: 100,
    description: 'Expands colonies for more biomass',
    growthPerTick: 25,
    costMultiplier: 1.10, // Reduced from 1.20 to prevent fast scaling
    unlockedAtLevel: 'petri-dish'
  },

  // Lab Level
  'centrifuge-sorter': {
    id: 'centrifuge-sorter',
    name: '⚗️ Centrifuge Sorter',
    baseCost: 750,
    description: 'Sorts cells for maximum efficiency',
    growthPerTick: 100,
    costMultiplier: 1.12, // Reduced from 1.15 to prevent fast scaling
    unlockedAtLevel: 'lab'
  },
  'bioreactor-tank': {
    id: 'bioreactor-tank',
    name: '🛢 Bioreactor Tank',
    baseCost: 8000,
    description: 'Massive bioreactor for rapid growth',
    growthPerTick: 750,
    costMultiplier: 1.12, // Reduced from 1.15 to prevent fast scaling
    unlockedAtLevel: 'lab'
  },

  // Neighborhood Level
  'backyard-colonizer': {
    id: 'backyard-colonizer',
    name: '🌳 Backyard Colonizer',
    baseCost: 75000,
    description: 'Colonizes suburban backyards',
    growthPerTick: 2000,
    costMultiplier: 1.08, // Reduced from 1.10 to prevent fast scaling
    unlockedAtLevel: 'neighborhood'
  },
  'garden-infester': {
    id: 'garden-infester',
    name: '🏘️ Garden Infester',
    baseCost: 1500000,
    description: 'Infests neighborhood gardens',
    growthPerTick: 7800,
    costMultiplier: 1.08, // Reduced from 1.10 to prevent fast scaling
    unlockedAtLevel: 'neighborhood'
  },

  // City Level
  'humanoid-slimes': {
    id: 'humanoid-slimes',
    name: '👱🏼 Humanoid Slimes',
    baseCost: 10000000,
    description: 'Slimes disguised as humans',
    growthPerTick: 60000,
    costMultiplier: 1.05, // Already good
    unlockedAtLevel: 'city'
  },
  'sewer-colonies': {
    id: 'sewer-colonies',
    name: '🚽 Sewer Colonies',
    baseCost: 120000000,
    description: 'Colonies thriving in the sewers',
    growthPerTick: 400000,
    costMultiplier: 1.05, // Already good
    unlockedAtLevel: 'city'
  },

  // Continent Level
  'national-highway-system': {
    id: 'national-highway-system',
    name: '🚓 National Highway System',
    baseCost: 2000000000, // Reduced from 3B to 2B
    description: 'Uses highway systems for rapid spread',
    growthPerTick: 25000000, // Doubled from 5M to 10M
    costMultiplier: 1.04, // Reduced from 1.05 to 1.04 for easier scaling
    unlockedAtLevel: 'continent'
  },
  'railway-network': {
    id: 'railway-network',
    name: '🚇 Railway Network',
    baseCost: 25000000000, // Reduced from 35B to 25B
    description: 'Hijacks railway networks',
    growthPerTick: 100000000, // Doubled from 35M to 70M
    costMultiplier: 1.04, // Reduced from 1.05 to 1.04 for easier scaling
    unlockedAtLevel: 'continent'
  },

  // Earth Level
  'cargo-ship-infestors': {
    id: 'cargo-ship-infestors',
    name: '🌍 Cargo Ship Infestors',
    baseCost: 8000000000000, // 8T
    description: 'Infests cargo ships for global spread',
    growthPerTick: 20000000000, // 20B
    costMultiplier: 1.025, // Already good
    unlockedAtLevel: 'earth'
  },
  'airplane-spore-units': {
    id: 'airplane-spore-units',
    name: '🌍 Airplane Spore Units',
    baseCost: 60000000000000, // 60T
    description: 'Spreads via airplane travel',
    growthPerTick: 150000000000, // 150B
    costMultiplier: 1.025, // Already good
    unlockedAtLevel: 'earth'
  },

  // Solar System Level
  'terraforming-ooze': {
    id: 'terraforming-ooze',
    name: '🚀 Terraforming Ooze',
    baseCost: 200000000000000, // 200T
    description: 'Terraforms planets for colonization',
    growthPerTick: 50000000000000, // 50T
    costMultiplier: 1.025, // Already good
    unlockedAtLevel: 'solar-system'
  },
  'asteroid-seeder': {
    id: 'asteroid-seeder',
    name: '🚀 Asteroid Seeder',
    baseCost: 1500000000000000, // 1.5Q
    description: 'Seeds asteroids with slime colonies',
    growthPerTick: 300000000000000, // 300T
    costMultiplier: 1.025, // Already good
    unlockedAtLevel: 'solar-system'
  },
  'starship-incubator': {
    id: 'starship-incubator',
    name: '🚀 Starship Incubator',
    baseCost: 8000000000000000, // 8Q
    description: 'Incubates slime in starships',
    growthPerTick: 2000000000000000, // 2Q
    costMultiplier: 1.025, // Already good
    unlockedAtLevel: 'solar-system'
  },

  // Tutorial Generator (always available)
  'tutorial-generator': {
    id: 'tutorial-generator',
    name: '🎓 Tutorial Generator',
    baseCost: 0,
    description: 'Free generator for tutorial purposes',
    growthPerTick: 1,
    costMultiplier: 1.0,
    unlockedAtLevel: 'intro'
  },

  // Cheat Generator (only available in cheat mode)
  'cheat-generator': {
    id: 'cheat-generator',
    name: '💎 Cheat Code',
    baseCost: 1,
    description: 'Produces unfair amounts of biomass instantly',
    growthPerTick: 100000000000000000000, // 100 quintillion per second
    costMultiplier: 1.0,
    unlockedAtLevel: 'intro' // Available from the start when cheat mode is on
  }
}; 