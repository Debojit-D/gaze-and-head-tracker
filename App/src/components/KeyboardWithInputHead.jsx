import React, { useEffect, useRef, useState } from "react";
import "./KeyboardWithInput.css";
import "./KeyboardWithInputHead.css";
import "./Keyboard.css";
import BackspaceIcon from "../icons/backspace-32.svg";
import SpeakerIcon from "../icons/speaker.png";
import popSound from "../sounds/ui-pop-sound-316482.mp3";

// Import all keyboard icons
import SettingsIcon from "../icons/settings.png";
import ClearIcon from "../icons/clean.png";
import MySelfIcon from "../icons/my.png";
import ExitIcon from "../icons/exit.png";
import ClockIcon from "../icons/clock.png";
import HomeIcon from "../icons/home.png";
import EatIcon from "../icons/binge-eating.png";
import LikeIcon from "../icons/like.png";
import RainbowIcon from "../icons/rainbow_10129397.png";
import SadIcon from "../icons/sad.png";
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
import EyeIcon from "../icons/eye-care.png";
import MicIcon from "../icons/voice-recognition.png";
import HeadIcon from "../icons/face-id.png";
import ButtonIcon from "../icons/button.png";
import AiIcon from "../icons/ai.png";

const BACKSPACE_DWELL_TIME = 2000; // 2 seconds for backspace

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
  afterILike: [
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
      id: "home",
      label: "HOME",
      icon: HomeIcon,
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
    {
      id: "sad",
      label: "sad",
      icon: SadIcon,
      type: "adjective",
      color: "#e1bee7",
    },
    { id: "you", label: "you", type: "pronoun", color: "#fff4d6" },
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
    {
      id: "settings",
      label: "SETTINGS",
      icon: SettingsIcon,
      type: "category",
      color: "#f3f0e3",
    },
    { id: "it", label: "it", type: "pronoun", color: "#fff4d6" },
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
    {
      id: "clear",
      label: "clear",
      icon: ClearIcon,
      type: "action",
      color: "#f5f5f5",
    },
  ],
  vocab: [
    { id: "i", label: "i", type: "pronoun", color: "#fff4d6" },
    { id: "to", label: "to", type: "preposition", color: "#f5f5f5" },
    { id: "a", label: "a", type: "article", color: "#f5f5f5" },
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
      id: "home",
      label: "HOME",
      icon: HomeIcon,
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
    { id: "ed", label: "-ed", type: "suffix", color: "#f5f5f5" },
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
      id: "sports",
      label: "sports",
      icon: SportsIcon,
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
    { id: "you", label: "you", type: "pronoun", color: "#fff4d6" },
    { id: "s", label: "-s", type: "suffix", color: "#f5f5f5" },
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
  afterILikeToPlay: [
    { id: "i", label: "i", type: "pronoun", color: "#fff4d6" },
    { id: "to", label: "to", type: "preposition", color: "#f5f5f5" },
    { id: "a", label: "a", type: "article", color: "#f5f5f5" },
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
      id: "home",
      label: "HOME",
      icon: HomeIcon,
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
    { id: "ed", label: "-ed", type: "suffix", color: "#f5f5f5" },
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
      id: "sports",
      label: "sports",
      icon: SportsIcon,
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
    { id: "you", label: "you", type: "pronoun", color: "#fff4d6" },
    { id: "s", label: "-s", type: "suffix", color: "#f5f5f5" },
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

export default function KeyboardWithInput({
  onClose,
  getLLMSuggestions,
  audioEnabled,
}) {
  const [sentence, setSentence] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);
  const [currentLayout, setCurrentLayout] = useState("default");
  const [currentKeys, setCurrentKeys] = useState(KEYBOARD_LAYOUTS.default);
  const [trackyMouseEnabled, setTrackyMouseEnabled] = useState(false);
  const [trackyMouseReady, setTrackyMouseReady] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showSetupCompletePopup, setShowSetupCompletePopup] = useState(false);
  const [showModalityPopup, setShowModalityPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    time: "",
    day: "",
    date: "",
  });
  const [trackySettings, setTrackySettings] = useState({
    horizontalSensitivity: 25,
    verticalSensitivity: 50,
    acceleration: 50,
    dwellTime: 3000, // milliseconds (3.0 seconds default)
  });

  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const dwellTimerRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const speechSynthRef = useRef(null);
  const trackyMouseRef = useRef(null);
  const dwellClickerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll input to show the rightmost content when sentence changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [sentence]);

  // Initialize speech synthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthRef.current = window.speechSynthesis;
      console.log("Text-to-speech initialized");
    } else {
      console.warn("Text-to-speech not supported in this browser");
    }
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

  // Auto-enable when TrackyMouse becomes ready
  useEffect(() => {
    if (trackyMouseReady && !trackyMouseEnabled) {
      console.log("Auto-enabling head tracking...");
      const timer = setTimeout(() => {
        initTrackyMouse();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [trackyMouseReady, trackyMouseEnabled]);

  // Check if Tracky Mouse is loaded
  useEffect(() => {
    console.log("Checking for TrackyMouse library...");
    let attempts = 0;
    const maxAttempts = 100;

    const checkTrackyMouse = () => {
      if (typeof window.TrackyMouse !== "undefined") {
        console.log("TrackyMouse library loaded");
        setTrackyMouseReady(true);
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          if (attempts % 10 === 0) {
            console.log(`Waiting for TrackyMouse... (${attempts / 10}s)`);
          }
          setTimeout(checkTrackyMouse, 100);
        } else {
          console.error("TrackyMouse library failed to load after 10 seconds");
        }
      }
    };

    // Start checking after a small delay to let deferred script load
    setTimeout(checkTrackyMouse, 100);
  }, []);

  // Function to initialize Tracky Mouse
  const initTrackyMouse = async () => {
    if (!trackyMouseReady || typeof window.TrackyMouse === "undefined") {
      console.error("TrackyMouse not loaded");
      return;
    }

    try {
      console.log("Initializing TrackyMouse...");

      window.TrackyMouse.dependenciesRoot = "/tracky-mouse";
      console.log(
        "Dependencies root set:",
        window.TrackyMouse.dependenciesRoot
      );

      await window.TrackyMouse.loadDependencies();

      console.log("Initializing head tracking...");
      trackyMouseRef.current = window.TrackyMouse.init(null, {
        statsJs: false,
      });
      console.log("Head tracking initialized");

      setTimeout(() => {
        const trackyUI = document.querySelector(".tracky-mouse-ui");
        if (trackyUI) {
          trackyUI.style.display = "none";
          console.log("TrackyMouse UI hidden");
        }
      }, 100);

      await window.TrackyMouse.useCamera();

      // Auto-start tracking by simulating F9 press
      console.log("Auto-starting tracking (F9)...");
      const f9Event = new KeyboardEvent("keydown", {
        key: "F9",
        code: "F9",
        keyCode: 120,
        which: 120,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(f9Event);
      console.log("Tracking started");

      // Enable the pointer explicitly
      if (window.TrackyMouse.setPointerVisibility) {
        window.TrackyMouse.setPointerVisibility(true);
        console.log("Pointer visibility enabled");
      }

      let last_el_over = null;
      window.TrackyMouse.onPointerMove = (x, y) => {
        const target = document.elementFromPoint(x, y) || document.body;

        // Update mouse reference for our existing hover detection
        mouseRef.current = { x, y };

        if (target !== last_el_over) {
          if (last_el_over) {
            const event = new PointerEvent("pointerleave", {
              view: window,
              clientX: x,
              clientY: y,
              pointerId: 1234567890,
              pointerType: "mouse",
              isPrimary: true,
              bubbles: false,
              cancelable: false,
            });
            last_el_over.dispatchEvent(event);
          }
          const event = new PointerEvent("pointerenter", {
            view: window,
            clientX: x,
            clientY: y,
            pointerId: 1234567890,
            pointerType: "mouse",
            isPrimary: true,
            bubbles: false,
            cancelable: false,
          });
          target.dispatchEvent(event);
          last_el_over = target;
        }

        const event = new PointerEvent("pointermove", {
          view: window,
          clientX: x,
          clientY: y,
          pointerId: 1234567890,
          pointerType: "mouse",
          isPrimary: true,
          button: 0,
          buttons: 1,
          bubbles: true,
          cancelable: true,
        });
        target.dispatchEvent(event);
      };
      console.log("Pointer control configured");

      // Store pointer reference for dwell animation
      setTimeout(() => {
        const pointer = document.querySelector(".tracky-mouse-pointer");
        if (pointer) {
          // Just ensure visibility, don't override CSS styling
          pointer.style.display = "block";
          pointer.style.visibility = "visible";
          console.log("Pointer element found and visible");
        } else {
          console.warn("Pointer element not found");
        }
      }, 500);

      // Don't use TrackyMouse's dwell clicking - we handle it manually with better visual feedback
      console.log("TrackyMouse pointer control ready");

      setTrackyMouseEnabled(true);

      // Show setup complete popup
      setShowSetupCompletePopup(true);
      setTimeout(() => {
        setShowSetupCompletePopup(false);
      }, 5000);
    } catch (error) {
      console.error("Error initializing TrackyMouse:", error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackyMouseRef.current?.dispose) {
        trackyMouseRef.current.dispose();
      }
      if (dwellClickerRef.current?.dispose) {
        dwellClickerRef.current.dispose();
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

  // Track mouse position
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Update cursor fill animation
  useEffect(() => {
    if (hoveredElement) {
      const duration =
        hoveredElement === "backspace-btn" || hoveredElement === "speaker-btn"
          ? BACKSPACE_DWELL_TIME
          : trackySettings.dwellTime;

      // Update TrackyMouse pointer (red)
      const pointer = document.querySelector(".tracky-mouse-pointer");
      if (pointer && trackyMouseEnabled) {
        pointer.style.setProperty("--dwell-duration", "0ms");
        pointer.style.setProperty(
          "--cursor-fill",
          "inset(100% 0 0 0 round 50%)"
        );
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            pointer.style.setProperty("--dwell-duration", `${duration}ms`);
            pointer.style.setProperty(
              "--cursor-fill",
              "inset(0 0 0 0 round 50%)"
            );
          });
        });
      }

      if (hoverSoundRef.current && audioEnabled) {
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch(() => {});
      }
    } else {
      // Reset fill when not hovering
      const pointer = document.querySelector(".tracky-mouse-pointer");
      if (pointer) {
        pointer.style.setProperty("--dwell-duration", "0ms");
        pointer.style.setProperty(
          "--cursor-fill",
          "inset(100% 0 0 0 round 50%)"
        );
      }
    }
  }, [hoveredElement, audioEnabled, trackyMouseEnabled]);

  // Hover detection loop
  useEffect(() => {
    const checkHover = () => {
      // Skip hover detection if certain popups are showing (but not modality popup)
      if (showTimePopup || showSettingsPopup) {
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
  }, [hoveredElement, showTimePopup, showSettingsPopup, showModalityPopup]);

  // Update settings popup camera feed
  useEffect(() => {
    if (!showSettingsPopup) return;

    const updateCamera = () => {
      const trackyCanvas = document.querySelector(".tracky-mouse-canvas");
      const container = document.getElementById("settings-camera-container");
      if (trackyCanvas && container) {
        // Clone and update canvas continuously
        let existingCanvas = container.querySelector("canvas");

        if (!existingCanvas) {
          existingCanvas = document.createElement("canvas");
          existingCanvas.style.maxWidth = "100%";
          existingCanvas.style.borderRadius = "8px";
          container.innerHTML = "";
          container.appendChild(existingCanvas);
        }

        // Copy dimensions and content
        existingCanvas.width = trackyCanvas.width;
        existingCanvas.height = trackyCanvas.height;
        const destCtx = existingCanvas.getContext("2d");
        destCtx.drawImage(trackyCanvas, 0, 0);
      }
    };

    // Update camera feed continuously
    const interval = setInterval(updateCamera, 100); // Update every 100ms
    updateCamera(); // Initial update

    return () => clearInterval(interval);
  }, [showSettingsPopup]);

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

  // Update keyboard with LLM or pattern-based
  const updateKeyboardWithLLM = async (updatedSentence) => {
    if (getLLMSuggestions && updatedSentence.trim()) {
      try {
        const suggestions = await getLLMSuggestions(updatedSentence);
        if (suggestions && suggestions.length > 0) {
          const llmLayout = [...KEYBOARD_LAYOUTS.default];
          suggestions.slice(0, 18).forEach((suggestion, index) => {
            if (index < 18 && llmLayout[index + 6]) {
              llmLayout[index + 6] = {
                id: `llm_${index}`,
                label: suggestion,
                type: "suggestion",
                color: "#e3f2fd",
              };
            }
          });
          setCurrentKeys(llmLayout);
          setCurrentLayout("llm");
          return;
        }
      } catch (error) {
        console.error("Error getting LLM suggestions:", error);
      }
    }

    const nextLayout = getNextLayout(updatedSentence);
    setCurrentLayout(nextLayout);
    setCurrentKeys(KEYBOARD_LAYOUTS[nextLayout]);
  };

  // Handle settings popup
  const handleSettingsPopup = () => {
    if (showSettingsPopup) {
      setShowSettingsPopup(false);
      console.log("Settings popup closed");
    } else {
      setShowSettingsPopup(true);
      console.log("Settings popup opened");

      // Sync current slider values from TrackyMouse
      setTimeout(() => {
        const xSlider = document.querySelector(".tracky-mouse-sensitivity-x");
        const ySlider = document.querySelector(".tracky-mouse-sensitivity-y");
        const accelSlider = document.querySelector(
          ".tracky-mouse-acceleration"
        );

        if (xSlider && ySlider && accelSlider) {
          setTrackySettings({
            horizontalSensitivity: parseFloat(xSlider.value),
            verticalSensitivity: parseFloat(ySlider.value),
            acceleration: parseFloat(accelSlider.value),
          });
        }
      }, 50);

      // Optionally speak
      if (audioEnabled) {
        speakText("Settings");
      }
    }
  };

  // Handle sensitivity changes
  const handleSensitivityChange = (type, value) => {
    const newSettings = { ...trackySettings, [type]: parseFloat(value) };
    setTrackySettings(newSettings);

    // Update TrackyMouse UI sliders directly and trigger their onchange handlers
    try {
      let slider;
      if (type === "horizontalSensitivity") {
        slider = document.querySelector(".tracky-mouse-sensitivity-x");
      } else if (type === "verticalSensitivity") {
        slider = document.querySelector(".tracky-mouse-sensitivity-y");
      } else if (type === "acceleration") {
        slider = document.querySelector(".tracky-mouse-acceleration");
      }

      if (slider) {
        slider.value = value;
        // Trigger the onchange handler that TrackyMouse set up
        if (slider.onchange) {
          slider.onchange(new Event("change"));
        }
      }
    } catch (error) {
      console.error("Error updating TrackyMouse settings:", error);
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

    if (!hoveredElement) return;

    console.log("Starting dwell timer for:", hoveredElement);

    const dwellTime =
      hoveredElement === "backspace-btn" || hoveredElement === "speaker-btn"
        ? BACKSPACE_DWELL_TIME
        : trackySettings.dwellTime;

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
        } else if (modality === "llm") {
          speakText("Switching to LLM-Powered");
          setTimeout(() => onClose("llm"), 500);
        } else if (modality === "voice") {
          speakText("Switching to Voice Recognition");
          setTimeout(() => onClose("voice"), 500);
        } else if (modality === "switch") {
          speakText("Switching to Switch Control");
          setTimeout(() => onClose("switch"), 500);
        }
        setHoveredElement(null);
      } else {
        executeKeyAction(hoveredElement);
      }
    }, dwellTime);

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
  }, [hoveredElement, sentence, currentKeys]);

  return (
    <div className="keyboard-with-input-screen keyboard-with-input-head-screen">
      {/* Setup Complete Popup */}
      {showSetupCompletePopup && (
        <div className="time-popup-overlay">
          <div className="time-popup">
            <div className="time-popup-day">✓ Head Tracking Setup Complete</div>
            <div className="time-popup-date">Use head gaze to navigate</div>
          </div>
        </div>
      )}

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
              <h2>Head-Gaze TrackyMouse Settings</h2>
              <button
                className="settings-close-btn"
                onClick={handleSettingsPopup}
                aria-label="Close settings"
              >
                x
              </button>
            </div>

            <div className="settings-content">
              {/* Camera Preview - Moved to top */}
              <div className="camera-preview-section">
                <h3 className="camera-title">Camera Preview</h3>
                <div
                  className="camera-preview-box"
                  id="settings-camera-container"
                >
                  {/* TrackyMouse canvas will be cloned here */}
                </div>
              </div>

              {/* Horizontal Sensitivity */}
              <div className="setting-control">
                <label className="setting-label">
                  <span className="setting-name">Horizontal Sensitivity</span>
                  <span className="setting-value">
                    {trackySettings.horizontalSensitivity.toFixed(0)}
                  </span>
                </label>
                <div className="slider-container">
                  <span className="slider-min">Slow</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={trackySettings.horizontalSensitivity}
                    onChange={(e) =>
                      handleSensitivityChange(
                        "horizontalSensitivity",
                        e.target.value
                      )
                    }
                    className="setting-slider"
                  />
                  <span className="slider-max">Fast</span>
                </div>
              </div>

              {/* Vertical Sensitivity */}
              <div className="setting-control">
                <label className="setting-label">
                  <span className="setting-name">Vertical Sensitivity</span>
                  <span className="setting-value">
                    {trackySettings.verticalSensitivity.toFixed(0)}
                  </span>
                </label>
                <div className="slider-container">
                  <span className="slider-min">Slow</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={trackySettings.verticalSensitivity}
                    onChange={(e) =>
                      handleSensitivityChange(
                        "verticalSensitivity",
                        e.target.value
                      )
                    }
                    className="setting-slider"
                  />
                  <span className="slider-max">Fast</span>
                </div>
              </div>

              {/* Acceleration */}
              <div className="setting-control">
                <label className="setting-label">
                  <span className="setting-name">Acceleration</span>
                  <span className="setting-value">
                    {trackySettings.acceleration.toFixed(0)}
                  </span>
                </label>
                <div className="slider-container">
                  <span className="slider-min">Linear</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={trackySettings.acceleration}
                    onChange={(e) =>
                      handleSensitivityChange("acceleration", e.target.value)
                    }
                    className="setting-slider"
                  />
                  <span className="slider-max">Smooth</span>
                </div>
              </div>

              {/* Dwell Time */}
              <div className="setting-control">
                <label className="setting-label">
                  <span className="setting-name">Dwell Time</span>
                  <span className="setting-value">
                    {(trackySettings.dwellTime / 1000).toFixed(1)}s
                  </span>
                </label>
                <div className="slider-container">
                  <span className="slider-min">2s</span>
                  <input
                    type="range"
                    min="2000"
                    max="8000"
                    step="500"
                    value={trackySettings.dwellTime}
                    onChange={(e) =>
                      handleSensitivityChange("dwellTime", e.target.value)
                    }
                    className="setting-slider"
                  />
                  <span className="slider-max">8s</span>
                </div>
              </div>

              {/* Status Info */}
              <div className="settings-status">
                <div className="status-item">
                  <span className="status-label">Status:</span>
                  <span
                    className={`status-value ${
                      trackyMouseEnabled ? "active" : "inactive"
                    }`}
                  >
                    {trackyMouseEnabled ? "● Active" : "○ Inactive"}
                  </span>
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
                data-modality-btn="llm"
                style={{
                  transform:
                    hoveredElement === "modality-llm"
                      ? "translateY(-4px)"
                      : "translateY(0)",
                }}
              >
                <div className="modality-option-btn-title">LLM-Powered</div>
                <div className="modality-option-btn-icon">
                  <img src={AiIcon} alt="LLM" />
                </div>
              </button>

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
          {currentKeys.map((key) => (
            <button
              key={key.id}
              data-key-id={key.id}
              className={`keyboard-key ${key.type} ${
                hoveredElement === key.id ? "hovered" : ""
              }`}
              style={{ backgroundColor: key.color }}
              aria-label={key.label}
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
