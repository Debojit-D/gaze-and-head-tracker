import React, { useEffect } from "react";
import "./HeadTrackingFlow.css";
import KeyboardWithInput from "./KeyboardWithInput";

export default function HeadTrackingFlow({ onBack, audioEnabled }) {
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

  return (
    <div className="head-wrapper">
      <KeyboardWithInput onClose={onBack} audioEnabled={audioEnabled} />
    </div>
  );
}
