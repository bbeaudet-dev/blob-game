import React from "react";
import { Colors } from "../../../styles/colors";

interface BuyMultiplierToggleProps {
  multiplier: 1 | 10 | 50 | 'double';
  onMultiplierChange: (multiplier: 1 | 10 | 50 | 'double') => void;
  cheatMode?: boolean;
}

export const BuyMultiplierToggle: React.FC<BuyMultiplierToggleProps> = ({
  multiplier,
  onMultiplierChange,
  cheatMode = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "6px",
        padding: "2px",
        width: "fit-content",
      }}
    >
      <button
        onClick={() => onMultiplierChange(1)}
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          backgroundColor:
            multiplier === 1 ? Colors.shop.primary : "transparent",
          color: multiplier === 1 ? "#fff" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: multiplier === 1 ? "bold" : "normal",
          transition: "all 0.2s ease",
          textAlign: "center",
        }}
      >
        Buy 1
      </button>
      <button
        onClick={() => onMultiplierChange(10)}
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          backgroundColor:
            multiplier === 10 ? Colors.shop.primary : "transparent",
          color: multiplier === 10 ? "#fff" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: multiplier === 10 ? "bold" : "normal",
          transition: "all 0.2s ease",
          textAlign: "center",
        }}
      >
        Buy 10
      </button>
      <button
        onClick={() => onMultiplierChange(50)}
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          backgroundColor:
            multiplier === 50 ? Colors.shop.primary : "transparent",
          color: multiplier === 50 ? "#fff" : "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: multiplier === 50 ? "bold" : "normal",
          transition: "all 0.2s ease",
          textAlign: "center",
        }}
      >
        Buy 50
      </button>
      {cheatMode && (
        <button
          onClick={() => onMultiplierChange('double')}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            background: "linear-gradient(45deg, #ff69b4, #ff1493, #8a2be2, #4b0082, #ff69b4, #ff1493)",
            backgroundSize: "300% 300%",
            animation: "shimmer 2s linear infinite",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: multiplier === 'double' ? "bold" : "normal",
            textAlign: "center",
            boxShadow: multiplier === 'double' ? "0 0 15px rgba(255, 105, 180, 0.8)" : "0 0 8px rgba(255, 105, 180, 0.5)",
            opacity: multiplier === 'double' ? 1 : 0.8,
            transition: "opacity 0.2s ease, box-shadow 0.2s ease, font-weight 0.2s ease",
          }}
        >
          2x
        </button>
      )}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};
