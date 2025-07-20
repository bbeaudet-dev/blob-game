import { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_STATE,
  tick,
  manualClick,
  buyGenerator,
  buyUpgrade,
  evolveToNextLevel,
  type GameState
} from '../game/systems/actions';
import { GAME_CONFIG } from '../game/content/config';
import { createTutorialState, progressTutorial, updateTutorial } from '../game/systems/tutorial';
import type { TutorialState } from '../game/types/ui';
import { saveGameState, loadGameState, saveTutorialState, loadTutorialState } from '../utils/persistence';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to load saved game state on startup
    const savedState = loadGameState();
    if (savedState) {
      return savedState;
    }
    return INITIAL_STATE;
  });

  const [tutorialState, setTutorialState] = useState<TutorialState>(() => {
    // Try to load saved tutorial state
    const savedTutorial = loadTutorialState();
    if (savedTutorial) {
      return savedTutorial;
    }
    
    // Default tutorial state
    const initialState = createTutorialState();
    return {
      ...initialState,
      isActive: true,
      currentStep: {
        id: 'click-blob',
        type: 'click-blob',
        completed: false,
      },
    };
  });

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevState => tick(prevState));
      setTutorialState((prevTutorialState: TutorialState) => {
        const newTutorialState = updateTutorial(prevTutorialState, gameState);
        
        return newTutorialState;
      });
    }, GAME_CONFIG.tickRate);

    return () => clearInterval(interval);
  }, [gameState]);



  // Auto-save game state every 10 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveGameState(gameState);
      saveTutorialState(tutorialState);
    }, 10000); // Save every 10 seconds

    return () => clearInterval(saveInterval);
  }, [gameState, tutorialState]);

  const handleBlobClick = useCallback(() => {
    setGameState(prevState => manualClick(prevState));
    setTutorialState((prevTutorialState: TutorialState) => progressTutorial(prevTutorialState, 'manualClick'));
  }, [gameState]);

  const handleBuyGenerator = useCallback((generatorId: string) => {
    setGameState(prevState => buyGenerator(prevState, generatorId));
    setTutorialState((prevTutorialState: TutorialState) => progressTutorial(prevTutorialState, 'buyGenerator'));
  }, [gameState]);

  const handleBuyUpgrade = useCallback((upgradeId: string) => {
    setGameState(prevState => buyUpgrade(prevState, upgradeId));
    // Trigger tutorial progression for tutorial upgrade
    if (upgradeId === 'tutorial-upgrade') {
      setTutorialState((prevTutorialState: TutorialState) => progressTutorial(prevTutorialState, 'buyGenerator'));
    }
  }, []);

  const handleEvolve = useCallback(() => {
    setGameState(prevState => {
      const newState = evolveToNextLevel(prevState);
      return newState;
    });
    setTutorialState((prevTutorialState: TutorialState) => progressTutorial(prevTutorialState, 'evolve'));
  }, [gameState]);

  const handleTutorialStepComplete = useCallback((stepId: string) => {
    setTutorialState((prevTutorialState: TutorialState) => {
      const newTutorialState = { ...prevTutorialState };
      const newCompletedSteps = new Set(newTutorialState.completedSteps);
      newCompletedSteps.add(stepId);

      // Progress to next step based on current step
      let nextStep = null;
      
      switch (stepId) {
        case 'click-blob':
          nextStep = {
            id: 'shop-intro',
            type: 'shop-intro' as const,
            popupPosition: 'shop' as const,
            popupMessage: 'Generators work like .\n\nUpgrades make Generators stronger!',
            completed: false,
          };
          break;
        case 'shop-intro':
          nextStep = {
            id: 'evolution-intro',
            type: 'evolution-intro' as const,
            popupPosition: 'evolution' as const,
            popupMessage: 'Growing enough allows you to Evolve, unlocking new Levels and Upgrades!',
            completed: false,
          };
          break;
        case 'evolution-intro':
          // Wait for user to evolve
          break;
        default:
          break;
      }

      return {
        ...newTutorialState,
        currentStep: nextStep,
        completedSteps: newCompletedSteps,
        isActive: nextStep !== null,
      };
    });
  }, []);

  return {
    gameState,
    tutorialState,
    handleBlobClick,
    handleBuyGenerator,
    handleBuyUpgrade,
    handleEvolve,
    handleTutorialStepComplete,
  };
}; 