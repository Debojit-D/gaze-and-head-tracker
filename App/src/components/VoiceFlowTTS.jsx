import React, { useEffect, useRef, useState } from "react";
import "./VoiceFlow.css";
import SpeakerIcon from "../icons/speaker.png";
import BackspaceIcon from "../icons/backspace-32.svg";
import ExitIcon from "../icons/exit.png";
import PlayIcon from "../icons/play.png";
import PauseIcon from "../icons/pause-button.png";
import ClearIcon from "../icons/clean.png";
import popSound from "../sounds/ui-pop-sound-316482.mp3";
import speechToTextService from "../services/speechToTextService";
import textToSpeechService from "../services/textToSpeechService";
import voiceIcon from "../icons/voice-person.png";

export default function VoiceFlow({ onBack, audioEnabled }) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [showModelLoading, setShowModelLoading] = useState(true);
  const [isTTSLoading, setIsTTSLoading] = useState(true);
  const [hoveredElement, setHoveredElement] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isInitializedRef = useRef(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const dwellTimerRef = useRef(null);
  const speechSynthRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const isPausedRef = useRef(false);
  const streamRef = useRef(null);
  const chunkIntervalRef = useRef(null);
  const isProcessingRef = useRef(false);

  const DWELL_TIME = 2000;

  // Initialize speech synthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize speech-to-text and text-to-speech models
  useEffect(() => {
    const initModels = async () => {
      try {
        setIsModelLoading(true);
        setShowModelLoading(true);
        setIsTTSLoading(true);

        console.log("Initializing speech-to-text model...");
        await speechToTextService.initialize();
        console.log("Speech-to-text model ready");

        console.log("Initializing text-to-speech model...");
        await textToSpeechService.initialize();
        console.log("Text-to-speech model ready");

        setIsModelLoading(false);
        setShowModelLoading(false);
        setIsTTSLoading(false);
      } catch (error) {
        console.error("Failed to initialize models:", error);
        setIsModelLoading(false);
        setShowModelLoading(false);
        setIsTTSLoading(false);
      }
    };

    initModels();

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (chunkIntervalRef.current) {
        clearInterval(chunkIntervalRef.current);
      }
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Initialize audio
  useEffect(() => {
    hoverSoundRef.current = new Audio(popSound);
    hoverSoundRef.current.volume = 0.5;

    return () => {
      if (hoverSoundRef.current) hoverSoundRef.current = null;
    };
  }, []);

  // Setup MediaRecorder for audio recording
  const setupMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log("Recording stopped, processing audio...");

        // Only process if we have audio chunks
        if (audioChunksRef.current.length === 0) {
          console.log("No audio chunks to process");
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];

        // Prevent processing if already processing or if paused
        if (isProcessingRef.current || isPausedRef.current) {
          console.log("Skipping processing - already processing or paused");
          return;
        }

        isProcessingRef.current = true;

        try {
          const transcribedText = await speechToTextService.transcribeRecording(
            audioBlob
          );
          console.log("Transcribed:", transcribedText);

          // Filter out [Blank_Audio] and other unwanted markers
          const cleanedText = transcribedText
            ?.replace(/\[Blank_Audio\]/gi, "")
            .replace(/\[.*?\]/g, "") // Remove any other bracketed markers
            .trim();

          if (cleanedText && cleanedText.length > 0) {
            setTranscript((prev) => {
              const newText = prev ? prev + " " + cleanedText : cleanedText;
              return newText;
            });
          }
        } catch (error) {
          console.error("Transcription error:", error);
        } finally {
          isProcessingRef.current = false;
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      return true;
    } catch (error) {
      console.error("Error setting up media recorder:", error);
      return false;
    }
  };

  // Start continuous recording with chunks
  const startContinuousRecording = () => {
    if (!mediaRecorderRef.current || isPausedRef.current) return;

    try {
      // Clear any existing interval
      if (chunkIntervalRef.current) {
        clearInterval(chunkIntervalRef.current);
      }

      // Start recording
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      console.log("Started recording chunk...");

      // Set up interval to create chunks every 5 seconds
      chunkIntervalRef.current = setInterval(() => {
        if (isPausedRef.current || !mediaRecorderRef.current) {
          clearInterval(chunkIntervalRef.current);
          return;
        }

        if (mediaRecorderRef.current.state === "recording") {
          // Stop to trigger processing
          mediaRecorderRef.current.stop();

          // Start a new chunk after a brief delay
          setTimeout(() => {
            if (!isPausedRef.current && mediaRecorderRef.current) {
              audioChunksRef.current = [];
              mediaRecorderRef.current.start();
              console.log("Started new recording chunk...");
            }
          }, 100);
        }
      }, 5000); // Every 5 seconds
    } catch (e) {
      console.error("Error starting recording:", e);
    }
  };

  // Stop continuous recording
  const stopContinuousRecording = () => {
    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

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

      // Play pop sound (skip for play/pause buttons to avoid recording the sound)
      if (
        hoverSoundRef.current &&
        audioEnabled &&
        hoveredElement !== "play-btn" &&
        hoveredElement !== "pause-btn"
      ) {
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
      // Skip hover detection if model loading popup is showing
      if (showModelLoading) {
        rafRef.current = requestAnimationFrame(checkHover);
        return;
      }

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
  }, [hoveredElement, showModelLoading]);

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
  const handleSpeaker = async () => {
    if (!transcript.trim()) return;

    if (isTTSLoading) {
      console.log("Text-to-speech model is still loading...");
      return;
    }

    try {
      console.log("Speaking text:", transcript);
      await textToSpeechService.speak(transcript);
    } catch (error) {
      console.error("Error speaking text:", error);
      // Fallback to browser's speech synthesis
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(transcript);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        speechSynthRef.current.speak(utterance);
      }
    }
  };

  // Handle play - start speech recognition
  const handlePlay = async () => {
    if (isModelLoading) {
      console.log("Model is still loading, please wait...");
      return;
    }

    if (!mediaRecorderRef.current) {
      const success = await setupMediaRecorder();
      if (!success) {
        console.error("Failed to setup media recorder");
        return;
      }
    }

    if (mediaRecorderRef.current && !isListening) {
      isPausedRef.current = false;
      setIsPaused(false);
      setIsListening(true);

      startContinuousRecording();
    }
  };

  // Handle pause - stop speech recognition temporarily
  const handlePause = () => {
    if (mediaRecorderRef.current && isListening) {
      isPausedRef.current = true;
      setIsPaused(true);
      setIsListening(false);

      stopContinuousRecording();
      console.log("Pausing audio recording");
    }
  };

  // Handle clear - clear the transcript
  const handleClear = () => {
    setTranscript("");
  };

  // Handle exit - go back to home
  const handleExit = () => {
    stopContinuousRecording();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
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
        stopContinuousRecording();

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        onBack && onBack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onBack]);

  return (
    <div className="voice-wrapper">
      {/* Model Loading Popup */}
      {showModelLoading && (
        <div className="llm-loading-overlay">
          <div className="llm-loading-popup">
            <div className="llm-loading-icon">
              <img
                src={voiceIcon}
                alt="Voice"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <h2 className="llm-loading-title">Loading Speech Models</h2>
            <div className="llm-loading-spinner"></div>
            <p className="llm-loading-text">
              Initializing
              <br />Speech-to-Text (Xenova/whisper-tiny.en) &
              <br />Text-to-Speech (Xenova/speecht5_tts) ...
            </p>
            <p className="llm-loading-subtext">Wait for around 60 seconds.</p>
          </div>
        </div>
      )}

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
            {isModelLoading
              ? "Loading Model..."
              : isListening
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
            {isModelLoading
              ? "Please wait, downloading model..."
              : isListening
              ? "Kindly Speak"
              : "Use controls below"}
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
