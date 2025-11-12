import React, { useEffect, useRef, useState } from "react";
import "./VoiceFlow.css";
import KeyboardWithInput from "./KeyboardWithInput";

export default function VoiceFlow({ onBack }) {
  const [step, setStep] = useState("listening"); // 'listening' | 'keyboard'

  // Auto-transition from listening to keyboard after 5 seconds
  useEffect(() => {
    if (step === "listening") {
      const timer = setTimeout(() => {
        setStep("keyboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

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
    <div className="voice-wrapper">
      {step === "listening" && (
        <div className="listening-screen">
          <div className="listening-card">
            <input
              type="text"
              className="listening-input"
              placeholder="Text Input here..."
              readOnly
            />
            <div className="listening-content">
              <div className="listening-label">Listening...</div>
              <div className="sound-wave">
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
              </div>
              <div className="kindly-speak">Kindly Speak</div>
            </div>
          </div>
        </div>
      )}

      {step === "keyboard" && <KeyboardWithInput onClose={onBack} />}
    </div>
  );
}
