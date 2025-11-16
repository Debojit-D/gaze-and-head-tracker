import React, { useEffect } from "react";
import "./SwitchControl.css";
import KeyboardWithInputSwitch from "./KeyboardWithInputSwitch";

export default function SwitchControl({ onBack, audioEnabled }) {
  // Handle 'B' key press to go back to home
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "b" || e.key === "B") {
        onBack && onBack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onBack]);

  const handleModalityChange = (modality) => {
    if (modality === "home" || !modality) {
      onBack();
    } else {
      // Navigate to different modality
      onBack(modality);
    }
  };

  return (
    <div className="switch-wrapper">
      <KeyboardWithInputSwitch
        onClose={handleModalityChange}
        audioEnabled={audioEnabled}
      />
    </div>
  );
}
