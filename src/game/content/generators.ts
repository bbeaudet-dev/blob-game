import type { GeneratorState } from '../types';

export const GENERATORS: Record<string, Omit<GeneratorState, 'level'>> = {
  // Microscopic Level
  'microscopic-cloner': {
    id: 'microscopic-cloner',
    name: '🦠 Microscopic Cloner',
    baseCost: 10,
    description: 'Clones basic slime cells',
    growthPerTick: 1.5,
    costMultiplier: 1.1,
    unlockedAtLevel: 'microscopic'
  },

  // Petri Dish Level
  'colony-expander': {
    id: 'colony-expander',
    name: '🔍 Colony Expansion',
    baseCost: 100,
    description: 'Expands colonies for more biomass',
    growthPerTick: 10,
    costMultiplier: 1.15,
    unlockedAtLevel: 'petri-dish'
  },

  // Lab Level
  'centrifuge-sorter': {
    id: 'centrifuge-sorter',
    name: '🧪 Centrifuge Sorter',
    baseCost: 1000,
    description: 'Sorts cells for maximum efficiency',
    growthPerTick: 50,
    costMultiplier: 1.15,
    unlockedAtLevel: 'lab'
  },
  'bioreactor-tank': {
    id: 'bioreactor-tank',
    name: '🧪 Bioreactor Tank',
    baseCost: 12000,
    description: 'Massive bioreactor for rapid growth',
    growthPerTick: 260,
    costMultiplier: 1.15,
    unlockedAtLevel: 'lab'
  },

  // Neighborhood Level
  'backyard-colonizer': {
    id: 'backyard-colonizer',
    name: '🏘️ Backyard Colonizer',
    baseCost: 130000,
    description: 'Colonizes suburban backyards',
    growthPerTick: 1400,
    costMultiplier: 1.15,
    unlockedAtLevel: 'neighborhood'
  },
  'garden-infester': {
    id: 'garden-infester',
    name: '🏘️ Garden Infester',
    baseCost: 1400000,
    description: 'Infests neighborhood gardens',
    growthPerTick: 7800,
    costMultiplier: 1.15,
    unlockedAtLevel: 'neighborhood'
  },

  // City Level
  'humanoid-slimes': {
    id: 'humanoid-slimes',
    name: '🏙️ Humanoid Slimes',
    baseCost: 10000000, // Reduced from 20M
    description: 'Slimes disguised as humans',
    growthPerTick: 60000, // Increased from 44K
    costMultiplier: 1.12, // Reduced from 1.15
    unlockedAtLevel: 'city'
  },
  'sewer-colonies': {
    id: 'sewer-colonies',
    name: '🏙️ Sewer Colonies',
    baseCost: 120000000, // Reduced from 260M
    description: 'Colonies thriving in the sewers',
    growthPerTick: 400000, // Increased from 260K
    costMultiplier: 1.12, // Reduced from 1.15
    unlockedAtLevel: 'city'
  },

  // Continent Level
  'national-highway-system': {
    id: 'national-highway-system',
    name: '🗺️ National Highway System',
    baseCost: 3000000000, // Reduced from 7.1B
    description: 'Uses highway systems for rapid spread',
    growthPerTick: 5000000, // Increased from 1.5M
    costMultiplier: 1.12, // Reduced from 1.15
    unlockedAtLevel: 'continent'
  },
  'railway-network': {
    id: 'railway-network',
    name: '🗺️ Railway Network',
    baseCost: 35000000000, // Reduced from 83B
    description: 'Hijacks railway networks',
    growthPerTick: 35000000, // Increased from 8.3M
    costMultiplier: 1.12, // Reduced from 1.15
    unlockedAtLevel: 'continent'
  },

  // Earth Level
  'cargo-ship-infestors': {
    id: 'cargo-ship-infestors',
    name: '🌍 Cargo Ship Infestors',
    baseCost: 8000000000000, // Increased for higher threshold
    description: 'Infest cargo ships for global spread',
    growthPerTick: 20000000000, // Increased for higher threshold
    costMultiplier: 1.12,
    unlockedAtLevel: 'earth'
  },
  'airplane-spore-units': {
    id: 'airplane-spore-units',
    name: '🌍 Airplane Spore Units',
    baseCost: 60000000000000, // Increased for higher threshold
    description: 'Spread spores via airplanes',
    growthPerTick: 150000000000, // Increased for higher threshold
    costMultiplier: 1.12,
    unlockedAtLevel: 'earth'
  },

  // Solar System Level
  'terraforming-ooze': {
    id: 'terraforming-ooze',
    name: '🚀 Terraforming Ooze',
    baseCost: 200000000000000, // 200T - affordable at 1Q threshold
    description: 'Ooze that terraforms planets',
    growthPerTick: 50000000000000, // 50T per tick - powerful for 1Q threshold
    costMultiplier: 1.12,
    unlockedAtLevel: 'solar-system'
  },
  'asteroid-seeder': {
    id: 'asteroid-seeder',
    name: '🚀 Asteroid Seeder', 
    baseCost: 1500000000000000, // 1.5Q - affordable at 1Q threshold
    description: 'Seeds asteroids with life',
    growthPerTick: 300000000000000, // 300T per tick - powerful for 1Q threshold
    costMultiplier: 1.12,
    unlockedAtLevel: 'solar-system'
  },
  'starship-incubator': {
    id: 'starship-incubator',
    name: '🚀 Starship Incubator',
    baseCost: 8000000000000000, // 8Q - affordable at 1Q threshold
    description: 'Incubates life on starships',
    growthPerTick: 2000000000000000, // 2Q per tick - powerful for 1Q threshold
    costMultiplier: 1.12,
    unlockedAtLevel: 'solar-system'
  }
}; 