import React from "react";
import type { GameState } from "../../../game/types";
import { Colors } from "../../../styles/colors";
import {
  getNextLevel,
  canEvolveToNextLevel,
  getCurrentLevel,
} from "../../../game/systems/actions";
import { CurrentLevel } from "./CurrentLevel";
import { NextEvolution } from "./NextEvolution";
import { EvolutionButton } from "./EvolutionButton";
import { CustomizationToggles } from "../Shop/CustomizationToggles";

interface EvolutionPanelProps {
  biomass: number;
  gameState?: GameState;
  onEvolve?: () => void;
  zoom?: number;
  width?: number;
  
  // Generator visualization
  outerRingsFaster?: boolean;
  onOuterRingsFasterChange?: (value: boolean) => void;
  equalNumbers?: boolean;
  onEqualNumbersChange?: (value: boolean) => void;
  
  // Particle settings
  particleDensity?: "low" | "medium" | "high";
  onParticleDensityChange?: (value: "low" | "medium" | "high") => void;
  particleSpeed?: "slow" | "normal" | "fast";
  onParticleSpeedChange?: (value: "slow" | "normal" | "fast") => void;
  particleSize?: "small" | "normal" | "large";
  onParticleSizeChange?: (value: "small" | "normal" | "large") => void;
  particleColors?: "rainbow" | "monochrome" | "themed";
  onParticleColorsChange?: (value: "rainbow" | "monochrome" | "themed") => void;
  
  // Audio settings
  soundEffectsVolume?: number;
  onSoundEffectsVolumeChange?: (value: number) => void;
  musicVolume?: number;
  onMusicVolumeChange?: (value: number) => void;
  
  // Blob effects
  clickSensitivity?: "low" | "normal" | "high";
  onClickSensitivityChange?: (value: "low" | "normal" | "high") => void;
}

export const EvolutionPanel: React.FC<EvolutionPanelProps> = ({
  biomass,
  gameState,
  onEvolve,
  width = 275,
  
  // Generator visualization
  outerRingsFaster = true,
  onOuterRingsFasterChange,
  equalNumbers = true,
  onEqualNumbersChange,
  
  // Particle settings
  particleDensity = "medium",
  onParticleDensityChange,
  particleSpeed = "normal",
  onParticleSpeedChange,
  particleSize = "normal",
  onParticleSizeChange,
  
  // Audio settings
  soundEffectsVolume = 0.3,
  onSoundEffectsVolumeChange,
  musicVolume = 0.35,
  onMusicVolumeChange,
  

}) => {
  if (!gameState) return null;

  const currentLevel = getCurrentLevel(gameState);
  const nextLevel = getNextLevel(gameState);
  const canEvolve = canEvolveToNextLevel(gameState);

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        transform: "none",
        width: `${width}px`,
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        borderRadius: "0",
        zIndex: 1000,
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2
        style={{
          margin: "0",
          fontSize: "24px",
          color: Colors.evolution.primary,
          textAlign: "center",
          textTransform: "uppercase",
          textShadow:
            "0 0 12px rgba(200, 200, 200, 0.4), 0 0 24px rgba(200, 200, 200, 0.4)",
        }}
      >
        EVOLUTION
      </h2>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <CurrentLevel
          displayName={currentLevel.displayName}
          name={currentLevel.name}
          description={currentLevel.description}
        />
      </div>

      {nextLevel && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <NextEvolution
            nextLevel={nextLevel}
            canEvolve={canEvolve}
            biomass={biomass}
            gameState={gameState}
          />
        </div>
      )}

      <EvolutionButton
        canEvolve={canEvolve}
        hasNextLevel={!!nextLevel}
        onEvolve={onEvolve}
        currentLevelId={currentLevel.id}
        isGameCompleted={gameState.isGameCompleted}
      />

      {/* Spacer to push customization to bottom */}
      <div style={{ flex: 1 }} />

      {/* Customization Section - Bottom Justified */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "40px",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "16px",
            color: "#C0C0C0", // Silver/gray color to match settings theme
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          SETTINGS
        </h3>
        <CustomizationToggles
          // Generator visualization
          outerRingsFaster={outerRingsFaster}
          onOuterRingsFasterChange={onOuterRingsFasterChange || (() => {})}
          equalNumbers={equalNumbers}
          onEqualNumbersChange={onEqualNumbersChange || (() => {})}
          
          // Particle settings
          particleDensity={particleDensity}
          onParticleDensityChange={onParticleDensityChange || (() => {})}
          particleSpeed={particleSpeed}
          onParticleSpeedChange={onParticleSpeedChange || (() => {})}
          particleSize={particleSize}
          onParticleSizeChange={onParticleSizeChange || (() => {})}
          
          // Audio settings
          soundEffectsVolume={soundEffectsVolume}
          onSoundEffectsVolumeChange={onSoundEffectsVolumeChange || (() => {})}
          musicVolume={musicVolume}
          onMusicVolumeChange={onMusicVolumeChange || (() => {})}
          

        />
      </div>
    </div>
  );
};
