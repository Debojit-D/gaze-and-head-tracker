import React, { useEffect, useRef, useState } from "react";
import "./VoiceFlow.css";
import SpeakerIcon from "../icons/speaker.png";
import BackspaceIcon from "../icons/backspace-32.svg";
import ExitIcon from "../icons/exit.png";
import PlayIcon from "../icons/play.png";
import PauseIcon from "../icons/pause-button.png";
import ClearIcon from "../icons/clean.png";
import popSound from "../sounds/ui-pop-sound-316482.mp3";

export default function VoiceFlow({ onBack, audioEnabled }) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const recognitionRef = useRef(null);
  const isInitializedRef = useRef(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const dwellTimerRef = useRef(null);
  const speechSynthRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const interimTranscriptRef = useRef("");

  const DWELL_TIME = 2000;

  // Initialize speech synthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize audio
  useEffect(() => {
    hoverSoundRef.current = new Audio(popSound);
    hoverSoundRef.current.volume = 0.5;

    return () => {
      if (hoverSoundRef.current) hoverSoundRef.current = null;
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
      setIsPaused(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + " ";
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      if (finalTranscript) {
        setTranscript((prev) => {
          const newText = prev
            ? prev + " " + finalTranscript.trim()
            : finalTranscript.trim();
          return newText;
        });
      }

      interimTranscriptRef.current = interimTranscript;
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "aborted" || event.error === "no-speech") {
        // Don't restart on these errors
        return;
      }
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      // Only set isListening to false if we're not in a paused state
      setIsListening((current) => {
        // If we're currently listening, it means this was an unexpected end
        // In that case, we should mark as not listening
        return false;
      });
    };

    recognitionRef.current = recognition;

    // Auto-start recognition when component mounts
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      setTimeout(() => {
        try {
          recognition.start();
          console.log("Auto-starting speech recognition");
        } catch (e) {
          console.error("Error auto-starting recognition:", e);
        }
      }, 100);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Update cursor fill animation
  useEffect(() => {
    if (hoveredElement) {
      document.body.style.setProperty("--dwell-duration", "0ms");
      document.body.style.setProperty(
        "--cursor-fill",
        "inset(100% 0 0 0 round 50%)"
      );

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.style.setProperty(
            "--dwell-duration",
            `${DWELL_TIME}ms`
          );
          document.body.style.setProperty(
            "--cursor-fill",
            "inset(0 0 0 0 round 50%)"
          );
        });
      });

      // Play pop sound
      if (hoverSoundRef.current && audioEnabled) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.setProperty("--dwell-duration", "0ms");
      document.body.style.setProperty(
        "--cursor-fill",
        "inset(100% 0 0 0 round 50%)"
      );
    }
  }, [hoveredElement]);

  // Hover detection loop
  useEffect(() => {
    const checkHover = () => {
      const { x, y } = mouseRef.current;
      let found = null;

      // Check all control buttons
      const buttons = [
        ".backspace-btn",
        ".speaker-btn",
        ".play-btn",
        ".pause-btn",
        ".clear-btn",
        ".exit-btn",
      ];

      for (const selector of buttons) {
        const btn = document.querySelector(selector);
        if (btn) {
          const rect = btn.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            found = selector.replace(".", "");
            break;
          }
        }
      }

      if (found !== hoveredElement) setHoveredElement(found);
      rafRef.current = requestAnimationFrame(checkHover);
    };

    rafRef.current = requestAnimationFrame(checkHover);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredElement]);

  // Handle backspace
  const handleBackspace = () => {
    const words = transcript.trim().split(" ");
    if (words.length > 0 && words[0] !== "") {
      words.pop();
      setTranscript(words.join(" "));
    } else {
      setTranscript("");
    }
  };

  // Handle speaker
  const handleSpeaker = () => {
    if (transcript.trim() && speechSynthRef.current) {
      speechSynthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthRef.current.speak(utterance);
    }
  };

  // Handle play - start speech recognition
  const handlePlay = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsPaused(false);
        recognitionRef.current.start();
        console.log("Starting speech recognition");
      } catch (e) {
        console.error("Error starting recognition:", e);
      }
    }
  };

  // Handle pause - stop speech recognition temporarily
  const handlePause = () => {
    if (recognitionRef.current && isListening) {
      try {
        // Set states before stopping to prevent race condition
        setIsListening(false);
        setIsPaused(true);
        recognitionRef.current.stop();
        console.log("Pausing speech recognition");
      } catch (e) {
        console.error("Error pausing recognition:", e);
      }
    }
  };

  // Handle clear - clear the transcript
  const handleClear = () => {
    setTranscript("");
  };

  // Handle exit - go back to home
  const handleExit = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    }
    onBack && onBack();
  };

  // Dwell timer for buttons
  useEffect(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }

    if (!hoveredElement) return;

    dwellTimerRef.current = setTimeout(() => {
      if (hoveredElement === "backspace-btn") {
        handleBackspace();
      } else if (hoveredElement === "speaker-btn") {
        handleSpeaker();
      } else if (hoveredElement === "play-btn") {
        handlePlay();
      } else if (hoveredElement === "pause-btn") {
        handlePause();
      } else if (hoveredElement === "clear-btn") {
        handleClear();
      } else if (hoveredElement === "exit-btn") {
        handleExit();
      }
      setHoveredElement(null);
    }, DWELL_TIME);

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
  }, [hoveredElement, transcript, isListening]);

  // Handle 'B' key press to go back to home
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "b" || e.key === "B") {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        onBack && onBack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onBack]);

  return (
    <div className="voice-wrapper">
      <div className="voice-screen">
        <div className="input-display">
          <input
            type="text"
            className="voice-sentence-input"
            placeholder="Your sentence will appear here..."
            value={transcript}
            readOnly
          />
          <button className="speaker-btn" aria-label="Speak sentence">
            <img src={SpeakerIcon} alt="Speaker" />
          </button>
          <button className="backspace-btn" aria-label="Backspace">
            <img src={BackspaceIcon} alt="Backspace" />
          </button>
        </div>

        <div className="listening-content">
          <div className="listening-label">
            {isListening
              ? "Listening..."
              : isPaused
              ? "Paused"
              : "Ready to Listen"}
          </div>
          <div className={`sound-wave ${isListening ? "active" : ""}`}>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
          <div className="kindly-speak">
            {isListening ? "Kindly Speak" : "Use controls below"}
          </div>
        </div>

        <div className="voice-controls">
          {isListening ? (
            <button
              className="pause-btn control-btn"
              aria-label="Pause listening"
            >
              <img src={PauseIcon} alt="Pause" />
              <span>Pause Listening</span>
            </button>
          ) : (
            <button
              className="play-btn control-btn"
              aria-label="Start listening"
            >
              <img src={PlayIcon} alt="Play" />
              <span>Resume Listening</span>
            </button>
          )}
          <button className="clear-btn control-btn" aria-label="Clear text">
            <img src={ClearIcon} alt="Clear" />
            <span>Clear</span>
          </button>
          <button className="exit-btn control-btn" aria-label="Exit to home">
            <img src={ExitIcon} alt="Exit" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
