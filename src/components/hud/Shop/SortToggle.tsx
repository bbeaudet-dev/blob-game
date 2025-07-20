import React from "react";
import { Colors } from "../../../styles/colors";

type SortOption = "price" | "value" | "level";

interface SortToggleProps {
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

export const SortToggle: React.FC<SortToggleProps> = ({
  sortOption,
  onSortChange,
}) => {
  const options: { value: SortOption; label: string }[] = [
    { value: "price", label: "Price" },
    { value: "value", label: "Value" },
    { value: "level", label: "Level" },
  ];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "6px",
        padding: "2px",
        border: `1px solid ${Colors.shop.primary}`,
      }}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          style={{
            backgroundColor:
              sortOption === option.value
                ? Colors.shop.primary
                : "transparent",
            color: sortOption === option.value ? "#000" : "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            fontSize: "11px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s ease",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}; 