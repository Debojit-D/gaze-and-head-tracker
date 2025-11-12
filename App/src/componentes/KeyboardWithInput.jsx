import React, { useEffect, useRef, useState } from "react";
import "./KeyboardWithInput.css";
import Keyboard from "./Keyboard";
import BackspaceIcon from "../icons/backspace-32.svg";

const DWELL_TIME = 3000; // 3 seconds

export default function KeyboardWithInput({ onClose, getLLMSuggestions }) {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [sentence, setSentence] = useState("");
  const dwellTimerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);

  // Track mouse position
  useEffect(() => {
    const setVars = (x, y) => {
      mouseRef.current = { x, y };
      document.body.style.setProperty("--mouse-x", `${x}px`);
      document.body.style.setProperty("--mouse-y", `${y}px`);
    };

    const onMove = (e) => {
      setVars(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Dwell detection for backspace button
  useEffect(() => {
    const checkHover = () => {
      const { x, y } = mouseRef.current;
      let found = null;

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

      if (found !== hoveredElement) {
        setHoveredElement(found);
      }

      rafRef.current = requestAnimationFrame(checkHover);
    };

    rafRef.current = requestAnimationFrame(checkHover);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredElement]);

  // Handle backspace to remove last word
  const handleBackspace = () => {
    const words = sentence.trim().split(" ");
    if (words.length > 0 && words[0] !== "") {
      words.pop(); // Remove last word
      setSentence(words.join(" "));
    } else {
      setSentence("");
    }
  };

  // Handle dwell timer for backspace button
  useEffect(() => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }

    if (hoveredElement === "backspace-btn") {
      dwellTimerRef.current = setTimeout(() => {
        handleBackspace();
      }, DWELL_TIME);
    }

    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
        dwellTimerRef.current = null;
      }
    };
  }, [hoveredElement, sentence]);

  // Update cursor fill state for backspace button
  useEffect(() => {
    if (hoveredElement === "backspace-btn") {
      document.body.style.setProperty("--dwell-duration", `${DWELL_TIME}ms`);
      requestAnimationFrame(() => {
        document.body.style.setProperty(
          "--cursor-fill",
          "inset(0 0 0 0 round 50%)"
        );
      });
    } else {
      document.body.style.setProperty("--dwell-duration", "0s");
      requestAnimationFrame(() => {
        document.body.style.setProperty(
          "--cursor-fill",
          "inset(100% 0 0 0 round 50%)"
        );
      });
    }
  }, [hoveredElement]);

  return (
    <div className="keyboard-with-input-screen">
      <div className="input-display">
        <input
          type="text"
          className="sentence-input"
          placeholder="Your sentence will appear here..."
          value={sentence}
          readOnly
        />
        <button className="backspace-btn" aria-label="Backspace">
          <img src={BackspaceIcon} alt="Backspace" />
        </button>
      </div>

      <Keyboard
        sentence={sentence}
        onSentenceChange={setSentence}
        getLLMSuggestions={getLLMSuggestions}
        onClose={onClose}
      />
    </div>
  );
}
