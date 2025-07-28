import { GENERATORS } from '../game/content/generators';
import { UPGRADES } from '../game/content/upgrades';
import { LEVELS } from '../game/content/levels';

// Helper functions
function getGeneratorsForLevel(levelName: string) {
  return Object.values(GENERATORS).filter(g => g.unlockedAtLevel === levelName);
}

function getUpgradesForLevel(levelName: string) {
  return Object.values(UPGRADES).filter(u => u.unlockedAtLevel === levelName);
}

function calculateGeneratorCost(generator: any, level: number = 1) {
  return generator.baseCost * Math.pow(generator.costMultiplier, level - 1);
}

function calculateGeneratorEffect(generator: any, level: number = 1) {
  return generator.growthPerTick * level;
}

function formatNumber(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

// Test functions
function analyzeGeneratorCostToGrowthRatios() {
  console.log('\n=== GENERATOR COST-TO-GROWTH RATIO ANALYSIS ===');

  for (const level of LEVELS) {
    const generators = getGeneratorsForLevel(level.name);
    if (generators.length === 0) continue;

    console.log(`\n📊 ${level.displayName} (${level.name}):`);
    console.log(`   Threshold: ${formatNumber(level.biomassThreshold)}`);

    // Analyze each generator
    const generatorAnalysis = generators.map(generator => {
      const baseCost = generator.baseCost;
      const baseEffect = generator.growthPerTick;
      const costToGrowthRatio = baseCost / baseEffect;
      const costMultiplier = generator.costMultiplier;

      // Calculate cost at different levels
      const costLevel1 = calculateGeneratorCost(generator, 1);
      const costLevel10 = calculateGeneratorCost(generator, 10);
      const costLevel100 = calculateGeneratorCost(generator, 100);

      // Calculate effect at different levels
      const effectLevel1 = calculateGeneratorEffect(generator, 1);
      const effectLevel10 = calculateGeneratorEffect(generator, 10);
      const effectLevel100 = calculateGeneratorEffect(generator, 100);

      // Calculate cost-to-growth ratios at different levels
      const ratioLevel1 = costLevel1 / effectLevel1;
      const ratioLevel10 = costLevel10 / effectLevel10;
      const ratioLevel100 = costLevel100 / effectLevel100;

      return {
        generator,
        baseCost,
        baseEffect,
        costToGrowthRatio,
        costMultiplier,
        costLevel1,
        costLevel10,
        costLevel100,
        effectLevel1,
        effectLevel10,
        effectLevel100,
        ratioLevel1,
        ratioLevel10,
        ratioLevel100
      };
    });

    // Sort by base cost for better readability
    generatorAnalysis.sort((a, b) => a.baseCost - b.baseCost);

    // Display analysis
    for (const analysis of generatorAnalysis) {
      console.log(`\n   ${analysis.generator.name}:`);
      console.log(`     Base Cost: ${formatNumber(analysis.baseCost)}`);
      console.log(`     Base Effect: ${formatNumber(analysis.baseEffect)}/tick`);
      console.log(`     Cost/Growth Ratio: ${analysis.costToGrowthRatio.toFixed(2)}`);
      console.log(`     Cost Multiplier: ${analysis.costMultiplier}x`);
      
      console.log(`     Cost at Level 1: ${formatNumber(analysis.costLevel1)}`);
      console.log(`     Cost at Level 10: ${formatNumber(analysis.costLevel10)}`);
      console.log(`     Cost at Level 100: ${formatNumber(analysis.costLevel100)}`);
      
      console.log(`     Effect at Level 1: ${formatNumber(analysis.effectLevel1)}/tick`);
      console.log(`     Effect at Level 10: ${formatNumber(analysis.effectLevel10)}/tick`);
      console.log(`     Effect at Level 100: ${formatNumber(analysis.effectLevel100)}/tick`);
      
      console.log(`     Cost/Growth Ratio at Level 1: ${analysis.ratioLevel1.toFixed(2)}`);
      console.log(`     Cost/Growth Ratio at Level 10: ${analysis.ratioLevel10.toFixed(2)}`);
      console.log(`     Cost/Growth Ratio at Level 100: ${analysis.ratioLevel100.toFixed(2)}`);

      // Analysis comments
      if (analysis.costToGrowthRatio < 1) {
        console.log(`     💚 EXCELLENT: Very efficient base ratio`);
      } else if (analysis.costToGrowthRatio < 10) {
        console.log(`     ✅ GOOD: Reasonable base ratio`);
      } else if (analysis.costToGrowthRatio < 100) {
        console.log(`     ⚠️  MODERATE: Higher cost ratio`);
      } else {
        console.log(`     ❌ EXPENSIVE: Very high cost ratio`);
      }

      if (analysis.costMultiplier < 1.1) {
        console.log(`     💚 EXCELLENT: Very slow cost scaling`);
      } else if (analysis.costMultiplier < 1.15) {
        console.log(`     ✅ GOOD: Reasonable cost scaling`);
      } else if (analysis.costMultiplier < 1.2) {
        console.log(`     ⚠️  MODERATE: Faster cost scaling`);
      } else {
        console.log(`     ❌ FAST: Very fast cost scaling`);
      }
    }

    // Compare generators within the level
    if (generatorAnalysis.length > 1) {
      console.log(`\n   📈 WITHIN-LEVEL COMPARISON:`);
      const ratios = generatorAnalysis.map(a => a.costToGrowthRatio);
      const minRatio = Math.min(...ratios);
      const maxRatio = Math.max(...ratios);
      const ratioSpread = maxRatio / minRatio;
      
      console.log(`     Best ratio: ${minRatio.toFixed(2)} (${generatorAnalysis.find(a => a.costToGrowthRatio === minRatio)?.generator.name})`);
      console.log(`     Worst ratio: ${maxRatio.toFixed(2)} (${generatorAnalysis.find(a => a.costToGrowthRatio === maxRatio)?.generator.name})`);
      console.log(`     Ratio spread: ${ratioSpread.toFixed(2)}x difference`);
      
      if (ratioSpread < 2) {
        console.log(`     💚 EXCELLENT: Very balanced generators`);
      } else if (ratioSpread < 5) {
        console.log(`     ✅ GOOD: Reasonably balanced`);
      } else if (ratioSpread < 10) {
        console.log(`     ⚠️  MODERATE: Some imbalance`);
      } else {
        console.log(`     ❌ UNBALANCED: Large efficiency gap`);
      }
    }
  }
}

function analyzeUpgradeCostToGrowthRatios() {
  console.log('\n=== UPGRADE COST-TO-GROWTH RATIO ANALYSIS ===');

  for (const level of LEVELS) {
    const upgrades = getUpgradesForLevel(level.name);
    if (upgrades.length === 0) continue;

    console.log(`\n📊 ${level.displayName} (${level.name}):`);

    // Analyze each upgrade
    const upgradeAnalysis = upgrades.map(upgrade => {
      const cost = upgrade.cost;
      const effect = upgrade.effect;
      const costToEffectRatio = cost / effect;
      
      // Get target generators for this upgrade
      const targetGenerators = upgrade.targetLevel ? getGeneratorsForLevel(upgrade.targetLevel) : [];
      const totalBaseEffect = targetGenerators.reduce((sum, g) => sum + g.growthPerTick, 0);
      const totalBaseCost = targetGenerators.reduce((sum, g) => sum + g.baseCost, 0);
      
      // Calculate the "value" of this upgrade
      const upgradeValue = totalBaseEffect * (effect - 1); // Additional growth per tick
      const costToValueRatio = cost / upgradeValue;

      return {
        upgrade,
        cost,
        effect,
        costToEffectRatio,
        targetLevel: upgrade.targetLevel,
        targetGenerators,
        totalBaseEffect,
        totalBaseCost,
        upgradeValue,
        costToValueRatio
      };
    });

    // Sort by cost for better readability
    upgradeAnalysis.sort((a, b) => a.cost - b.cost);

    // Display analysis
    for (const analysis of upgradeAnalysis) {
      console.log(`\n   ${analysis.upgrade.name}:`);
      console.log(`     Cost: ${formatNumber(analysis.cost)}`);
      console.log(`     Effect: ${analysis.effect}x multiplier`);
      console.log(`     Cost/Effect Ratio: ${analysis.costToEffectRatio.toFixed(2)}`);
      console.log(`     Targets: ${analysis.targetLevel} level generators`);
      console.log(`     Target Generators: ${analysis.targetGenerators.map(g => g.name).join(', ')}`);
      console.log(`     Total Base Effect: ${formatNumber(analysis.totalBaseEffect)}/tick`);
      console.log(`     Total Base Cost: ${formatNumber(analysis.totalBaseCost)}`);
      console.log(`     Upgrade Value: +${formatNumber(analysis.upgradeValue)}/tick`);
      console.log(`     Cost/Value Ratio: ${analysis.costToValueRatio.toFixed(2)}`);

      // Analysis comments
      if (analysis.costToValueRatio < 1) {
        console.log(`     💚 EXCELLENT: Very cost-effective upgrade`);
      } else if (analysis.costToValueRatio < 10) {
        console.log(`     ✅ GOOD: Reasonable cost-effectiveness`);
      } else if (analysis.costToValueRatio < 100) {
        console.log(`     ⚠️  MODERATE: Less cost-effective`);
      } else {
        console.log(`     ❌ EXPENSIVE: Very expensive for the value`);
      }

      if (analysis.effect < 2) {
        console.log(`     ⚠️  WEAK: Low effect multiplier`);
      } else if (analysis.effect < 5) {
        console.log(`     ✅ GOOD: Reasonable effect`);
      } else if (analysis.effect < 10) {
        console.log(`     💚 STRONG: Good effect`);
      } else {
        console.log(`     🔥 POWERFUL: Very strong effect`);
      }
    }

    // Compare upgrades within the level
    if (upgradeAnalysis.length > 1) {
      console.log(`\n   📈 WITHIN-LEVEL COMPARISON:`);
      const ratios = upgradeAnalysis.map(a => a.costToValueRatio);
      const minRatio = Math.min(...ratios);
      const maxRatio = Math.max(...ratios);
      const ratioSpread = maxRatio / minRatio;
      
      console.log(`     Best value: ${minRatio.toFixed(2)} (${upgradeAnalysis.find(a => a.costToValueRatio === minRatio)?.upgrade.name})`);
      console.log(`     Worst value: ${maxRatio.toFixed(2)} (${upgradeAnalysis.find(a => a.costToValueRatio === maxRatio)?.upgrade.name})`);
      console.log(`     Value spread: ${ratioSpread.toFixed(2)}x difference`);
      
      if (ratioSpread < 2) {
        console.log(`     💚 EXCELLENT: Very balanced upgrades`);
      } else if (ratioSpread < 5) {
        console.log(`     ✅ GOOD: Reasonably balanced`);
      } else if (ratioSpread < 10) {
        console.log(`     ⚠️  MODERATE: Some imbalance`);
      } else {
        console.log(`     ❌ UNBALANCED: Large value gap`);
      }
    }
  }
}

function analyzeThresholdCostRatios() {
  console.log('\n=== THRESHOLD COST RATIO ANALYSIS ===');

  for (let i = 1; i < LEVELS.length; i++) {
    const currentLevel = LEVELS[i];
    const previousLevel = LEVELS[i - 1];
    const nextLevel = LEVELS[i + 1];

    console.log(`\n📊 ${currentLevel.displayName} (${currentLevel.name}):`);
    console.log(`   Current Threshold: ${formatNumber(currentLevel.biomassThreshold)}`);

    // Previous threshold analysis
    if (previousLevel) {
      const previousThreshold = previousLevel.biomassThreshold;
      const thresholdIncrease = currentLevel.biomassThreshold / previousThreshold;
      
      console.log(`   Previous Threshold: ${formatNumber(previousThreshold)}`);
      console.log(`   Threshold Increase: ${thresholdIncrease.toFixed(2)}x`);

      if (thresholdIncrease < 2) {
        console.log(`   ⚠️  SMALL: Very small threshold increase`);
      } else if (thresholdIncrease < 10) {
        console.log(`   ✅ GOOD: Reasonable threshold increase`);
      } else if (thresholdIncrease < 100) {
        console.log(`   💚 LARGE: Good threshold increase`);
      } else {
        console.log(`   🔥 MASSIVE: Very large threshold increase`);
      }
    }

    // Next threshold analysis
    if (nextLevel) {
      const nextThreshold = nextLevel.biomassThreshold;
      const nextThresholdIncrease = nextThreshold / currentLevel.biomassThreshold;
      
      console.log(`   Next Threshold: ${formatNumber(nextThreshold)}`);
      console.log(`   Next Threshold Increase: ${nextThresholdIncrease.toFixed(2)}x`);

      if (nextThresholdIncrease < 2) {
        console.log(`   ⚠️  SMALL: Very small next threshold increase`);
      } else if (nextThresholdIncrease < 10) {
        console.log(`   ✅ GOOD: Reasonable next threshold increase`);
      } else if (nextThresholdIncrease < 100) {
        console.log(`   💚 LARGE: Good next threshold increase`);
      } else {
        console.log(`   🔥 MASSIVE: Very large next threshold increase`);
      }
    }

    // Compare with generators in current level
    const currentGenerators = getGeneratorsForLevel(currentLevel.name);
    if (currentGenerators.length > 0) {
      const cheapestGenerator = Math.min(...currentGenerators.map(g => g.baseCost));
      const mostExpensiveGenerator = Math.max(...currentGenerators.map(g => g.baseCost));
      
      console.log(`   Cheapest Generator: ${formatNumber(cheapestGenerator)}`);
      console.log(`   Most Expensive Generator: ${formatNumber(mostExpensiveGenerator)}`);
      
      const thresholdToCheapestRatio = currentLevel.biomassThreshold / cheapestGenerator;
      const thresholdToMostExpensiveRatio = currentLevel.biomassThreshold / mostExpensiveGenerator;
      
      console.log(`   Threshold/Cheapest Ratio: ${thresholdToCheapestRatio.toFixed(2)}x`);
      console.log(`   Threshold/Most Expensive Ratio: ${thresholdToMostExpensiveRatio.toFixed(2)}x`);

      if (thresholdToCheapestRatio < 1) {
        console.log(`   ❌ PROBLEM: Threshold is lower than cheapest generator!`);
      } else if (thresholdToCheapestRatio < 2) {
        console.log(`   ⚠️  TIGHT: Threshold is very close to cheapest generator`);
      } else if (thresholdToCheapestRatio < 10) {
        console.log(`   ✅ GOOD: Reasonable gap to cheapest generator`);
      } else {
        console.log(`   💚 GENEROUS: Large gap to cheapest generator`);
      }

      if (thresholdToMostExpensiveRatio < 1) {
        console.log(`   ❌ PROBLEM: Threshold is lower than most expensive generator!`);
      } else if (thresholdToMostExpensiveRatio < 2) {
        console.log(`   ⚠️  TIGHT: Threshold is very close to most expensive generator`);
      } else if (thresholdToMostExpensiveRatio < 10) {
        console.log(`   ✅ GOOD: Reasonable gap to most expensive generator`);
      } else {
        console.log(`   💚 GENEROUS: Large gap to most expensive generator`);
      }
    }

    // Compare with upgrades in current level
    const currentUpgrades = getUpgradesForLevel(currentLevel.name);
    if (currentUpgrades.length > 0) {
      const cheapestUpgrade = Math.min(...currentUpgrades.map(u => u.cost));
      const mostExpensiveUpgrade = Math.max(...currentUpgrades.map(u => u.cost));
      
      console.log(`   Cheapest Upgrade: ${formatNumber(cheapestUpgrade)}`);
      console.log(`   Most Expensive Upgrade: ${formatNumber(mostExpensiveUpgrade)}`);
      
      const thresholdToCheapestUpgradeRatio = currentLevel.biomassThreshold / cheapestUpgrade;
      const thresholdToMostExpensiveUpgradeRatio = currentLevel.biomassThreshold / mostExpensiveUpgrade;
      
      console.log(`   Threshold/Cheapest Upgrade Ratio: ${thresholdToCheapestUpgradeRatio.toFixed(2)}x`);
      console.log(`   Threshold/Most Expensive Upgrade Ratio: ${thresholdToMostExpensiveUpgradeRatio.toFixed(2)}x`);

      if (thresholdToCheapestUpgradeRatio < 1) {
        console.log(`   ❌ PROBLEM: Threshold is lower than cheapest upgrade!`);
      } else if (thresholdToCheapestUpgradeRatio < 2) {
        console.log(`   ⚠️  TIGHT: Threshold is very close to cheapest upgrade`);
      } else if (thresholdToCheapestUpgradeRatio < 10) {
        console.log(`   ✅ GOOD: Reasonable gap to cheapest upgrade`);
      } else {
        console.log(`   💚 GENEROUS: Large gap to cheapest upgrade`);
      }
    }
  }
}

function generateSummaryReport() {
  console.log('\n=== SUMMARY REPORT ===');

  // Overall generator efficiency
  const allGenerators = Object.values(GENERATORS);
  const avgCostToGrowthRatio = allGenerators.reduce((sum, g) => sum + (g.baseCost / g.growthPerTick), 0) / allGenerators.length;
  const minCostToGrowthRatio = Math.min(...allGenerators.map(g => g.baseCost / g.growthPerTick));
  const maxCostToGrowthRatio = Math.max(...allGenerators.map(g => g.baseCost / g.growthPerTick));

  console.log(`\n📊 GENERATOR EFFICIENCY SUMMARY:`);
  console.log(`   Average Cost/Growth Ratio: ${avgCostToGrowthRatio.toFixed(2)}`);
  console.log(`   Best Ratio: ${minCostToGrowthRatio.toFixed(2)} (${allGenerators.find(g => g.baseCost / g.growthPerTick === minCostToGrowthRatio)?.name})`);
  console.log(`   Worst Ratio: ${maxCostToGrowthRatio.toFixed(2)} (${allGenerators.find(g => g.baseCost / g.growthPerTick === maxCostToGrowthRatio)?.name})`);
  console.log(`   Efficiency Spread: ${(maxCostToGrowthRatio / minCostToGrowthRatio).toFixed(2)}x`);

  // Overall upgrade efficiency
  const allUpgrades = Object.values(UPGRADES);
  const upgradeEfficiencies = allUpgrades.map(upgrade => {
    const targetGenerators = upgrade.targetLevel ? getGeneratorsForLevel(upgrade.targetLevel) : [];
    const totalBaseEffect = targetGenerators.reduce((sum, g) => sum + g.growthPerTick, 0);
    const upgradeValue = totalBaseEffect * (upgrade.effect - 1);
    return upgrade.cost / upgradeValue;
  });
  
  const avgUpgradeEfficiency = upgradeEfficiencies.reduce((sum, eff) => sum + eff, 0) / upgradeEfficiencies.length;
  const minUpgradeEfficiency = Math.min(...upgradeEfficiencies);
  const maxUpgradeEfficiency = Math.max(...upgradeEfficiencies);

  console.log(`\n📊 UPGRADE EFFICIENCY SUMMARY:`);
  console.log(`   Average Cost/Value Ratio: ${avgUpgradeEfficiency.toFixed(2)}`);
  console.log(`   Best Value: ${minUpgradeEfficiency.toFixed(2)} (${allUpgrades[upgradeEfficiencies.indexOf(minUpgradeEfficiency)]?.name})`);
  console.log(`   Worst Value: ${maxUpgradeEfficiency.toFixed(2)} (${allUpgrades[upgradeEfficiencies.indexOf(maxUpgradeEfficiency)]?.name})`);
  console.log(`   Value Spread: ${(maxUpgradeEfficiency / minUpgradeEfficiency).toFixed(2)}x`);

  // Threshold progression
  const thresholdIncreases = [];
  for (let i = 1; i < LEVELS.length; i++) {
    const increase = LEVELS[i].biomassThreshold / LEVELS[i-1].biomassThreshold;
    thresholdIncreases.push(increase);
  }
  
  const avgThresholdIncrease = thresholdIncreases.reduce((sum, inc) => sum + inc, 0) / thresholdIncreases.length;
  const minThresholdIncrease = Math.min(...thresholdIncreases);
  const maxThresholdIncrease = Math.max(...thresholdIncreases);

  console.log(`\n📊 THRESHOLD PROGRESSION SUMMARY:`);
  console.log(`   Average Threshold Increase: ${avgThresholdIncrease.toFixed(2)}x`);
  console.log(`   Smallest Increase: ${minThresholdIncrease.toFixed(2)}x`);
  console.log(`   Largest Increase: ${maxThresholdIncrease.toFixed(2)}x`);
  console.log(`   Progression Spread: ${(maxThresholdIncrease / minThresholdIncrease).toFixed(2)}x`);
}

// Main test runner
export function runCostAnalysisTests() {
  console.log('💰 RUNNING COST-TO-GROWTH RATIO ANALYSIS');
  console.log('==========================================');

  analyzeGeneratorCostToGrowthRatios();
  analyzeUpgradeCostToGrowthRatios();
  analyzeThresholdCostRatios();
  generateSummaryReport();

  console.log('\n==========================================');
  console.log('✅ COST ANALYSIS TESTS COMPLETE');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runCostAnalysisTests();
} 