import { calculateBlobPosition } from "../../game/systems/calculations";
import { getCurrentLevel } from "../../game/systems/actions";
import type { GameState } from "../../game/types";

interface MapProps {
  className?: string;
  zoom?: number;
  gameState: GameState;
}

export default function Map({ className, zoom = 1, gameState }: MapProps) {
  const currentLevel = getCurrentLevel(gameState);
  const blobPosition = calculateBlobPosition();

  // Calculate the transform origin as a percentage of the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Transform origin should be at the blob position (as percentages)
  const transformOriginX = (blobPosition.x / screenWidth) * 100;
  const transformOriginY = (blobPosition.y / screenHeight) * 100;

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        backgroundImage: `url(/assets/images/backgrounds/${currentLevel.background}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transform: `scale(${zoom})`,
        transformOrigin: `${transformOriginX}% ${transformOriginY}%`,
      }}
    />
  );
}
