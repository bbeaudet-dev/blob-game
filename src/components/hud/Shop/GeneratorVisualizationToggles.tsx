import React from "react";
import { Colors } from "../../../styles/colors";

interface GeneratorVisualizationTogglesProps {
  outerRingsFaster: boolean;
  onOuterRingsFasterChange: (value: boolean) => void;
  equalNumbers: boolean;
  onEqualNumbersChange: (value: boolean) => void;
}

export const GeneratorVisualizationToggles: React.FC<GeneratorVisualizationTogglesProps> = ({
  outerRingsFaster,
  onOuterRingsFasterChange,
  equalNumbers,
  onEqualNumbersChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      {/* Speed Direction Toggle */}
      <div
        style={{
          display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
          padding: "2px",
        }}
      >
        <button
          onClick={() => onOuterRingsFasterChange(!outerRingsFaster)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            backgroundColor:
              !outerRingsFaster ? Colors.shop.primary : "transparent",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: !outerRingsFaster ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          Inner Faster
        </button>
        <button
          onClick={() => onOuterRingsFasterChange(!outerRingsFaster)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            backgroundColor:
              outerRingsFaster ? Colors.shop.primary : "transparent",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: outerRingsFaster ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          Outer Faster
        </button>
      </div>

      {/* Emoji Distribution Toggle */}
      <div
        style={{
          display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
          padding: "2px",
        }}
      >
        <button
          onClick={() => onEqualNumbersChange(!equalNumbers)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            backgroundColor:
              !equalNumbers ? Colors.shop.primary : "transparent",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: !equalNumbers ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          Equal Spacing
        </button>
        <button
          onClick={() => onEqualNumbersChange(!equalNumbers)}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            backgroundColor:
              equalNumbers ? Colors.shop.primary : "transparent",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: equalNumbers ? "bold" : "normal",
            transition: "all 0.2s ease",
          }}
        >
          Equal Numbers
        </button>
      </div>
    </div>
  );
}; 