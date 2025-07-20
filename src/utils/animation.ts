// Unified Animation System
// This replaces the scattered animation code across multiple components

export interface AnimationConfig {
  duration: number;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  delay?: number;
}

export interface FloatingNumberConfig {
  value: number;
  position: { x: number; y: number };
  color?: string;
  emoji?: string;
  config?: AnimationConfig;
}

export interface RippleConfig {
  position: { x: number; y: number };
  size?: number;
  color?: string;
  direction?: { x: number; y: number };
}

// Easing functions
export const easing = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

// Animation manager class
export class AnimationManager {
  private animations: Map<string, any> = new Map();
  private nextId = 0;

  // Create a floating number animation
  createFloatingNumber(config: FloatingNumberConfig, onComplete?: () => void): string {
    const id = `floating-${this.nextId++}`;
    const startTime = Date.now();
    const animConfig = config.config || { duration: 1000, easing: 'easeOut' };

    const animation = {
      id,
      type: 'floatingNumber',
      config,
      startTime,
      animConfig,
      onComplete,
      isActive: true,
    };

    console.log('AnimationManager: Creating floating number animation:', { id, config });
    this.animations.set(id, animation);
    console.log('AnimationManager: Total animations:', this.animations.size);
    return id;
  }

  // Create a ripple animation
  createRipple(config: RippleConfig, onComplete?: () => void): string {
    const id = `ripple-${this.nextId++}`;
    const startTime = Date.now();

    const animation = {
      id,
      type: 'ripple',
      config,
      startTime,
      animConfig: { duration: 800, easing: 'easeOut' },
      onComplete,
      isActive: true,
    };

    this.animations.set(id, animation);
    return id;
  }

  // Remove an animation
  removeAnimation(id: string): void {
    this.animations.delete(id);
  }

  // Get all active animations
  getActiveAnimations(): any[] {
    return Array.from(this.animations.values()).filter(anim => anim.isActive);
  }

  // Clear all animations
  clearAll(): void {
    this.animations.clear();
  }

  // Get animation progress (0 to 1)
  getProgress(id: string): number {
    const animation = this.animations.get(id);
    if (!animation) return 0;

    const elapsed = Date.now() - animation.startTime;
    const progress = Math.min(elapsed / animation.animConfig.duration, 1);
    
    const easingType = animation.animConfig.easing || 'linear';
    const easingFn = easing[easingType as keyof typeof easing];
    return easingFn(progress);
  }

  // Check if animation is complete
  isComplete(id: string): boolean {
    const animation = this.animations.get(id);
    if (!animation) return true;

    const elapsed = Date.now() - animation.startTime;
    return elapsed >= animation.animConfig.duration;
  }
}

// Global animation manager instance
export const animationManager = new AnimationManager();

// Utility functions for common animations
export const createFloatingNumber = (
  value: number,
  position: { x: number; y: number },
  color = '#4ade80',
  emoji?: string,
  onComplete?: () => void
): string => {
  return animationManager.createFloatingNumber(
    { value, position, color, emoji },
    onComplete
  );
};

export const createRipple = (
  position: { x: number; y: number },
  color = '#ffffff',
  onComplete?: () => void
): string => {
  return animationManager.createRipple(
    { position, color },
    onComplete
  );
};

// Animation loop manager
export class AnimationLoop {
  private isRunning = false;
  private animationId?: number;
  private callbacks: Set<() => void> = new Set();

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  addCallback(callback: () => void): void {
    this.callbacks.add(callback);
  }

  removeCallback(callback: () => void): void {
    this.callbacks.delete(callback);
  }

  private animate = (): void => {
    if (!this.isRunning) return;

    // Run all callbacks
    this.callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Animation loop callback error:', error);
      }
    });

    this.animationId = requestAnimationFrame(this.animate);
  };

  // Force update all callbacks immediately
  forceUpdate(): void {
    this.callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Animation loop callback error:', error);
      }
    });
  }
}

// Global animation loop
export const animationLoop = new AnimationLoop();

// Start the animation loop when the module loads
if (typeof window !== 'undefined') {
  animationLoop.start();
} 