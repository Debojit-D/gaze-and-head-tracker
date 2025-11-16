import React, { useEffect, useRef, useState } from "react";
import "./KeyboardWithInput.css";
import "./Keyboard.css";
import BackspaceIcon from "../icons/backspace-32.svg";
import SpeakerIcon from "../icons/speaker.png";
import popSound from "../sounds/ui-pop-sound-316482.mp3";
import llmTextGenerator from "../services/llmTextGenerator";

// Import all keyboard icons
import SettingsIcon from "../icons/settings.png";
import AIIcon from "../icons/ai-assistant.png";
import ClearIcon from "../icons/clean.png";
import MySelfIcon from "../icons/my.png";
import ExitIcon from "../icons/exit.png";
import ClockIcon from "../icons/clock.png";
import HomeIcon from "../icons/home.png";
import EatIcon from "../icons/binge-eating.png";
import LikeIcon from "../icons/like.png";
import RainbowIcon from "../icons/rainbow_10129397.png";
import DrinkIcon from "../icons/cocktail.png";
import PlayIcon from "../icons/rc-car.png";
import StopIcon from "../icons/stop_5181609.png";
import CancelIcon from "../icons/cancel_1721955.png";
import SmileIcon from "../icons/smile_9350598.png";
import CheckIcon from "../icons/check-mark_5299048.png";
import VideoIcon from "../icons/video.png";
import BicycleIcon from "../icons/bicycle.png";
import GameIcon from "../icons/game-console.png";
import PuzzleIcon from "../icons/jigsaw.png";
import BoardGameIcon from "../icons/board-game.png";
import CrayonsIcon from "../icons/crayons.png";
import LegosIcon from "../icons/construction.png";
import SportsIcon from "../icons/sports.png";
import BallIcon from "../icons/beach-ball.png";
import CarsIcon from "../icons/rc-car.png";
import SwingIcon from "../icons/swing.png";
import HurtIcon from "../icons/hurt.png";
import NeedIcon from "../icons/need.png";
import BuyIcon from "../icons/cash.png";
import LoveIcon from "../icons/love.png";
import ToCallIcon from "../icons/phone-call.png";
import ListenIcon from "../icons/listen.png";
import ChangeIcon from "../icons/change.png";
import MicIcon from "../icons/voice-recognition.png";
import HeadIcon from "../icons/face-id.png";
import ButtonIcon from "../icons/button.png";

const BACKSPACE_DWELL_TIME = 2000; // 2 seconds for backspace

const ALL_KEYBOARD_KEYS = {
  default: [
    { id: "i", label: "i", type: "pronoun", color: "#fff4d6" },
    {
      id: "bicycle",
      label: "bicycle",
      icon: BicycleIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "videogame",
      label: "video game",
      icon: GameIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "sports",
      label: "sports",
      icon: SportsIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "time",
      label: "TIME",
      icon: ClockIcon,
      type: "category",
      color: "#ffd699",
    },
    {
      id: "exit",
      label: "EXIT",
      icon: ExitIcon,
      type: "action",
      color: "#ffccbc",
    },
    {
      id: "my",
      label: "my",
      icon: MySelfIcon,
      type: "pronoun",
      color: "#fff4d6",
    },
    { id: "can", label: "can", type: "verb", color: "#f5f5f5" },
    { id: "to", label: "to", type: "preposition", color: "#f5f5f5" },
    { id: "eat", label: "eat", icon: EatIcon, type: "verb", color: "#c8e6c9" },
    {
      id: "good",
      label: "good",
      icon: LikeIcon,
      type: "adjective",
      color: "#e1bee7",
    },
    {
      id: "switchmodality",
      label: "SWITCH",
      icon: ChangeIcon,
      type: "action",
      color: "#b3e5fc",
    },
    { id: "you", label: "you", type: "pronoun", color: "#fff4d6" },
    { id: "do", label: "do", type: "verb", color: "#f5f5f5" },
    {
      id: "drink",
      label: "drink",
      icon: DrinkIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "play",
      label: "play",
      icon: PlayIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "stop",
      label: "stop",
      icon: StopIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "settings",
      label: "SETTINGS",
      icon: SettingsIcon,
      type: "category",
      color: "#f3f0e3",
    },
    { id: "it", label: "it", type: "pronoun", color: "#fff4d6" },
    {
      id: "dont",
      label: "don't",
      icon: CancelIcon,
      type: "verb",
      color: "#ffcdd2",
    },
    {
      id: "like",
      label: "like",
      icon: SmileIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "yes",
      label: "yes",
      icon: CheckIcon,
      type: "response",
      color: "#c8e6c9",
    },
    {
      id: "watch",
      label: "watch",
      icon: VideoIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "clear",
      label: "clear",
      icon: ClearIcon,
      type: "action",
      color: "#f5f5f5",
    },
    { id: "would", label: "would", type: "verb", color: "#f5f5f5" },
    { id: "am", label: "am", type: "verb", color: "#f5f5f5" },
    { id: "have", label: "have", type: "verb", color: "#f5f5f5" },
    { id: "got", label: "got", type: "verb", color: "#f5f5f5" },
    { id: "buy", label: "buy", icon: BuyIcon, type: "verb", color: "#c8e6c9" },
    {
      id: "home",
      label: "HOME",
      icon: HomeIcon,
      type: "action",
      color: "#ffccbc",
    },
    { id: "could", label: "could", type: "verb", color: "#f5f5f5" },
    { id: "m", label: "'m", type: "verb", color: "#f5f5f5" },
    {
      id: "hurt",
      label: "hurt",
      icon: HurtIcon,
      type: "verb",
      color: "#ffcdd2",
    },
    {
      id: "need",
      label: "need",
      icon: NeedIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    { id: "will", label: "will", type: "verb", color: "#f5f5f5" },
    { id: "was", label: "was", type: "verb", color: "#f5f5f5" },
    {
      id: "love",
      label: "love",
      icon: LoveIcon,
      type: "verb",
      color: "#ffb3ba",
    },
    { id: "todo", label: "to do", type: "verb", color: "#f5f5f5" },
    { id: "tohave", label: "to have", type: "verb", color: "#f5f5f5" },
    {
      id: "toeat",
      label: "to eat",
      icon: EatIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "tocall",
      label: "to call",
      icon: ToCallIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    { id: "ed", label: "-ed", type: "suffix", color: "#f5f5f5" },
    {
      id: "todrink",
      label: "to drink",
      icon: DrinkIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "toplay",
      label: "to play",
      icon: PlayIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "tostop",
      label: "to stop",
      icon: StopIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    { id: "s", label: "-s", type: "suffix", color: "#f5f5f5" },
    {
      id: "tolike",
      label: "to like",
      icon: SmileIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "tolisten",
      label: "to listen",
      icon: ListenIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "towatch",
      label: "to watch",
      icon: VideoIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    { id: "a", label: "a", type: "article", color: "#f5f5f5" },
    { id: "and", label: "and", type: "conjunction", color: "#f5f5f5" },
    {
      id: "puzzle",
      label: "puzzle",
      icon: PuzzleIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "boardgame",
      label: "board game",
      icon: BoardGameIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "colors",
      label: "colors",
      icon: RainbowIcon,
      type: "category",
      color: "#e1bee7",
    },
    {
      id: "me",
      label: "me",
      icon: MySelfIcon,
      type: "pronoun",
      color: "#fff4d6",
    },
    { id: "ing", label: "-ing", type: "suffix", color: "#f5f5f5" },
    {
      id: "crayons",
      label: "crayons",
      icon: CrayonsIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "legos",
      label: "legos",
      icon: LegosIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "ball",
      label: "ball",
      icon: BallIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "cars",
      label: "cars",
      icon: CarsIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "swing",
      label: "swing",
      icon: SwingIcon,
      type: "noun",
      color: "#c8e6c9",
    },
  ],
};

// Define different keyboard layouts
const KEYBOARD_LAYOUTS = {
  default: [
    { id: "i", label: "i", type: "pronoun", color: "#fff4d6" },
    {
      id: "bicycle",
      label: "bicycle",
      icon: BicycleIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "videogame",
      label: "video game",
      icon: GameIcon,
      type: "noun",
      color: "#c8e6c9",
    },
    {
      id: "sports",
      label: "sports",
      icon: SportsIcon,
      type: "noun",
      color: "#c8e6c9",
    },

    {
      id: "time",
      label: "TIME",
      icon: ClockIcon,
      type: "category",
      color: "#ffd699",
    },
    {
      id: "exit",
      label: "EXIT",
      icon: ExitIcon,
      type: "action",
      color: "#ffccbc",
    },
    {
      id: "my",
      label: "my",
      icon: MySelfIcon,
      type: "pronoun",
      color: "#fff4d6",
    },
    { id: "can", label: "can", type: "verb", color: "#f5f5f5" },
    { id: "to", label: "to", type: "preposition", color: "#f5f5f5" },
    { id: "eat", label: "eat", icon: EatIcon, type: "verb", color: "#c8e6c9" },
    {
      id: "good",
      label: "good",
      icon: LikeIcon,
      type: "adjective",
      color: "#e1bee7",
    },
    {
      id: "switchmodality",
      label: "SWITCH",
      icon: ChangeIcon,
      type: "action",
      color: "#b3e5fc",
    },
    { id: "you", label: "you", type: "pronoun", color: "#fff4d6" },
    { id: "do", label: "do", type: "verb", color: "#f5f5f5" },
    {
      id: "drink",
      label: "drink",
      icon: DrinkIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "play",
      label: "play",
      icon: PlayIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "stop",
      label: "stop",
      icon: StopIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "settings",
      label: "SETTINGS",
      icon: SettingsIcon,
      type: "category",
      color: "#f3f0e3",
    },
    { id: "it", label: "it", type: "pronoun", color: "#fff4d6" },
    {
      id: "dont",
      label: "don't",
      icon: CancelIcon,
      type: "verb",
      color: "#ffcdd2",
    },
    {
      id: "like",
      label: "like",
      icon: SmileIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "yes",
      label: "yes",
      icon: CheckIcon,
      type: "response",
      color: "#c8e6c9",
    },
    {
      id: "watch",
      label: "watch",
      icon: VideoIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "clear",
      label: "clear",
      icon: ClearIcon,
      type: "action",
      color: "#f5f5f5",
    },
  ],
  afterI: [
    { id: "would", label: "would", type: "verb", color: "#f5f5f5" },
    { id: "am", label: "am", type: "verb", color: "#f5f5f5" },
    { id: "have", label: "have", type: "verb", color: "#f5f5f5" },
    { id: "got", label: "got", type: "verb", color: "#f5f5f5" },
    { id: "buy", label: "buy", icon: BuyIcon, type: "verb", color: "#c8e6c9" },
    {
      id: "home",
      label: "HOME",
      icon: HomeIcon,
      type: "action",
      color: "#ffccbc",
    },
    { id: "could", label: "could", type: "verb", color: "#f5f5f5" },
    { id: "can", label: "can", type: "verb", color: "#f5f5f5" },
    { id: "m", label: "'m", type: "verb", color: "#f5f5f5" },
    { id: "eat", label: "eat", icon: EatIcon, type: "verb", color: "#c8e6c9" },
    {
      id: "hurt",
      label: "hurt",
      icon: HurtIcon,
      type: "verb",
      color: "#ffcdd2",
    },
    {
      id: "switchmodality",
      label: "SWITCH",
      icon: ChangeIcon,
      type: "action",
      color: "#b3e5fc",
    },
    { id: "will", label: "will", type: "verb", color: "#f5f5f5" },
    { id: "do", label: "do", type: "verb", color: "#f5f5f5" },
    {
      id: "drink",
      label: "drink",
      icon: DrinkIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "play",
      label: "play",
      icon: PlayIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "stop",
      label: "stop",
      icon: StopIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "settings",
      label: "SETTINGS",
      icon: SettingsIcon,
      type: "category",
      color: "#f3f0e3",
    },
    { id: "was", label: "was", type: "verb", color: "#f5f5f5" },
    {
      id: "dont",
      label: "don't",
      icon: CancelIcon,
      type: "verb",
      color: "#ffcdd2",
    },
    {
      id: "like",
      label: "like",
      icon: SmileIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "love",
      label: "love",
      icon: LoveIcon,
      type: "verb",
      color: "#ffb3ba",
    },
    {
      id: "watch",
      label: "watch",
      icon: VideoIcon,
      type: "verb",
      color: "#c8e6c9",
    },
    {
      id: "clear",
      label: "clear",
      icon: ClearIcon,
      type: "action",
      color: "#f5f5f5",
    },
  ],
};

export default function KeyboardWithInputLLM({ onClose, audioEnabled }) {
  const [sentence, setSentence] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);
  const [currentLayout, setCurrentLayout] = useState("default");
  const [currentKeys, setCurrentKeys] = useState(KEYBOARD_LAYOUTS.default);
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showLLMLoading, setShowLLMLoading] = useState(false);
  const [showModalityPopup, setShowModalityPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    time: "",
    day: "",
    date: "",
  });
  const [dwellTime, setDwellTime] = useState(2500); // milliseconds (2.5 seconds default)
  const [llmReady, setLlmReady] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const dwellTimerRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const speechSynthRef = useRef(null);
  const llmInitializedRef = useRef(false);
  const inputRef = useRef(null);

  // Auto-scroll input to show the rightmost content when sentence changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [sentence]);

  // Initialize speech synthesis and LLM
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis;
      console.log("Text-to-speech initialized");
    } else {
      console.warn("Text-to-speech not supported in this browser");
    }

    // Initialize LLM pipeline
    if (!llmInitializedRef.current) {
      llmInitializedRef.current = true;
      console.log("Starting LLM initialization...");
      setShowLLMLoading(true);
      llmTextGenerator
        .initialize()
        .then(() => {
          setLlmReady(true);
          setShowLLMLoading(false);
          console.log("LLM is ready for predictions");
        })
        .catch((error) => {
          console.error("Failed to initialize LLM:", error);
          setLlmReady(false);
          setShowLLMLoading(false);
        });
    }

    return () => {
      // Cleanup on unmount
      if (llmTextGenerator.isReady) {
        llmTextGenerator
          .dispose()
          .catch((err) => console.error("Error disposing LLM:", err));
      }
    };
  }, []);

  // Handle 'C' key press to open modality popup
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "c" || e.key === "C") {
        setShowModalityPopup(true);
      }
      if (e.key === "v" || e.key === "V") {
        setShowModalityPopup(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Function to speak text
  const speakText = (text) => {
    if (!speechSynthRef.current) return;

    // Cancel any ongoing speech
    speechSynthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Optional: Set a specific voice (e.g., female voice)
    const voices = speechSynthRef.current.getVoices();
    if (voices.length > 0) {
      // Try to find a preferred voice, or use default
      const preferredVoice = voices.find((voice) =>
        voice.lang.startsWith("en")
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    speechSynthRef.current.speak(utterance);
    console.log("Speaking:", text);
  };

  // Initialize audio
  useEffect(() => {
    hoverSoundRef.current = new Audio(popSound);
    hoverSoundRef.current.volume = 0.5;

    return () => {
      if (hoverSoundRef.current) hoverSoundRef.current = null;
    };
  }, []);

  // Track mouse position and update CSS custom properties for cursor
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Update CSS custom properties for the blue cursor position
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Update cursor fill animation and play hover sound
  useEffect(() => {
    if (hoveredElement) {
      const duration =
        hoveredElement === "backspace-btn" || hoveredElement === "speaker-btn"
          ? BACKSPACE_DWELL_TIME
          : dwellTime;

      // Update the existing cursor fill animation using CSS custom properties
      document.body.style.setProperty("--dwell-duration", "0s");
      document.body.style.setProperty(
        "--cursor-fill",
        "inset(100% 0 0 0 round 50%)"
      );

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.style.setProperty("--dwell-duration", `${duration}ms`);
          document.body.style.setProperty(
            "--cursor-fill",
            "inset(0 0 0 0 round 50%)"
          );
        });
      });

      if (hoverSoundRef.current) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch(() => {});
      }
    } else {
      // Reset fill when not hovering
      document.body.style.setProperty("--dwell-duration", "0s");
      document.body.style.setProperty(
        "--cursor-fill",
        "inset(100% 0 0 0 round 50%)"
      );
    }
  }, [hoveredElement, audioEnabled, dwellTime]);

  // Hover detection loop
  useEffect(() => {
    const checkHover = () => {
      // Skip hover detection if certain popups are showing (but not modality popup)
      if (showTimePopup || showSettingsPopup || showLLMLoading) {
        rafRef.current = requestAnimationFrame(checkHover);
        return;
      }

      const { x, y } = mouseRef.current;
      let found = null;

      // Check modality buttons if popup is showing
      if (showModalityPopup) {
        const modalityBtns = document.querySelectorAll("[data-modality-btn]");
        modalityBtns.forEach((btn) => {
          const rect = btn.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            found = "modality-" + btn.getAttribute("data-modality-btn");
          }
        });

        if (found !== hoveredElement) setHoveredElement(found);
        rafRef.current = requestAnimationFrame(checkHover);
        return;
      }

      const keys = document.querySelectorAll(".keyboard-key");
      keys.forEach((keyEl) => {
        const rect = keyEl.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          found = keyEl.getAttribute("data-key-id");
        }
      });

      if (!found) {
        const backspaceBtn = document.querySelector(".backspace-btn");
        if (backspaceBtn) {
          const rect = backspaceBtn.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            found = "backspace-btn";
          }
        }
      }

      if (!found) {
        const speakerBtn = document.querySelector(".speaker-btn");
        if (speakerBtn) {
          const rect = speakerBtn.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            found = "speaker-btn";
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
  }, [
    hoveredElement,
    showTimePopup,
    showSettingsPopup,
    showLLMLoading,
    showModalityPopup,
  ]);

  // Handle backspace
  const handleBackspace = () => {
    speakText("backspace");
    const words = sentence.trim().split(" ");
    if (words.length > 0 && words[0] !== "") {
      words.pop();
      setSentence(words.join(" "));
    } else {
      setSentence("");
    }
  };

  // Handle speaker - speak the entire sentence
  const handleSpeaker = () => {
    if (sentence.trim()) {
      speakText(sentence);
    }
  };

  // Determine next layout based on sentence
  const getNextLayout = (updatedSentence) => {
    const words = updatedSentence.trim().toLowerCase().split(" ");
    const lastThreeWords = words.slice(-3).join(" ");
    const lastTwoWords = words.slice(-2).join(" ");
    const lastWord = words[words.length - 1];

    if (lastThreeWords === "i like to play" || lastTwoWords === "to play")
      return "afterILikeToPlay";
    if (lastTwoWords === "i like" || lastTwoWords === "i love")
      return "afterILike";
    if (lastWord === "i") return "afterI";
    return "default";
  };

  // Reserved keys that should always be present
  const RESERVED_KEYS = ["time", "exit", "settings", "home", "clear", "switchmodality"];

  // Get important keys from default layout
  const getReservedKeys = () => {
    return KEYBOARD_LAYOUTS.default.filter((key) =>
      RESERVED_KEYS.includes(key.id)
    );
  };

  // Update keyboard with LLM or pattern-based
  const updateKeyboardWithLLM = async (updatedSentence) => {
    // Always use LLM when ready, otherwise fallback to pattern-based
    if (llmReady && !isGeneratingSuggestions) {
      try {
        setIsGeneratingSuggestions(true);
        console.log("Generating LLM suggestions for:", updatedSentence);

        const suggestions = await llmTextGenerator.getMultipleSuggestions(
          updatedSentence,
          15
        );
        console.log("Got LLM suggestions:", suggestions);

        // Build keyboard layout: 24 keys total (4 rows × 6 columns)
        const llmLayout = [];
        const reservedKeys = getReservedKeys();

        // Get first row from default layout (positions 0-5)
        const firstRow = KEYBOARD_LAYOUTS.default.slice(0, 6);

        // Determine which layout to sample vocab from
        const words = updatedSentence.trim().toLowerCase().split(" ");
        const lastWord = words[words.length - 1];
        const vocabSource =
          lastWord === "i" ? "afterI" : ALL_KEYBOARD_KEYS.default;

        // Get all available vocab from appropriate layout (excluding reserved keys and first row)
        const availableVocab = (
          lastWord === "i" ? KEYBOARD_LAYOUTS.afterI : vocabSource
        ).filter(
          (key) =>
            !RESERVED_KEYS.includes(key.id) &&
            !firstRow.some((fk) => fk.id === key.id)
        );

        // Shuffle vocab for variety
        const shuffledVocab = [...availableVocab].sort(
          () => Math.random() - 0.5
        );

        let vocabIndex = 0;
        let suggestionIndex = 0;

        // Fill all 24 positions
        for (let i = 0; i < 24; i++) {
          // First row (positions 0-5): keep same as default
          if (i < 6) {
            llmLayout.push(firstRow[i]);
          }
          // Position 11 (row 2, col 6): SWITCH
          else if (i === 11) {
            llmLayout.push(reservedKeys.find((k) => k.id === "switchmodality"));
          }
          // Position 17 (row 3, col 6): SETTINGS
          else if (i === 17) {
            llmLayout.push(reservedKeys.find((k) => k.id === "settings"));
          }
          // Position 23 (row 4, col 6): CLEAR
          else if (i === 23) {
            llmLayout.push(reservedKeys.find((k) => k.id === "clear"));
          }
          // Fill with LLM suggestions (blue keys)
          else if (suggestionIndex < suggestions.length) {
            llmLayout.push({
              id: `llm_${suggestionIndex}`,
              label: suggestions[suggestionIndex],
              type: "suggestion",
              color: "#e3f2fd",
            });
            suggestionIndex++;
          }
          // Fill remaining with vocab words
          else if (vocabIndex < shuffledVocab.length) {
            llmLayout.push(shuffledVocab[vocabIndex]);
            vocabIndex++;
          }
          // Fallback to empty (should rarely happen)
          else {
            llmLayout.push({
              id: `empty_${i}`,
              label: "",
              type: "empty",
              color: "#f5f5f5",
            });
          }
        }

        setCurrentKeys(llmLayout);
        setCurrentLayout("llm");
        setIsGeneratingSuggestions(false);
        return;
      } catch (error) {
        console.error("Error getting LLM suggestions:", error);
      } finally {
        setIsGeneratingSuggestions(false);
      }
    }

    // Fallback to pattern-based layout
    const nextLayout = getNextLayout(updatedSentence);
    setCurrentLayout(nextLayout);
    setCurrentKeys(KEYBOARD_LAYOUTS[nextLayout]);
  };

  // Handle settings popup
  const handleSettingsPopup = () => {
    if (showSettingsPopup) {
      setShowSettingsPopup(false);
      // Clear any hovered element to prevent instant triggering
      setHoveredElement(null);
      console.log("Settings popup closed");
    } else {
      setShowSettingsPopup(true);
      // Clear any hovered element when opening settings
      setHoveredElement(null);
      console.log("Settings popup opened");

      // Optionally speak
      if (audioEnabled) {
        speakText("Settings");
      }
    }
  };

  // Handle time popup
  const handleTimePopup = () => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const day = days[now.getDay()];
    const date = `${
      months[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;

    setCurrentTime({ time, day, date });
    setShowTimePopup(true);

    // Speak after a small delay
    setTimeout(() => {
      speakText(`${day}, ${date}, ${time}`);
    }, 100);

    // Auto-hide after 12 seconds
    setTimeout(() => {
      setShowTimePopup(false);
    }, 12000);
  };

  // Execute key action
  const executeKeyAction = async (keyId) => {
    console.log("executeKeyAction called for:", keyId);
    const key = currentKeys.find((k) => k.id === keyId);
    if (!key) {
      console.log("Key not found:", keyId);
      setHoveredElement(null);
      return;
    }

    console.log("Executing action for key:", key.label);

    if (key.id === "clear") {
      speakText("clear");
      setSentence("");
      setCurrentLayout("default");
      setCurrentKeys(KEYBOARD_LAYOUTS.default);
    } else if (key.id === "home") {
      speakText("home");
      setCurrentLayout("default");
      setCurrentKeys(KEYBOARD_LAYOUTS.default);
    } else if (key.id === "time") {
      handleTimePopup();
    } else if (key.id === "exit") {
      speakText("exit");
      if (onClose) onClose();
    } else if (key.id === "settings") {
      handleSettingsPopup();
    } else if (key.id === "switchmodality") {
      setShowModalityPopup(true);
      speakText("Switch Modality");
    } else if (key.type === "category" && KEYBOARD_LAYOUTS[key.id]) {
      speakText(key.label);
      setCurrentLayout(key.id);
      setCurrentKeys(KEYBOARD_LAYOUTS[key.id]);
    } else {
      // Speak the word before adding it to sentence
      speakText(key.label);

      const newSentence = sentence ? `${sentence} ${key.label}` : key.label;
      console.log("Setting new sentence:", newSentence);
      setSentence(newSentence);
      await updateKeyboardWithLLM(newSentence);
    }

    setHoveredElement(null);
  };

  // Dwell timer for ALL elements
  useEffect(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }

    // Don't start dwell timer if settings popup or other popups are open
    if (showTimePopup || showSettingsPopup || showLLMLoading) {
      return;
    }

    if (!hoveredElement) return;

    console.log("Starting dwell timer for:", hoveredElement);

    const dwellDuration =
      hoveredElement === "backspace-btn" || hoveredElement === "speaker-btn"
        ? BACKSPACE_DWELL_TIME
        : dwellTime;

    dwellTimerRef.current = setTimeout(() => {
      console.log("Dwell completed for:", hoveredElement);

      if (hoveredElement === "backspace-btn") {
        handleBackspace();
        setHoveredElement(null);
      } else if (hoveredElement === "speaker-btn") {
        handleSpeaker();
        setHoveredElement(null);
      } else if (hoveredElement && hoveredElement.startsWith("modality-")) {
        const modality = hoveredElement.replace("modality-", "");
        if (modality === "dismiss") {
          speakText("Dismissed");
          setShowModalityPopup(false);
        } else if (modality === "voice") {
          speakText("Switching to Voice Recognition");
          setTimeout(() => onClose("voice"), 500);
        } else if (modality === "head") {
          speakText("Switching to Head Tracking");
          setTimeout(() => onClose("head"), 500);
        } else if (modality === "switch") {
          speakText("Switching to Switch Control");
          setTimeout(() => onClose("switch"), 500);
        }
        setHoveredElement(null);
      } else {
        executeKeyAction(hoveredElement);
      }
    }, dwellDuration);

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
  }, [
    hoveredElement,
    sentence,
    currentKeys,
    dwellTime,
    showTimePopup,
    showSettingsPopup,
    showLLMLoading,
  ]);

  return (
    <div className="keyboard-with-input-screen keyboard-with-input-switch-screen">
      {/* Time Popup Overlay */}
      {showTimePopup && (
        <div className="time-popup-overlay">
          <div className="time-popup">
            <div className="time-popup-time">{currentTime.time}</div>
            <div className="time-popup-day">{currentTime.day}</div>
            <div className="time-popup-date">{currentTime.date}</div>
          </div>
        </div>
      )}

      {/* LLM Loading Popup */}
      {showLLMLoading && (
        <div className="llm-loading-overlay">
          <div className="llm-loading-popup">
            <div className="llm-loading-icon">
              <img
                src={AIIcon}
                alt="AI"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <h2 className="llm-loading-title">Loading Model</h2>
            <div className="llm-loading-spinner"></div>
            <p className="llm-loading-text">
              Initializing Xenova/distilgpt2...
            </p>
            <p className="llm-loading-subtext">Wait for around 30 seconds</p>
          </div>
        </div>
      )}

      {/* Settings Popup Overlay */}
      {showSettingsPopup && (
        <div
          className="settings-popup-overlay"
          onClick={(e) => {
            if (e.target.className === "settings-popup-overlay") {
              handleSettingsPopup();
            }
          }}
        >
          <div className="settings-popup">
            <div className="settings-popup-header">
              <h2>Mouse Settings</h2>
              <button
                className="settings-close-btn"
                onClick={handleSettingsPopup}
                aria-label="Close settings"
              >
                x
              </button>
            </div>

            <div className="settings-content">
              {/* Dwell Time */}
              <div className="setting-control">
                <label className="setting-label">
                  <span className="setting-name">Dwell Time</span>
                  <span className="setting-value">
                    {dwellTime ? (dwellTime / 1000).toFixed(1) : "2.5"}s
                  </span>
                </label>
                <div className="slider-container">
                  <span className="slider-min">2s</span>
                  <input
                    type="range"
                    min="2000"
                    max="8000"
                    step="500"
                    value={dwellTime || 2500}
                    onChange={(e) => setDwellTime(parseInt(e.target.value, 10))}
                    className="setting-slider"
                  />
                  <span className="slider-max">8s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modality Switch Popup */}
      {showModalityPopup && (
        <div
          className="settings-popup-overlay"
          style={{ cursor: "none" }}
          onClick={(e) => {
            if (e.target.className === "settings-popup-overlay") {
              setShowModalityPopup(false);
            }
          }}
        >
          <div className="settings-popup" style={{ cursor: "none" }}>
            <div className="settings-popup-header">
              <h2>Switch Input Modality</h2>
            </div>

            <div
              className="settings-content"
              style={{
                gap: "1.5rem",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                cursor: "none",
              }}
            >
              <button
                className="modality-option-btn"
                data-modality-btn="voice"
                style={{
                  transform:
                    hoveredElement === "modality-voice"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <div className="modality-option-btn-title">
                  Voice Recognition
                </div>
                <div className="modality-option-btn-icon">
                  <img src={MicIcon} alt="Voice" />
                </div>
              </button>

              <button
                className="modality-option-btn"
                data-modality-btn="head"
                style={{
                  transform:
                    hoveredElement === "modality-head"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <div className="modality-option-btn-title">Head Tracking</div>
                <div className="modality-option-btn-icon">
                  <img src={HeadIcon} alt="Head" />
                </div>
              </button>

              <button
                className="modality-option-btn"
                data-modality-btn="switch"
                style={{
                  transform:
                    hoveredElement === "modality-switch"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <div className="modality-option-btn-title">Switch Control</div>
                <div className="modality-option-btn-icon">
                  <img src={ButtonIcon} alt="Switch" />
                </div>
              </button>

              <button
                className="modality-option-btn"
                data-modality-btn="dismiss"
                style={{
                  transform:
                    hoveredElement === "modality-dismiss"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <div className="modality-option-btn-title">Dismiss</div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="input-display">
        <input
          ref={inputRef}
          type="text"
          className="keyboard-sentence-input"
          placeholder="Your sentence will appear here..."
          value={sentence}
          readOnly
        />
        <button className="speaker-btn" aria-label="Speak sentence">
          <img src={SpeakerIcon} alt="Speaker" />
        </button>
        <button className="backspace-btn" aria-label="Backspace">
          <img src={BackspaceIcon} alt="Backspace" />
        </button>
      </div>

      <div className="keyboard-container">
        <div className="keyboard-header">CS435 HCI Vocab</div>
        <div className="keyboard-grid">
          {currentKeys.map((key, keyIndex) => (
            <button
              key={key.id}
              data-key-id={key.id}
              className={`keyboard-key ${key.type} ${
                hoveredElement === key.id ? "hovered" : ""
              } ${key.type === "empty" ? "disabled" : ""}`}
              style={{ backgroundColor: key.color }}
              aria-label={key.label}
              disabled={key.type === "empty"}
            >
              {key.icon && (
                <img src={key.icon} alt={key.label} className="key-icon" />
              )}
              <span className="key-label">{key.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
