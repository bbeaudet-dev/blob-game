import React, { useState, useCallback } from "react";
import type { GameSceneProps } from "../game/types";
import { getCurrentLevel } from "../game/systems/actions";
import { ParticleSystem } from "./particles/ParticleSystem";
import { BlobContainer } from "./blob/BlobContainer";
import { GeneratorVisualization } from "./generators/GeneratorVisualization";
import { AnimationRenderer } from "./animations/AnimationRenderer";
import { RippleSystem } from "./particles/RippleSystem";
import Map from "./map/Map";
import { createFloatingNumber } from "../utils/animation";

export const GameScene: React.FC<GameSceneProps> = ({
  gameState,
  blobSize,
  onBlobClick,
  zoom,
  
  // Generator visualization
  outerRingsFaster = true,
  equalNumbers = true,
  
  // Particle customization
  particleDensity = "medium",
  particleSpeed = "normal",
  particleSize = "normal",
  

}) => {
  const currentLevel = getCurrentLevel(gameState);
  const [blobAnimationState, setBlobAnimationState] = useState<{
    clickBoost: number;
    pressure: number;
  }>({
    clickBoost: 0,
    pressure: 0,
  });

  const addFloatingNumber = useCallback(
    (
      position: { x: number; y: number },
      value: number,
      color?: string,
      emoji?: string
    ) => {
      createFloatingNumber(value, position, color, emoji);
    },
    []
  );

  return (
    <div
      className="game-scene"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* Background Layer with Zoom - z-index: 0 */}
      <Map className="z-0" zoom={zoom} gameState={gameState} />

      {/* Environment Effects Layer - z-index: 30 (outside zoom) */}
      <ParticleSystem
        gameState={gameState}
        currentLevel={currentLevel}
        blobSize={blobSize}
        particleDensity={particleDensity}
        particleSpeed={particleSpeed}
        particleSize={particleSize}
      />

      {/* Player Layer - z-index: 70+ (outside zoom) */}
      {/* Blob Layer - z-index: 70 */}
      <BlobContainer
        id="main-blob"
        biomass={gameState.biomass}
        gameState={gameState}
        size={blobSize}
        onBlobClick={onBlobClick}
        clickPower={gameState.clickPower}
        addFloatingNumber={addFloatingNumber}
        onAnimationStateChange={setBlobAnimationState}

      />

      {/* Generator Visualization - z-index: 80 */}
      <GeneratorVisualization 
        gameState={gameState} 
        blobSize={blobSize} 
        outerRingsFaster={outerRingsFaster}
        equalNumbers={equalNumbers}
      />

      {/* Ripple Effects Layer - z-index: 75 (above blob, below generators) */}
      <RippleSystem
        blobSize={blobSize}
        blobAnimationState={blobAnimationState}
      />

      {/* Unified Animation Renderer - z-index: 90+ */}
      <AnimationRenderer gameState={gameState} />
    </div>
  );
};
