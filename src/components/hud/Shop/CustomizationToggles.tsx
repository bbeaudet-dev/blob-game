import React from "react";


interface CustomizationTogglesProps {
  // Generator visualization
  outerRingsFaster: boolean;
  onOuterRingsFasterChange: (value: boolean) => void;
  equalNumbers: boolean;
  onEqualNumbersChange: (value: boolean) => void;
  
  // Particle settings
  particleDensity: "low" | "medium" | "high";
  onParticleDensityChange: (value: "low" | "medium" | "high") => void;
  particleSpeed: "slow" | "normal" | "fast";
  onParticleSpeedChange: (value: "slow" | "normal" | "fast") => void;
  particleSize: "small" | "normal" | "large";
  onParticleSizeChange: (value: "small" | "normal" | "large") => void;
  
  // Audio settings
  soundEffectsVolume: number;
  onSoundEffectsVolumeChange: (value: number) => void;
  musicVolume: number;
  onMusicVolumeChange: (value: number) => void;
  
  // Cheat mode
  cheatMode: boolean;
  onCheatModeChange: (value: boolean) => void;
}

export const CustomizationToggles: React.FC<CustomizationTogglesProps> = ({
  // Generator visualization
  outerRingsFaster,
  onOuterRingsFasterChange,
  equalNumbers,
  onEqualNumbersChange,
  
  // Particle settings
  particleDensity,
  onParticleDensityChange,
  particleSpeed,
  onParticleSpeedChange,
  particleSize,
  onParticleSizeChange,
  
  // Audio settings
  soundEffectsVolume,
  onSoundEffectsVolumeChange,
  musicVolume,
  onMusicVolumeChange,
  
  // Cheat mode
  cheatMode,
  onCheatModeChange,

}) => {
  const toggleButtonStyle = {
    padding: "3px 6px",
    fontSize: "10px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "normal" as const,
    transition: "all 0.2s ease",
  };

  const activeToggleButtonStyle = {
    ...toggleButtonStyle,
    backgroundColor: "#C0C0C0", // Silver/gray color
    color: "#000", // Dark text for contrast
    fontWeight: "bold" as const,
  };

  const toggleGroupStyle = {
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "6px",
    padding: "2px",
    marginBottom: "6px",
  };

  const sectionStyle = {
    marginBottom: "10px",
  };

  const sectionTitleStyle = {
    fontSize: "11px",
    color: "#C0C0C0", // Silver/gray color
    marginBottom: "4px",
    textAlign: "center" as const,
    fontWeight: "bold" as const,
  };

  const volumeSliderStyle = {
    width: "100%",
    height: "4px",
    borderRadius: "2px",
    background: "rgba(255, 255, 255, 0.2)",
    outline: "none",
    marginTop: "4px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Audio Settings */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>AUDIO</div>
        
        {/* Volume Controls Row */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
          {/* Sound Effects Volume */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "1px" }}>
              SFX: {Math.round(soundEffectsVolume * 100)}%
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={soundEffectsVolume}
              onChange={(e) => onSoundEffectsVolumeChange(parseFloat(e.target.value))}
              style={volumeSliderStyle}
            />
          </div>

          {/* Music Volume */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "1px" }}>
              Music: {Math.round(musicVolume * 100)}%
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={musicVolume}
              onChange={(e) => onMusicVolumeChange(parseFloat(e.target.value))}
              style={volumeSliderStyle}
            />
          </div>
        </div>
      </div>

      {/* Particle Settings */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>PARTICLE EFFECTS</div>
        
        {/* All particle controls in one row */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
          {/* Frequency */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "2px", textAlign: "center" }}>Amount</div>
            <div style={toggleGroupStyle}>
              <button
                onClick={() => onParticleDensityChange("low")}
                style={particleDensity === "low" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                Low
              </button>
              <button
                onClick={() => onParticleDensityChange("medium")}
                style={particleDensity === "medium" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                Med
              </button>
              <button
                onClick={() => onParticleDensityChange("high")}
                style={particleDensity === "high" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                High
              </button>
            </div>
          </div>

          {/* Speed */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "2px", textAlign: "center" }}>Speed</div>
            <div style={toggleGroupStyle}>
              <button
                onClick={() => onParticleSpeedChange("slow")}
                style={particleSpeed === "slow" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                Slow
              </button>
              <button
                onClick={() => onParticleSpeedChange("normal")}
                style={particleSpeed === "normal" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                Norm
              </button>
              <button
                onClick={() => onParticleSpeedChange("fast")}
                style={particleSpeed === "fast" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                Fast
              </button>
            </div>
          </div>

          {/* Size */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "2px", textAlign: "center" }}>Size</div>
            <div style={toggleGroupStyle}>
              <button
                onClick={() => onParticleSizeChange("small")}
                style={particleSize === "small" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                S
              </button>
              <button
                onClick={() => onParticleSizeChange("normal")}
                style={particleSize === "normal" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                M
              </button>
              <button
                onClick={() => onParticleSizeChange("large")}
                style={particleSize === "large" ? activeToggleButtonStyle : toggleButtonStyle}
              >
                L
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generator Visualization */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>GENERATOR VISUALIZATION</div>
        
        {/* All generator controls in one row */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
          {/* Speed Direction */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "2px", textAlign: "center" }}>Speed</div>
            <div style={{...toggleGroupStyle, justifyContent: "space-between"}}>
              <button
                onClick={() => onOuterRingsFasterChange(!outerRingsFaster)}
                style={{...(!outerRingsFaster ? activeToggleButtonStyle : toggleButtonStyle), flex: 1, marginRight: "2px"}}
              >
                Inside
              </button>
              <button
                onClick={() => onOuterRingsFasterChange(!outerRingsFaster)}
                style={{...(outerRingsFaster ? activeToggleButtonStyle : toggleButtonStyle), flex: 1}}
              >
                Outside
              </button>
            </div>
          </div>

          {/* Emoji Distribution */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#fff", marginBottom: "2px", textAlign: "center" }}>Layout</div>
            <div style={{...toggleGroupStyle, justifyContent: "space-between"}}>
              <button
                onClick={() => onEqualNumbersChange(!equalNumbers)}
                style={{...(!equalNumbers ? activeToggleButtonStyle : toggleButtonStyle), flex: 1, marginRight: "2px"}}
              >
                Space
              </button>
              <button
                onClick={() => onEqualNumbersChange(!equalNumbers)}
                style={{...(equalNumbers ? activeToggleButtonStyle : toggleButtonStyle), flex: 1}}
              >
                Count
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cheat Mode */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>⚠️ DANGER ZONE ⚠️</div>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => onCheatModeChange(!cheatMode)}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              backgroundColor: cheatMode ? "#ff4444" : "transparent",
              color: cheatMode ? "#fff" : "#ff4444",
              border: "2px solid #ff4444",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: cheatMode ? "bold" : "normal",
              transition: "all 0.2s ease",
            }}
            title="Toggle cheat mode to unlock a powerful generator"
          >
            {cheatMode ? "💎 CHEATS ON" : "CHEATS OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}; 