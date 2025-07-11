// UI component props and visual elements

// Tutorial system types
export interface TutorialStep {
  id: string
  type: 'click-blob' | 'buy-generator' | 'evolve' | 'shop-intro' | 'evolution-intro'
  target?: { x: number, y: number }
  completed: boolean
  popupPosition?: 'shop' | 'evolution'
  popupMessage?: string
}

export interface TutorialState {
  currentStep: TutorialStep | null
  completedSteps: Set<string>
  isActive: boolean
}

export interface BlobProps {
  id: string;
  position: { x: number; y: number };
  size?: number;
  biomass?: number;
  gameState?: import('./core').GameState;
  onBlobClick?:
  | ((blobId: string, clickPosition: { x: number; y: number }) => void)
  | (() => void);
  onBlobPress?: (blobId: string) => void;
  onBlobRelease?: (blobId: string) => void;
  color?: string;
  strokeColor?: string;
  glowColor?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  clickPower?: number;
  addFloatingNumber?: (position: { x: number; y: number }, value: number, color?: string, emoji?: string) => void;
  onAnimationStateChange?: (animationState: { clickBoost: number; pressure: number }) => void;
}

export interface CameraState {
  currentZoom: number;
  targetZoom: number;
  isEvolving: boolean;
}

// Blob animation state interface
export interface BlobAnimationValues {
  breathing: number;
  clickBoost: number;
  amoebaNoise: number[];
  pressure: number;
  lastClickTime: number;
  clickHeat: number;
  clickTimes: number[];
  ripplePhase: number;
  rippleIntensity: number;
}

// Generator visualization interfaces
export interface GeneratorVisualization {
  id: string;
  type: 'individual' | 'stacked';
  emoji: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  count: number;
  totalEffect: number;
  levelId: string;
  lastFloatingNumber: number; // timestamp
  // Wave movement properties
  waveOffset: number; // Random offset for wave timing
  waveFrequency: number; // How fast the wave oscillates
  waveAmplitude: number; // How far the wave deviates
  speedMultiplier: number; // Individual speed variation
}

export interface FloatingNumberData {
  x: number;
  y: number;
  value: number;
  color: string;
  emoji?: string;
}

export interface GeneratorEmoji {
  generatorId: string;
  emoji: string;
  angle: number;
  count: number;
  name: string;
}

// Animation and particle system types
export interface Particle {
  id: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  type: 'circle' | 'bacteria' | 'mice' | 'spaceships' | 'tanks' | 'galaxies' | 'people';
  useImage?: boolean;
  image?: string;
  direction: { x: number; y: number };
  // Enhanced behavior properties
  state?: 'approaching' | 'attracted' | 'spiraling';
  spiralAngle?: number; // For spiral absorption
  magneticForce?: number; // Strength of magnetic attraction
}

// Combo system for enhanced feeding effects
export interface ComboTracker {
  count: number;
  recentAbsorptions: number[]; // timestamps
  multiplier: number;
  isActive: boolean;
}

export interface FloatingNumberAnimation {
  id: string;
  type: 'floatingNumber';
  position: { x: number; y: number };
  value: number;
  color?: string;
  startTime: number;
  emoji?: string;
}

export interface ParticleData {
  id: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  size: number;
  startTime: number;
  lifespan: number;
} 