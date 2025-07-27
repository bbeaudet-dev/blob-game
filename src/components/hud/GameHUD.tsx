import React from "react";
import type { GameHUDProps } from "../../game/types";
import { GameStats } from "./GameStats";
import { Shop } from "./Shop";
import { EvolutionPanel } from "./Evolution/EvolutionPanel";
import { TutorialManager } from "../tutorial/TutorialManager";
import { SlimeTrail } from "../particles/SlimeTrail";
import { calculateBlobPosition } from "../../game/systems/calculations";

export const GameHUD: React.FC<GameHUDProps> = ({
  biomass,
  gameState,
  tutorialState,
  onBuyGenerator,
  onBuyUpgrade,
  onEvolve,
  onTutorialStepComplete,
}) => {
  const blobPosition = calculateBlobPosition();
  const shopWidth = 350;
  const evolutionWidth = 300;

  return (
    <>
      {/* GameStats - Center of screen */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <GameStats biomass={biomass} gameState={gameState} />
      </div>

      {/* Shop Section - Left side */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${shopWidth}px`,
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <Shop
          biomass={biomass}
          gameState={gameState}
          tutorialState={tutorialState}
          onBuyGenerator={onBuyGenerator}
          onBuyUpgrade={onBuyUpgrade}
        />
      </div>

      {/* Evolution Panel - Right side */}
      {gameState && (
        <EvolutionPanel
          biomass={biomass}
          gameState={gameState}
          onEvolve={onEvolve}
          width={evolutionWidth}
        />
      )}

      {/* Tutorial Indicator - Bottom of screen */}
      {tutorialState?.isActive && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#4ade80",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "19px", // 35% bigger than 14px
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1px",
            border: "2px solid #4ade80",
            animation: "tutorialPulse 2s ease-in-out infinite",
          }}
        >
          Tutorial
        </div>
      )}

      {/* Slime Trail - Only active when tutorial is not active */}
      <SlimeTrail isActive={!tutorialState?.isActive} />

      {/* Tutorial System - Highest z-index */}
      {tutorialState &&
        (() => {
          return (
            <TutorialManager
              tutorialState={tutorialState}
              blobPosition={blobPosition}
              onTutorialStepComplete={onTutorialStepComplete}
            />
          );
        })()}

      <style>{`
        @keyframes tutorialPulse {
          0% {
            box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
            transform: translateX(-50%) scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(74, 222, 128, 0.8);
            transform: translateX(-50%) scale(1.05);
          }
          100% {
            box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
            transform: translateX(-50%) scale(1);
          }
        }
      `}</style>
    </>
  );
};
