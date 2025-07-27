import type { ScaleLevel } from '../types';
import { Colors } from '../../styles/colors';

export const getScaleLevel = (biomass: number): ScaleLevel => {
  if (biomass < 1) {
    return {
      name: "Primordial",
      description: "The very beginning of existence",
      unit: "Pre-cellular",
      color: Colors.biomass.primary,
      icon: "⚪",
    };
  } else if (biomass < 2500) {
    return {
      name: "Microscopic",
      description: "Single cells and microorganisms",
      unit: "1-10 μm",
      color: Colors.shop.primary,
      icon: "🦠",
    };
  } else if (biomass < 2250000) {
    return {
      name: "Petri Scale",
      description: "Visible colonies and cultures",
      unit: "10-100 μm",
      color: Colors.upgrades.primary,
      icon: "🧪",
    };
  } else if (biomass < 50000000) {
    return {
      name: "Laboratory",
      description: "Experimental scale organisms",
      unit: "0.1-1 mm",
      color: Colors.evolution.primary,
      icon: "⚗️",
    };
  } else if (biomass < 800000000) {
    return {
      name: "Neighborhood",
      description: "Community-scale spread",
      unit: "1-100 m",
      color: Colors.headlines.primary,
      icon: "🌳",
    };
  } else if (biomass < 15000000000) {
    return {
      name: "Urban",
      description: "City-wide influence",
      unit: "100 m - 10 km",
      color: Colors.biomass.secondary,
      icon: "👱🏼",
    };
  } else if (biomass < 300000000000) {
    return {
      name: "Continental",
      description: "Continent-spanning presence",
      unit: "10-1000 km",
      color: Colors.shop.secondary,
      icon: "🚓",
    };
  } else if (biomass < 100000000000000) {
    return {
      name: "Planetary",
      description: "Planet-wide dominance",
      unit: "1000-10000 km",
      color: Colors.generators.primary,
      icon: "🌍",
    };
  } else {
    return {
      name: "Cosmic",
      description: "Solar system and beyond",
      unit: "10000+ km",
      color: Colors.upgrades.primary,
      icon: "🚀",
    };
  }
}; 