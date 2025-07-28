import type { UpgradeState } from '../types';

export const UPGRADES: Record<string, Omit<UpgradeState, 'purchased'>> = {
  // Microscopic Level
  'enhanced-microscope-optics': {
    id: 'enhanced-microscope-optics',
    name: '🦠 Enhanced Microscope Optics',
    cost: 50, // Reduced from 100 to be more affordable
    description: '2x Microscopic Cloner',
    effect: 2,
    type: 'growth',
    unlockedAtLevel: 'microscopic',
    targetLevel: 'microscopic'
  },

  // Petri Dish Level
  'temperature-control-module': {
    id: 'temperature-control-module',
    name: '🧪 Temperature Control Module',
    cost: 500, // Reduced from 1500 to be more affordable
    description: '3x All Microscopic Generators',
    effect: 3,
    type: 'growth',
    unlockedAtLevel: 'petri-dish',
    targetLevel: 'microscopic'
  },
  'nutrient-enriched-agar': {
    id: 'nutrient-enriched-agar',
    name: '🧪 Nutrient-Enriched Agar',
    cost: 1000, // Reduced from 2000 to be more affordable
    description: '3x All Petri Generators',
    effect: 3,
    type: 'growth',
    unlockedAtLevel: 'petri-dish',
    targetLevel: 'petri-dish'
  },

  // Lab Level
  'lab-assistant-automation': {
    id: 'lab-assistant-automation',
    name: '⚗️ Lab Assistant Automation',
    cost: 5000, // Reduced from 15000 to be more affordable
    description: '4x All Petri Generators',
    effect: 4,
    type: 'growth',
    unlockedAtLevel: 'lab',
    targetLevel: 'petri-dish'
  },
  'sterile-workflow': {
    id: 'sterile-workflow',
    name: '🛢 Sterile Workflow',
    cost: 50000, // Reduced from 120000 to be more affordable
    description: '4x All Lab Generators',
    effect: 4,
    type: 'growth',
    unlockedAtLevel: 'lab',
    targetLevel: 'lab'
  },

  // Neighborhood Level
  'neighborhood-awareness': {
    id: 'neighborhood-awareness',
    name: '🌳 Neighborhood Awareness',
    cost: 500000, // Reduced from 1500000 to be more affordable
    description: '5x All Lab Generators',
    effect: 5,
    type: 'growth',
    unlockedAtLevel: 'neighborhood',
    targetLevel: 'lab'
  },
  'suburban-stealth': {
    id: 'suburban-stealth',
    name: '🌳 Suburban Stealth',
    cost: 5000000, // Reduced from 15000000 to be more affordable
    description: '5x All Neighborhood Generators',
    effect: 5,
    type: 'growth',
    unlockedAtLevel: 'neighborhood',
    targetLevel: 'neighborhood'
  },

  // City Level
  'mimicry-training': {
    id: 'mimicry-training',
    name: '👱🏼 Mimicry Training',
    cost: 20000000, // Reduced from 80000000 to be more affordable
    description: '6x All Lab Generators',
    effect: 6,
    type: 'growth',
    unlockedAtLevel: 'city',
    targetLevel: 'lab'
  },
  'urban-camouflage': {
    id: 'urban-camouflage',
    name: '👱🏼 Urban Camouflage',
    cost: 200000000, // Reduced from 1000000000 to be more affordable
    description: '6x All City Generators',
    effect: 6,
    type: 'growth',
    unlockedAtLevel: 'city',
    targetLevel: 'city'
  },

  // Continent Level
  'intercontinental-railway': {
    id: 'intercontinental-railway',
    name: '🚓 Intercontinental Railway',
    cost: 5000000000, // Reduced from 25000000000 to be more affordable
    description: '8x All Neighborhood Generators',
    effect: 8,
    type: 'growth',
    unlockedAtLevel: 'continent',
    targetLevel: 'neighborhood'
  },
  'continental-infrastructure': {
    id: 'continental-infrastructure',
    name: '🚇 Continental Infrastructure',
    cost: 50000000000, // Reduced from 300000000000 to be more affordable
    description: '8x All Continent Generators',
    effect: 8,
    type: 'growth',
    unlockedAtLevel: 'continent',
    targetLevel: 'continent'
  },

  // Earth Level
  'global-shipping-network': {
    id: 'global-shipping-network',
    name: '🌍 Global Shipping Network',
    cost: 1000000000000, // Reduced from 80000000000000 to be more affordable
    description: '10x All Continent Generators',
    effect: 10,
    type: 'growth',
    unlockedAtLevel: 'earth',
    targetLevel: 'continent'
  },
  'planetary-dominance': {
    id: 'planetary-dominance',
    name: '🌍 Planetary Dominance',
    cost: 10000000000000, // Reduced from 5000000000000000 to be more affordable
    description: '10x All Earth Generators',
    effect: 10,
    type: 'growth',
    unlockedAtLevel: 'earth',
    targetLevel: 'earth'
  },

  // Solar System Level
  'interplanetary-transport': {
    id: 'interplanetary-transport',
    name: '🚀 Interplanetary Transport',
    cost: 100000000000000, // Reduced from 200000000000000000 to be more affordable
    description: '12x All Earth Generators',
    effect: 12,
    type: 'growth',
    unlockedAtLevel: 'solar-system',
    targetLevel: 'earth'
  },
  'stellar-expansion': {
    id: 'stellar-expansion',
    name: '🚀 Stellar Expansion',
    cost: 1000000000000000, // Reduced from 1500000000000000000 to be more affordable
    description: '12x All Solar System Generators',
    effect: 12,
    type: 'growth',
    unlockedAtLevel: 'solar-system',
    targetLevel: 'solar-system'
  }
}; 