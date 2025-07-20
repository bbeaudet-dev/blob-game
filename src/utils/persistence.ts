import type { GameState } from '../game/types';

const GAME_SAVE_KEY = 'blob-game-save';
const TUTORIAL_SAVE_KEY = 'blob-game-tutorial';

// Save game state to localStorage
export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(gameState));
    

  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
};

// Load game state from localStorage
export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(GAME_SAVE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    // Validate that it looks like a game state
    if (typeof parsed === 'object' && 
        typeof parsed.biomass === 'number' && 
        typeof parsed.currentLevelId === 'number') {
      
      // Reconstruct Set objects that were serialized as arrays
      const reconstructedState = {
        ...parsed,
        notifications: {
          ...parsed.notifications,
          shownMilestones: new Set(parsed.notifications?.shownMilestones || []),
        }
      };
      

      
      return reconstructedState;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to load game state:', error);
    return null;
  }
};



// Save tutorial state to localStorage
export const saveTutorialState = (tutorialState: any): void => {
  try {
    localStorage.setItem(TUTORIAL_SAVE_KEY, JSON.stringify(tutorialState));
    

  } catch (error) {
    console.warn('Failed to save tutorial state:', error);
  }
};

// Load tutorial state from localStorage
export const loadTutorialState = (): any | null => {
  try {
    const saved = localStorage.getItem(TUTORIAL_SAVE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    // Validate that it looks like tutorial state
    if (typeof parsed === 'object' && 
        typeof parsed.isActive === 'boolean') {
      
      // Reconstruct Set objects that were serialized as arrays
      const reconstructedState = {
        ...parsed,
        completedSteps: new Set(parsed.completedSteps || []),
      };
      

      
      return reconstructedState;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to load tutorial state:', error);
    return null;
  }
};

// Clear all saved data (for debugging or reset)
export const clearAllSaves = (): void => {
  localStorage.removeItem(GAME_SAVE_KEY);
  localStorage.removeItem(TUTORIAL_SAVE_KEY);
};

 