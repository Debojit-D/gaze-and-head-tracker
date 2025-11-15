import React, { useState, useEffect, useRef } from "react";
import Home from "../src/components/Home";
import EyeGazeFlow from "../src/components/EyeGazeFlow";
import VoiceFlow from "../src/components/VoiceFlow";
import HeadTrackingFlow from "../src/components/HeadTrackingFlow";
import SwitchControl from "../src/components/SwitchControl";
import "../src/index.css";
import popSound from "../src/sounds/ui-pop-sound-316482.mp3";

import "./App.css";

function App() {
  const [route, setRoute] = useState("home"); // 'home' | 'eye' | 'voice' | 'head' | 'switch'
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioInitializedRef = useRef(false);

  // Global audio initialization
  useEffect(() => {
    const enableAudio = () => {
      if (!audioInitializedRef.current) {
        const testAudio = new Audio(popSound);
        testAudio.volume = 0.5;
        testAudio
          .play()
          .then(() => {
            testAudio.pause();
            testAudio.currentTime = 0;
            audioInitializedRef.current = true;
            setAudioEnabled(true);
            console.log("Global audio enabled");
          })
          .catch((e) => console.error("Failed to enable audio:", e));
      }
    };

    document.addEventListener("click", enableAudio, { once: true });
    return () => document.removeEventListener("click", enableAudio);
  }, []);

  const handleSelectModality = (id) => {
    setRoute(id);
  };

  if (route === "llm") {
    return (
      <EyeGazeFlow
        onBack={() => setRoute("home")}
        audioEnabled={audioEnabled}
      />
    );
  }

  if (route === "voice") {
    return (
      <VoiceFlow onBack={() => setRoute("home")} audioEnabled={audioEnabled} />
    );
  }

  if (route === "head") {
    return (
      <HeadTrackingFlow
        onBack={() => setRoute("home")}
        audioEnabled={audioEnabled}
      />
    );
  }

  if (route === "switch") {
    return (
      <SwitchControl
        onBack={() => setRoute("home")}
        audioEnabled={audioEnabled}
      />
    );
  }

  return (
    <Home onSelectModality={handleSelectModality} audioEnabled={audioEnabled} />
  );
}

export default App;
